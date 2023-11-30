/* eslint-disable react/jsx-key */

import { useState, useEffect } from "react"
import { Trash2, Pencil } from "lucide-react"

function App() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || []

  const [tasks, setTasks] = useState(savedTasks)
  const [inputValue, setInputValue] = useState("")
  const [editingTaskId, setEditingTaskId] = useState(null)

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  function inputChange(event) {
    setInputValue(event.target.value)
  }

  function addTasks() {
    if (inputValue.trim() === "") {
      alert("Escreva uma tarefa para poder prosseguir!")
      return
    }

    if (editingTaskId !== null) {
      const updatedTask = tasks.map((task) =>
        task.id === editingTaskId ? { ...task, text: inputValue } : task
      )

      setTasks(updatedTask)
      setEditingTaskId(null)
    } else {
      setTasks([...tasks, { id: Date.now(), text: inputValue }])
    }
    setInputValue("")
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      addTasks()
    }
  }

  function editTask(id) {
    const taskToEdit = tasks.find((task) => task.id === id)
    setInputValue(taskToEdit.text)
    setEditingTaskId(id)
  }

  function removeTask(id) {
    const indexToRemove = tasks.findIndex((task) => task.id === id)
    if (indexToRemove !== -1) {
      const newTasks = [...tasks]
      newTasks.splice(indexToRemove, 1)
      setTasks(newTasks)
    }
  }
  return (
    <section
      id="container-principal"
      className="flex min-h-screen w-full items-center justify-center bg-gradient-to-tl from-zinc-600  to-zinc-700 "
    >
      <article id="container-conteudo" className="mx-2 w-full">
        <section
          id="containerInputAndButton"
          className="flex w-full justify-center gap-4  px-4 py-2"
        >
          <input
            className="h-12 w-full  rounded-md bg-white/30 px-1  font-medium text-zinc-900 backdrop-blur-md placeholder:text-zinc-900 focus:outline-none md:w-1/2 md:px-2 lg:w-1/2 lg:px-2 lg:py-1 xl:w-1/2 xl:px-2 xl:py-1 "
            placeholder="Escreva uma tarefa..."
            value={inputValue}
            onChange={inputChange}
            onKeyDown={handleKeyPress}
          />
          <button
            className="md>text-base rounded-md bg-gradient-to-r from-gray-900 to-gray-800  px-6 text-sm font-semibold text-white transition-all duration-300 hover:from-gray-800 hover:to-gray-900 md:px-2  md:py-2"
            onClick={addTasks}
          >
            Adicionar Tarefa
          </button>
        </section>
        <ul className="mt-1 flex w-full flex-col items-center px-4">
          {tasks.map((task) => (
            <section
              className=" mb-2 flex w-full  justify-between rounded-md bg-white/20 px-2
              py-2 md:w-[66%] md:px-2 md:py-2 lg:w-[62%] lg:px-2 lg:py-2 xl:w-[60%] xl:px-2 xl:py-2"
              key={task.id}
            >
              <li className="  text-zinc-50">{task.text}</li>
              <section id="containerButtons" className="flex gap-2">
                <button
                  className=" text-zinc-50 hover:text-gray-800"
                  onClick={() => editTask(task.id)}
                >
                  {" "}
                  <Pencil className="w-5" />
                </button>
                <button
                  className=" text-zinc-50 hover:text-gray-800"
                  onClick={() => removeTask(task.id)}
                >
                  <Trash2 className="w-5" />
                </button>
              </section>
            </section>
          ))}
        </ul>
      </article>
    </section>
  )
}

export default App

// import { useState } from "react"

// function App() {
//   const [tasks, setTasks] = useState([])
//   const [inputValue, setInputValue] = useState("")

//   function inputChange(event) {
//     setInputValue(event.target.value)
//   }

//   function addTask() {
//     setTasks([...tasks, inputValue])
//     setInputValue("")
//   }

//   return (
//     <div>
//       <input
//         placeholder="Digite a sua tarefa..."
//         value={inputValue}
//         onChange={inputChange}
//       />
//       <button onClick={addTask}>Adicionar Tarefa</button>

//       <ul>
//         {tasks.map((item, index) => (
//           <li key={index}>{item}</li>
//         ))}
//       </ul>
//     </div>
//   )
// }

// export default App
