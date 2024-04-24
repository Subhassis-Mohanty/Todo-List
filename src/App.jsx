import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import './App.css'

function App() {
  const [isComplete, setIsComplete] = useState(false);
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescrption, setNewDescrption] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleAddTodos = () => {
    let newTodo = {
      title: newTitle,
      description: newDescrption,
    };

    let updateTodoArray = [...todos];
    updateTodoArray.push(newTodo);
    setTodos(updateTodoArray);
    localStorage.setItem("todolist", JSON.stringify(updateTodoArray));
  };

  const handleDelete = (index) => {
    let reduceTodos = [...todos];
    reduceTodos.splice(index, 1);
    localStorage.setItem("todolist", JSON.stringify(reduceTodos));
    setTodos(reduceTodos);
  };
  const handleDeleteCompletedTodos = (index) => {
    let reduceTodos = [...completedTodos];
    reduceTodos.splice(index);
    localStorage.setItem("completedTodos", JSON.stringify(reduceTodos));
    setCompletedTodos(reduceTodos);
  };

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = `${dd}-${mm}-${yyyy} at ${h}:${m}:${s}`;
  
    let completedItem = todos[index];
    completedItem.completedOn = completedOn;
  
    // Update todos array by removing the completed item
    let updatedTodos = todos.filter((_, i) => i !== index);
  
    // Update completedTodos array by adding the completed item
    let updatedCompletedArray = [...completedTodos, completedItem];
  
    setTodos(updatedTodos);
    setCompletedTodos(updatedCompletedArray);
    handleDelete(index);
    localStorage.setItem("completedTodos", JSON.stringify(updatedCompletedArray));

  };

  useEffect(() => {
    let saveTodos = JSON.parse(localStorage.getItem("todolist"));
    let saveCompletedTodos = JSON.parse(localStorage.getItem("completedTodos"));
    if (saveTodos) {
      setTodos(saveTodos);
    }

    if(saveCompletedTodos){
      setCompletedTodos(saveCompletedTodos);
    }
  }, []);

  return (
    <>
      <div className="border-2 w-[60%] mx-auto my-24 bg-red-950">
        <h2 className="text-center font-bold text-2xl mt-5 text-gray-200">
          My ToDos
        </h2>
        <div className="mt-6 p-[2%] mx-auto shadow-md shadow-stone-700">
          <div className="flex items-center justify-center flex-col lg:flex-row">
            <div className="flex flex-col mr-6 items-start mt-3">
              <label
                htmlFor="title"
                className=" text-lg text-gray-200 font-semibold mb-3 "
              >
                Title :
              </label>
              <input
                type="text"
                placeholder="Task Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className=" w-80 h-8 rounded-lg p-2 outline-none border-2 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col mr-6 items-start mt-3 ">
              <label
                htmlFor="description"
                className=" text-lg text-gray-200 font-semibold mb-3 "
              >
                Description :
              </label>
              <input
                type="text"
                placeholder="Task Description"
                value={newDescrption}
                onChange={(e) => setNewDescrption(e.target.value)}
                className=" w-80 h-8 rounded-lg p-2 outline-none border-2 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-center mt-4 ">
              <button
                type="button"
                onClick={handleAddTodos}
                className="text-lg text-gray-200 font-semibold cursor-pointer border px-8 rounded-3xl hover:bg-lime-600 active:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>

          <div className="flex flex-row mt-7 space-x-4 ">
            <button
              className={`ml-6 border-2 px-5 py-1 rounded-3xl cursor-pointer text-zinc-300 hover:bg-stone-500  ${
                !isComplete ? "bg-emerald-600" : ""
              }`}
              onClick={() => setIsComplete(false)}
            >
              Todo
            </button>
            <button
              className={`border-2 px-7 py-1 rounded-3xl cursor-pointer text-zinc-300 hover:bg-stone-500 active:bg-emerald-600 ${
                isComplete ? "bg-emerald-600" : ""
              } `}
              onClick={() => setIsComplete(true)}
            >
              Completed
            </button>
          </div>

          <div className="flex flex-col mx-5 my-4">
            {isComplete === false &&
              todos.map((items, index) => {
            
                return (
                  <div
                    key={index}
                    className="text-white bg-gray-600 flex justify-between px-4 py-5 mb-3 shadow-2xl shadow-slate-600 items-center rounded-xl"
                  >
                    <div>
                      <h3 className=" text-2xl text-green-400 font-semibold">
                        {items.title}
                      </h3>
                      <p className="text-gray-400 font-medium">
                        {items.description}
                      </p>
                    </div>
                    <div className="flex">
                      <AiOutlineDelete
                        size={30}
                        className=" cursor-pointer hover:text-red-600"
                        title="Delete?"
                        onClick={() => handleDelete(index)}
                      />
                      <BsCheckLg
                        size={30}
                        className=" cursor-pointer ml-4 text-green-300 hover:text-green-600 "
                        title="Complete?"
                        onClick={() => handleComplete(index)}
                      />
                    </div>
                  </div>
                );
              })}

            {isComplete === true &&
              completedTodos.map((items, index) => {
                return (
                  <div
                    key={index}
                    className="text-white bg-gray-600 flex justify-between px-4 py-5 mb-3 shadow-2xl shadow-slate-600 items-center rounded-xl"
                  >
                    <div>
                      <h3 className=" text-2xl text-green-400 font-semibold">
                        {items.title}
                      </h3>
                      <p className="text-gray-400 font-medium">
                        {items.description}
                      </p>
                      <p>
                        <small>Completed On:{items.completedOn}</small>
                      </p>
                    </div>
                    <div className="flex">
                      <AiOutlineDelete
                        size={30}
                        className=" cursor-pointer hover:text-red-600"
                        title="Delete?"
                        onClick={() => handleDeleteCompletedTodos(index)}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
