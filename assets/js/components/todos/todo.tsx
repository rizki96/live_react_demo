import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { TodoList } from './todo_list';
import { AddTodoForm } from './add_todo_form';
import { Todo, AddTodo, ValidateTodo } from './types';

interface LiveViewProps {
    name: string;
    todos: Array<Todo>;
    pushEvent: any;
    pushEventTo: any;
    handleEvent: any;
}

const Todo: React.FC<LiveViewProps> = ({
    name,
    todos,
    pushEvent,
    pushEventTo,
    handleEvent
}: LiveViewProps) => {
    const [todoList, setTodoList] = React.useState<Array<Todo>>(todos);
    const [errorMsg, setErrorMsg] = React.useState<string>("");
    const refTodos = React.useRef(todos);

    React.useEffect(() => {
        // always renew refTodos on mount or update
        refTodos.current = todoList;
    });

    React.useEffect(() => {
        if (!handleEvent) return;
        handleEvent("add_todo_result", (data: any) => {
            console.log("add_todo_result")
            setErrorMsg("");
            if ('errors' in data && data.errors && data.errors.length > 0) {
                setErrorMsg(data.errors[0][1][0]);
            } else {
                console.log(data.todo);
                //setTodoList(todoList.concat([data.todo]));
                // NOTE: concat at the end of the list
                //setTodoList(refTodos.current.concat([data.todo]))
                // NOTE: concat at the beginning of the list
                setTodoList([data.todo].concat(refTodos.current))
            }
        });
        handleEvent("validate_todo_result", (data: any) => {
            console.log("validate_todo_result")
            setErrorMsg("");
            if ('errors' in data && data.errors && data.errors.length > 0) {
                console.log(data.errors)
                setErrorMsg(data.errors[0][1][0]);
            }
        });
    }, [handleEvent])

    React.useEffect(() => {
        if (!todos) return
    }, [todos])

    const addTodo: AddTodo = newTodo => {
        newTodo.trim() !== ""
        && pushEvent("add_todo", {"title": newTodo})
    }

    const validateTodo: ValidateTodo = updateTodo => {
        updateTodo.trim() !== ""
        && pushEvent("validate_todo", {"title": updateTodo})
    }

    return (
        <div>
            Hi! I'm a {name}
            <AddTodoForm addTodo={addTodo} validateTodo={validateTodo} errMsg={errorMsg} />
            <TodoList todos={todoList} />
        </div>
    );
}

export default Todo;
