import React from "react";
import "./todo_list_item.scss";
import { Todo } from "./types";

interface TodoListItemProps {
  todo: Todo;
}

export const TodoListItem: React.FC<TodoListItemProps> = ({
    todo
}) => {
    return (
        <li>
            <span className={todo.is_completed ? "complete" : undefined}>
            {todo.title}
            </span>
        </li>
    );
};
