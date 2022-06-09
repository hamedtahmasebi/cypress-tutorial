import TodosPage from "./pages/todos-page";
import "./styles/global.css";
const App = () => {
    return (
        <div className="App" data-testid="app">
            <TodosPage />
        </div>
    );
};

export default App;
