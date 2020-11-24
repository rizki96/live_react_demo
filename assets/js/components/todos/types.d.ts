export type Todo = {
    id: number;
    title: string;
    is_completed: boolean;
};

export type AddTodo = (newTodo: string) => void;

export type ValidateTodo = (updatedTodo: string) => void;

export type ToggleComplete = (selectedTodo: Todo) => void;
