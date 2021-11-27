import TodoItem from "./todo-item";
const TodoList = ({ todos, deleteTodo, handleToggleTodo }) => {
    // const tickTodo = (e) => {
    //     const todoId = e.target.key;
    //     axios.post(`/api/todos/${e.target.key}`, {
    //         ...todos.todoId,
    //         isCompleted: true,
    //     });
    // };
    return (
        <>
            <ul
                id="todo-list"
                className="d-flex flex-column border px-3 py-3 w-50"
            >
                <h2 className="text-secondary text-center border-bottom">
                    Todos
                </h2>
                {todos.map((todo) => {
                    return (
                        <TodoItem
                            todo={todo}
                            key={todo.id}
                            deleteTodo={deleteTodo}
                            handleToggleTodo={handleToggleTodo}
                        />
                    );
                })}
            </ul>
        </>
    );
};
export default TodoList;
