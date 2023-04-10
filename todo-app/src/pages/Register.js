import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import server, { Context } from "../index";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, setIsAuthenticated,loading,setLoading } = useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(name, email, password);
    setLoading(true)
    try {
      const { data } = await axios.post(
        `${server}/users/register`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setIsAuthenticated(true);
    setLoading(false)

    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      setIsAuthenticated(false);
    }
  };

  // Redirect to home page
  if (isAuthenticated) return <Navigate to={"/"} />;

  return (
    <div className="flex justify-center w-full">
      <section className="w-4/5 sm:w-3/4 md:w-2/4 mt-10">
        <form
          onSubmit={submitHandler}
          className="shadow-xl shadow-gray-400 px-3 py-10 rounded"
        >
          <div className="sm:col-span-3 mb-4">
            <label for="name" class="block text-xl leading-6 text-[#20354b]">
              FullName
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autocomplete="given-name"
                placeholder="Enter your Fullname"
                required
                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 md:text-md md:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-3 mb-4">
            <label for="email" class="block text-xl leading-6 text-[#20354b]">
              Email
            </label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autocomplete="given-name"
                placeholder="Enter your E-mail"
                required
                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 md:text-md md:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label for="password" class="block text-xl leading-6 text-[#20354b]">
              Password
            </label>
            <div class="mt-2">
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autocomplete="given-name"
                placeholder="Enter your Password"
                required
                class="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 md:text-md md:leading-6"
              />
            </div>
          </div>
          <div class="mt-12 flex justify-center flex-col items-center ">
            {loading ? (
              <Loader/>
            ) : (
              <button
                type="submit"
                disabled={loading}
                class="rounded bg-[#20354b] px-12 py-2 text-xl font-semibold text-white hover:text-green-600 hover:bg-white hover:border hover:border-green-600  "
              >
                Sign Up
              </button>
            )}

            <h4 className="my-4 text-[#20354b] font-bold text-xl">Or</h4>
            <Link
              to={"/login"}
              className="text-indigo-600 visited:text-purple-600..."
            >
              Login
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Register;
