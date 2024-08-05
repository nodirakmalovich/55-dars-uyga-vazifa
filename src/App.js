import './App.css';
import Navbar from './pages/home/navbar/navbar';
import Table from './pages/home/table/table';

import { TodoDataProvider } from "./data/TodoDataContext";

function App() {
  return (
    <TodoDataProvider>
      <div className="App">
        <Navbar />
        <Table />
      </div>
    </TodoDataProvider>
  );
}

export default App;
