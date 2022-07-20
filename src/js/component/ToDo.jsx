import React, { useState } from "react";

const ToDo = () => {
    const [inputText, setInputText] = useState("");
    const [task, setTask] = useState(["Walk the dog"]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputText !== "") {
            setTask([...task, inputText])
            setInputText("");
            console.log(task);
        }
        const toDoList = task.map((item)=>{
             return {
                "label": item,
                "done": false
            }
           
          })
          console.log(toDoList);
        fetch('https://assets.breatheco.de/apis/fake/todos/user/male', {
            method: "PUT",
            body: JSON.stringify(toDoList),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

    };

    const handleDelete = (i) => {
        setTask(task.filter((_, index)=>{
            return index != i
          })
          )
    }
  
    return (
        <div className="container d-flex flex-column">
            <div className="text-center">
                <h1>ToDo's List</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={(e) => { setInputText(e.target.value) }}
                    value={inputText}
                    type="text"
                    placeholder="No tasks, add a task"
                />
                <ul className="list-group">
                    {task.map((item, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between">
                            <span>
                                {item}
                            </span>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={()=>{handleDelete(index)}}
                            >
                            </button>
                        </li>
                    ))}
                </ul>
            </form>
        </div>
    );
};

export default ToDo;
