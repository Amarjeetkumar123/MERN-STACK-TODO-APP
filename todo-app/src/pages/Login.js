import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import server, { Context } from "..";

import axios from "axios";
import { toast } from "react-hot-toast";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${server}/users/login`,
        {
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
      setLoading(false);
    } catch (error) {
      toast.error("Invalid Email or Password");
      console.log(error);
      setIsAuthenticated(false);
    }
  };

  if (isAuthenticated) return <Navigate to={"/"} />;

  return (
    <div className="flex justify-center">
      <section className=" w-4/5 sm:w-3/4 md:w-2/4 mt-10">
        <form
          onSubmit={submitHandler}
          className=" shadow-xl shadow-gray-400 px-3 py-10 rounded"
        >
          <div className="sm:col-span-3 mb-4">
            <label for="email" class="block text-xl leading-6 text-gray-800">
              Email
            </label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                id="email"
                autocomplete="given-name"
                placeholder="Enter your E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 md:text-md md:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label for="password" class="block text-xl leading-6 text-gray-800">
              Password
            </label>
            <div class="mt-2">
              <input
                type="password"
                name="password"
                id="password"
                autocomplete="given-name"
                placeholder="Enter your Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                class="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 md:text-md md:leading-6"
              />
            </div>
          </div>
          <div class="mt-12 flex justify-center flex-col items-center ">
            {loading ? (
              <button
                type="submit"
                disabled
                class="rounded bg-gray-400 px-12 py-2 text-xl font-semibold text-white shadow-sm "
              >
                Login
              </button>
            ) : (
              <button
                type="submit"
                class="rounded bg-gray-800 px-12 py-2 text-xl font-semibold text-white shadow-sm hover:bg-indigo-600"
              >
                Login
              </button>
            )}

            <h4 className="my-4 text-gray-800 font-bold text-xl">Or</h4>
            <Link
              to={"/register"}
              className="text-indigo-600 visited:text-purple-600..."
            >
              Sign Up
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
