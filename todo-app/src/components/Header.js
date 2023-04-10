import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import server, { Context } from "..";
import axios from "axios";
import { toast } from "react-hot-toast";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const logoutHandler = async () => {
    setLoading(true);
    try {
      await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });

      toast.success("Logout Successfully");
      setIsAuthenticated(false);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
    }
  };
  // if (!isAuthenticated) return <Navigate to={"/login"} />;

  return (
    <>
      <nav className=" bg-[#20354b] px-4 sm:px-10 py-2 text-white flex justify-between items-center">
        <div>
          <h1 className="text-xl sm:text-2xl">Todo App</h1>
        </div>
        <div className="text-xl w-48 flex justify-between align-middle mx-11">
          <Link
            to={"/"}
            className="rounded-none px-4 py-1 hover:bg-white hover:text-[#20354b]"
          >
            Home
          </Link>
          <Link
            to={"/profile"}
            className="rounded-none px-4 py-1 hover:bg-white hover:text-[#20354b]"
          >
            Profile
          </Link>

          {isAuthenticated ? (
            loading ? (
              <button
                onClick={logoutHandler}
                disabled
                className="rounded-none px-4 py-1  bg-gray-400 text-white"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={logoutHandler}
                disabled={loading}
                className="rounded-none px-4 py-1 hover:bg-white hover:text-[#20354b]"
              >
                Logout
              </button>
            )
          ) : (
            <Link
              to={"/login"}
              className="rounded-none px-4 py-1 hover:bg-white hover:text-[#20354b]"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
