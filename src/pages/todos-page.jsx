import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import TodoForm from "../components/todo-form";
import TodoList from "../components/todo-list";
import ListFooter from "../components/list-footer";
const TodosPage = () => {
    const [todos, setTodos] = useState([]);
    const [errorOnSubmit, setErrorOnSubmit] = useState(false);
    const [errorOnGettingTodos, setErrorOnGettingTodos] = useState(false);
    const todoAPI = "http://localhost:8000/todos";
    const getTodos = async () => {
        try {
            const { data } = await axios.get(todoAPI);
            setTodos(data);
            setErrorOnGettingTodos(false);
        } catch (err) {
            setErrorOnGettingTodos(true);
        }
    };

    const addTodo = async (todo) => {
        try {
            const res = await axios.post(todoAPI, todo);
            setTodos([...todos, res.data]);
        } catch (err) {
            setErrorOnSubmit(true);
        }
    };
    const deleteTodo = async (todo) => {
        try {
            await axios.delete(`${todoAPI}/${todo.id}`);
            setTodos(todos.filter((el) => el.id !== todo.id));
        } catch (err) {
            console.log(err);
        }
    };

    const handleToggleTodo = async (todo) => {
        try {
            const res = await axios.put(`${todoAPI}/${todo.id}`, {
                ...todo,
                isCompleted: !todo.isCompleted,
            });
            setTodos(
                todos.map((el) => {
                    if (el.id !== res.data.id) {
                        return el;
                    } else {
                        return res.data;
                    }
                })
            );
        } catch (err) {}
    };

    const filterTodos = (filter, todosList) => {
        if (filter) {
            return todosList.filter(
                (todo) => todo.isCompleted === (filter === "completed")
            );
        } else {
            return todosList;
        }
    };
    useEffect(() => {
        getTodos();
    }, []);

    return (
        <Router>
            <Switch>
                <div
                    className="d-flex flex-column align-items-center"
                    style={{ backgroundColor: "#eeeeee66" }}
                >
                    <TodoForm addTodo={addTodo} />
                    {errorOnSubmit && (
                        <b className=" text-danger " id="submision-error">
                            The submision failed
                        </b>
                    )}
                    <Route
                        path="/:filter?"
                        render={({ match }) => (
                            <TodoList
                                todos={filterTodos(match.params.filter, todos)}
                                deleteTodo={deleteTodo}
                                handleToggleTodo={handleToggleTodo}
                            />
                        )}
                    />
                    {errorOnGettingTodos && (
                        <b className=" text-danger " id="getTodos-error">
                            Sever Error
                        </b>
                    )}
                    <ListFooter todos={todos} />
                </div>
            </Switch>
        </Router>
    );
};

export default TodosPage;
