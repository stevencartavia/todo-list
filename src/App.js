import React, {useEffect, useState} from "react";
import { nanoid } from "nanoid";
import Form from "./Form";
import Todo from "./Todo";

export default function App() {
    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks]);

    const addTask = name => {
        const newTask = {
            name,
            id: nanoid()
        };
        setTasks([...tasks, newTask]);
    }

    const handleDelete = id => {
        const remainingTasks = tasks.filter(task => task.id !== id);
        setTasks(remainingTasks);
    }

    const editTask = (id, newName) => {
        const editedTasks = tasks.map( task => {
            if (task.id === id) {
                return { ...task, name: newName };
            }
            return task;
        })
        setTasks(editedTasks);
    }

    const taskList = tasks.map(task => {
        return <Todo 
            name={task.name} 
            key={task.id} 
            id={task.id} 
            tasks={tasks} 
            setTasks={setTasks}
            handleDelete={handleDelete} 
            editTask={editTask} 
        />
    })
    
    return (
        <div className="todo-container">
            <Form addTask={addTask} />
            <h3 className="tasks-remaining">
                {(tasks < 1) ? '0 tasks remaining' : 
                (tasks.length === 1) ? '1 task remaining' : 
                (tasks.length > 1) ? `${tasks.length} tasks remaining` : null}
            </h3>
            <div className="task-list">
                {taskList}
            </div>
        </div>
    );
}