import React, { useState, ChangeEvent, FormEvent } from "react";
import { AddTodo, ValidateTodo } from "./types";

interface AddTodoFormProps {
  addTodo: AddTodo;
  validateTodo: ValidateTodo;
  errMsg: string;
}

export const AddTodoForm: React.FC<AddTodoFormProps> = ({ 
    addTodo, 
    validateTodo,
    errMsg
}) => {
    const [newTodo, setNewTodo] = useState<string>("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value;
        setNewTodo(val);
        validateTodo(val);
    };

    const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        addTodo(newTodo);
        if (errMsg == "") setNewTodo("");
    };

    return (
        <form>
            <input type="text" value={newTodo} onChange={handleChange} />
            <div>{errMsg}&nbsp;</div>
            <button type="submit" onClick={handleSubmit}>
                Add Todo
            </button>
        </form>
    );
};