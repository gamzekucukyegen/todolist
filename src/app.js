"use client"
import React, { useState, useEffect } from 'react';


const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setTodos((prevTodos) => [...prevTodos, inputValue]);
      setInputValue('');
    }
  };

  const handleClear = () => {
    localStorage.clear();
    setTodos([]);
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div className='container'>
      <div className='box'>
        <h1>Project 4: Alışveriş Listesi</h1>
        <h3>Alınıcaklar Listesi</h3>
        <form className="form" onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            value={inputValue}
            placeholder="Yeni bir madde ekleyin"
            onChange={(e) => setInputValue(e.target.value)}
            required
          />
          <button className="button" type="submit">Add</button>
        </form>

        <button className="clear-button" onClick={handleClear}>Clear All</button>

        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={index} className="todo-item">
              {todo}
              <button className="delete-button" onClick={() => handleDeleteTodo(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};


export default App;