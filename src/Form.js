import React, { useState } from "react";

export default function Form({addTask}) {
    const [name, setName] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        if(name === '') {
            return;
        }
        
        addTask(name);
        setName('');
    }

    const handleChange = e => {
        setName(e.target.value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="label-wrapper">
                <label htmlFor="new-todo-input" className="label">
                    What needs to be done?
                </label>
            </h2>
            <input 
                onChange={handleChange} 
                className="input-text"
                type='text' 
                name='text' 
                value={name}
            />
            <button type="submit" className="btn-submit">
                Add
            </button>
        </form>
    );
}