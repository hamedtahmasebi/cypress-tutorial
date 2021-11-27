export const TodoItem = ({ todo, deleteTodo, handleToggleTodo }) => {
    return (
        <li
            key={todo.id}
            className={` border px-5 d-flex justify-content-between ${
                todo.isCompleted ? "completed" : "active"
            }`}
        >
            <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={(e) => handleToggleTodo(todo)}
                className="toggle form-check-input"
            />
            <p className={`todo-text `}>{todo.text} </p>
            <button
                onClick={(e) => deleteTodo(todo)}
                className="delete-btn btn btn-danger rounded-xl"
            >
                Delete Todo
            </button>
        </li>
    );
};

export default TodoItem;
