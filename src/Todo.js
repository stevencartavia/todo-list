import React, { useState } from "react";
import { GoCheck } from "react-icons/go";

export default function Todo({name, id, handleDelete, editTask}) {

    const [editing, setEditing] = useState(false);
    const [newName, setNewName] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);

    const handleChange = e => {
        setNewName(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(newName === '') {
            return;
        }
        editTask(id, newName)
        setNewName('');
        setEditing(prev => !prev);
    }
    
    const viewTemplate = (
        <div className="task">
            <ul>
                <li className={isCompleted ? 'line' : ''}>
                    {name}
                    <GoCheck className="check" onClick={() => setIsCompleted(current => !current)} />
                </li>
                <button onClick={() => setEditing(prev => !prev)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(id)} className="delete-btn">Delete</button>
            </ul>
        </div>
    );

    const editingTemplate = (
        <form onSubmit={handleSubmit} className='edit-form'>
            <h4 className="text-to-edit">New name for: <span className="name-edit">{name}</span></h4>
            <input onChange={handleChange} className="input-edit"/>
            <button type="button" onClick={() => setEditing(prev => !prev)} className="cancel-edit-btn">Cancel</button>
            <button type="text" name="text" value={newName} onSubmit={handleSubmit} className="save-edit-btn">Save</button>
        </form>
    )

    return (
        <div>
            {editing ? editingTemplate : viewTemplate}
        </div>
    );
}