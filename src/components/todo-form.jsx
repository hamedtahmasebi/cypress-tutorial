import React, { useState } from "react";
import uniqid from "uniqid";

const TodoForm = ({ addTodo }) => {
    const [todoText, setTodoText] = useState("");
    const checkAndAddTodo = (e) => {
        e.preventDefault();
        var todoObject = {
            text: todoText,
            id: uniqid(),
        };
        addTodo(todoObject);
        setTodoText("");
    };
    return (
        <form
            action="POST"
            className="px-4 py-4"
            onSubmit={(e) => checkAndAddTodo(e)}
        >
            <h1>Todo</h1>
            <h2>Hey!!!!</h2>
            <div className="bg-white border rounded">
                <input
                    id="new-todo"
                    autoFocus
                    className="border-0 px-2 py-1 h-100 rounded-lg"
                    placeholder="please enter new todo"
                    value={todoText}
                    onChange={(e) => setTodoText(e.target.value)}
                />
                <button className="btn btn-primary " type="submit">
                    Submit
                </button>
            </div>
        </form>
    );
};

export default TodoForm;
