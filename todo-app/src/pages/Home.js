import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import server, { Context } from "../index";
import TodoItem from "../components/TodoItem";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const { isAuthenticated } = useContext(Context);



  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `${server}/todos/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/todos/${id}`, {
        withCredentials: true,
      });

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${server}/todos/newtodo`,
        { title, description },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setTitle("");
      setDescription("");
      toast.success(data.message);
      setLoading(false);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
   
    axios
      .get(`${server}/todos/mytodos`, {
        withCredentials: true,
      })
      .then((response) => {
        // console.log(response)
        setTodos(response.data.tasks);
        // toast.success()
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }, [refresh]);


  if (!isAuthenticated) return <Navigate to={ "/login"} />

  return (
    <>
      <div className="w-full md:w-2/4 sm:w-3/4 mx-auto mt-5">
        <form
          onSubmit={submitHandler}
          className=" mx-8 shadow-xl shadow-gray-400 px-3 py-10 rounded"
        >
          <div className="sm:col-span-3 mb-4">
            <div className="mt-2">
              <input
                type="text"
                name="title"
                placeholder="Title"
                autoComplete="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-[#20354b] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 md:text-md md:leading-6"
              />
            </div>
            <div className="mt-2">
              <input
                type="text"
                name="description"
                placeholder="Description"
                autoComplete="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-[#20354b] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 md:text-md md:leading-6"
              />
            </div>
          </div>

          <div class="mt-12 flex justify-center flex-col items-center ">
            {!loading ? (
              <button
                type="submit"
                class="rounded bg-[#20354b] px-12 py-2 text-xl font-semibold text-white shadow-sm hover:border hover:border-green-600 hover:bg-white hover:text-green-600 "
              >
                Add task
              </button>
            ) : (
              <Loader />
            )}
          </div>
        </form>
      </div>
      <section className="mx-8 mt-11 mb-10 grid sm:grid-cols-2 gap-3 ">
        {
          todos.map((todo) => {
            return (
              <TodoItem
                title={todo.title}
                description={todo.description}
                isCompleted={todo.isCompleted}
                updateHandler={updateHandler}
                deleteHandler={deleteHandler}
                id={todo._id}
                key={todo._id}
              />
            );
          })
        }
      </section>
    </>
  );
};

export default Home;
