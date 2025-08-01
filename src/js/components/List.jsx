import React, { useState, useEffect } from 'react';

const List = () => {

  const [task, setTask] = useState({
    "label": "",
    "is_done": false
  });
  const [taskList, setTaskList] = useState([]);

  const getList = async () => {
    try {
      const res = await fetch("https://playground.4geeks.com/todo/users/jaque")
      console.log(res)
      if (res.status === 404) {
        crearUsuario()
        return
      }
      const data = await res.json()
      console.log(data.todos)
      setTaskList(data.todos)

    } catch (error) {
      console.log(error)
    }
  }
  const crearUsuario = async () => {
    try {
      const newUser = await fetch("https://playground.4geeks.com/todo/users/jaque", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
      console.log(newUser)
    } catch (error) {
      console.log(error)
    }
  }

  const removeTask = async(index) => {
    try {
      const deleteTask =await fetch( `https://playground.4geeks.com/todo/todos/${index}`,  {
          method: 'DELETE',
          headers: {  'Content-Type': 'application/json'  }
        }  )
        console.log (deleteTask)
        if (deleteTask.status == 204) {
          getList()
        }
    } catch (error) {
      console.log(error)
    }

  }

  const newTask = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      try {
        const postTask = await fetch("https://playground.4geeks.com/todo/todos/jaque", {
          method: 'POST',
          body: JSON.stringify({
            "label": task.label,
            "is_done": false
          }),
          headers: { 'Content-Type': 'application/json' }
        })
        console.log(postTask)
        if (postTask.status == 201) {
          getList()
          setTask({
            "label": "",
            "is_done": false
          });
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
  const items = taskList.length;
  const noTasks = "There are no tasks, add one:)"
  const yesTasks = items + " items left"

  useEffect(() => {
    getList()
  }, [])
  return (
    <div className="card my-3 col-10" >
      <form >
        <input onKeyDown={(e) => newTask(e)} type="text" placeholder="What needs to be done?" className="border p-2 col-12" onChange={(e) => setTask({ ...task, label: e.target.value })} value={task.label} />
      </form>
      <div className=" w-100 " >
        {
          taskList.map((task, index) =>
            <div className="d-flex border-top" key={index} >
              <div className="col-11 text-start p-2">{task.label}</div>
              <button className="d-flex border-0  bg-white col-1 p-2 " onClick={() => removeTask(task.id)}> ✔</button>
            </div>
          )
        }
      </div>
      <div className="card-footer text-start text-muted">
        <small>{items === 0 ? noTasks : yesTasks}</small>
      </div>
    </div>
  )
}

export default List