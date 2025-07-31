import React, { useState, useEffect } from 'react';

const List = () => {

  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([
    "walk the dog",
    "wash the dishes",
    "do the laundry"
  ]);

  console.log(task)

  const removeTask = (index) => {
    let aux1 = [...taskList];
    aux1.splice(index, 1);
    setTaskList(aux1)
  }
  
   const newTask =(e) => {
    e.preventDefault(); 
    if (task.trim() === "") return;
    
    setTaskList([task, ...taskList]); 
    setTask(''); 
  };
   const items= taskList.length;

  return (
    <div className="card my-3 col-10" >
      <form onSubmit={newTask}>
        <input type="text" placeholder= "What needs to be done?" className="border p-2 col-12" onChange={e => setTask(e.target.value)} value={task} />
      </form>
      <div className=" w-100 " >
        {
          taskList.map((task, index) =>
            <div className="d-flex border-top" key={index} >
              <div className="col-11 text-start p-2">{task}</div>
              <button className="d-flex border-0 text-danger bg-transparent " onClick={() => removeTask(index)}>x</button>
            </div>
          )
        }
      </div>
      <div className="card-footer text-start text-muted">
        <small>{items} items left</small>
      </div>
    </div>
  )
}

export default List