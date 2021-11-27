import React from "react";
import { Link } from "react-router-dom";
export const ListFooter = ({ todos }) => {
    const notCompletedTodos = todos.filter(
        (todo) => todo.isCompleted === false
    );

    return (
        <footer>
            <b className="text-primary text-left mr-1" id="todos-left">
                {notCompletedTodos.length}
            </b>

            <i id="todos-left-text">
                {notCompletedTodos.length === 1 ? "todo left" : "todos left"}
            </i>
            <div className="d-flex mt-2">
                <Link
                    id="show-all-todos"
                    to="/"
                    className="btn btn-primary mx-1"
                >
                    All Todos
                </Link>
                <Link
                    id="show-active-todos"
                    to="/active"
                    className="btn btn-primary mx-1"
                >
                    Active Todos
                </Link>
                <Link
                    id="show-completed-todos"
                    to="/completed"
                    className="btn btn-primary mx-1"
                >
                    Completed Todos
                </Link>
            </div>
        </footer>
    );
};

export default ListFooter;
