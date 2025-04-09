
import React, { useState, useEffect, useRef } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import editIcon from './editIcon (2).png';
import deleteIcon from './deleteIcon.png';
import './Todo.css';

const Todo = () => {
  const [inputVal, setInputVal] = useState(''); 
  const [tasks, setTasks] = useState([]); 
  const [editIndex, setEditIndex] = useState(null); 
  const inputRef = useRef(null);

  
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks)); 
    }
  }, []);

  
  const handleFormSubmit = (event) => {
    event.preventDefault(); 

    if (!inputVal) return; 

    if (editIndex !== null) {
      
      const updatedTasks = [...tasks];
      updatedTasks[editIndex].text = inputVal; 
      setTasks(updatedTasks); // Set the updated tasks list
      setEditIndex(null); // Reset the edit mode
      toast.success(editIndex ? 'User updated successfully!' : 'User added successfully!');
    } else {
      // Adding a new task
      if (!tasks.some(task => task.text === inputVal)) {
        setTasks([...tasks, { text: inputVal, completed: false }]); // Add new task
        toast.success(editIndex? 'User updated successfully!' : 'User added successfully!');
      }
    }
    setInputVal(''); // Clear the input field after saving
  };

  // Remove a task by index
  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index)); // Filter out the task by index
     toast.success("Your task removed successfully")
  };

  // Remove all tasks
  const removeAllTask = () => {
    setTasks([]); // Reset tasks list to an empty array
    toast.success("Your all task removed successfully")
  };

  // Toggle task completion status (completed or not)
  const toggleStatusCheckbox = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed; // Toggle the completed status
    setTasks(updatedTasks); // Set the updated tasks list
  };

  // Save tasks to localStorage
  const saveTasksToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save tasks in localStorage
    toast.success("Your task saved successfully")
  };

  // Handle task edit: populate input field and set cursor to the end
  const handleEdit = (index) => {
    setInputVal(tasks[index].text); // Set the task text in the input field
    setEditIndex(index); // Set the index of the task being edited

    setTimeout(() => {
      inputRef.current.focus(); // Focus the input field
      const len = inputRef.current.value.length; // Get the length of the input value
      inputRef.current.setSelectionRange(len, len); // Set cursor position at the end of the text
    }, 0); // Timeout to ensure the input is rendered before setting the cursor position
  };

  return (
    <>
    
    
    <div className='main-container'>
      <div className='todo-container'>
        <h1 className='todo-heading'>
          Todo App
        </h1>
        <form className='form-area' onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder='Enter task'
            className='todo-app-input'
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)} // Update input value as user types
            ref={inputRef} // Assign reference to the input field
          />
          <button className='add-button-todo' type="submit">
            {editIndex !== null ? "Edit" : "Add"} {/* Change button text based on edit mode */}
          </button>
        </form>

        {tasks.length > 0 && (
          <div className='delete-container'>
            <button className="remove-button" onClick={removeAllTask}>Remove all</button>
          </div>
        )}

        <div className='task-container'>
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <div className='container' key={index}>
                <div className='checkbox-list'>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleStatusCheckbox(index)} // Toggle task completion
                  />
                  <li className={`tasks-list ${task.completed ? "completed" : ""}`}>
                    {task.text}
                  </li>
                </div>
                <div className='checkbox-list'>
                  <img
                    src={editIcon}
                    className='edit-icon'
                    alt="edit-icon"
                    onClick={() => handleEdit(index)} // Trigger edit mode for the task
                  />
                  <img
                    src={deleteIcon}
                    className='delete-icon'
                    alt="delete-icon"
                    onClick={() => removeTask(index)} // Remove task on click
                  />
                </div>
              </div>
            ))
          ) : (
            <p className='no-tasks'>No task added yet</p>
          )}
        </div>

        <div className='save-container'>
          <button className='saved-button' onClick={saveTasksToLocalStorage}>Save</button>
        </div>
      </div>
    </div>
    <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            fontSize: '14px',
            maxWidth: '500px'
          }
        }} />
    </>
  );
};

export default Todo;

