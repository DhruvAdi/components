import { useState } from "react"

const Todo = () => {

   const [tasks,setTasks] = useState("");
   const [todos, setTodos] = useState([]);

    const addTask = () => {
        if(tasks.trim() !== ""){
            setTodos([...todos, {text:tasks,completed:false}]);
            setTasks("");
        }
    };

   

    const Toggletext = (index) =>{
        setTodos(todos.map((todo,i)=> (i === index ? {...todo,completed:!todo.completed}:todo)));
    };
    const deleterText = (index) => {
        setTodos(todos.filter((_, i) => i !== index));  // Fixed: updating todos instead of task
    };

    return (

        <div>
            <h2>TO-DO list</h2>
            <input value={tasks} onChange={(e)=> setTasks(e.target.value)}/>
            <button onClick={addTask}>Add</button>
            <ul>
                {todos.map((todo,index) =>
                    <li key={index} style={{textDecoration:todo.completed? "line-through":"none"}}>{todo.text}
                    <button onClick={() => Toggletext(index)}>✅</button>
                    <button onClick={() => deleterText(index)}>❌</button></li>
                )}
            </ul>
        </div>
    )
}

export default Todo;