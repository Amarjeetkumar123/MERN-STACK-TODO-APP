import axios from "axios";
import React, { useState } from "react";

const Home = () => {

const [title,setTiltle] = useState("")
const [description,setDescription] = useState("")

  const submitHandler = async() => {
    
    const {data} = await axios.post(`${server}/`)

  }

  return (
    <div className="w-full md:w-2/4 sm:w-3/4 mx-auto mt-10">
      <form
        onSubmit={submitHandler}
        className="  shadow-xl shadow-gray-400 px-3 py-10 rounded"
      >
        <div className="sm:col-span-3 mb-4">
          <div className="mt-2">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTiltle(e.target.value)}
              required
              className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 md:text-md md:leading-6"
            />
          </div>
          <div className="mt-2">
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 md:text-md md:leading-6"
            />
          </div>
        </div>

        <div class="mt-12 flex justify-center flex-col items-center ">
          <button
            type="submit"
            disabled
            class="rounded bg-gray-800 px-12 py-2 text-xl font-semibold text-white shadow-sm "
          >
            Add task
          </button>
        </div>
      </form>
      <section>

      </section>
    </div>
  );
};

export default Home;
