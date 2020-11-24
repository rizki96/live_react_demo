import React from "react";
import { Todo } from "./types";
import { TodoListItem } from "./todo_list_item";

interface TodoListProps {
    todos: Array<Todo>;
}

export const TodoList: React.FC<TodoListProps> = ({
    todos
}) => {
    return (
        <ul>
            {todos.map(todo => (
            <TodoListItem
                key={todo.id}
                todo={todo}
            />
            ))}
        </ul>
    );
};
