import React, { useContext } from "react";
import { Context } from "../index";
import Loader from "../components/Loader";
import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {format} from "date-fns"

const Profile = () => {
  const { isAuthenticated, user, loading } = useContext(Context);
  // console.log(user);
  if (!isAuthenticated)
    return toast.error("Login first"), (<Navigate to={"/login"} />);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
          <>
            <p className="text-center text-red-500 font-bold">Important ! Please refresh the page to display user details</p>
          <section class="font-medium  mt-10 mx-auto">
            <section class="w-96 mx-auto bg-[#20354b] rounded-2xl px-8 py-10 shadow-lg">
              <div class="flex items-center justify-between">
                <span class="text-emerald-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                    />
                  </svg>
                </span>
              </div>
              <div class=" w-fit mx-auto mb-20">
                <h1 className="text-white text-2xl font-bold ">User Detail</h1>
              </div>

              <div class="mt-10 ">
                <h2 class="text-white font-bold text-2xl tracking-wide">
                  {user.name}
                </h2>
              </div>
              <p class="text-emerald-400 font-semibold mt-2.5">{user.email}</p>

              <div class="h-1 w-full bg-black mt-8 rounded-full">
                <div class="h-1 rounded-full w-2/5 bg-yellow-500 "></div>
              </div>
              <div class="mt-3 text-white text-sm">
                <span class="text-gray-400 font-semibold">
                  ID Creation Date :{" "}
                </span>
                <span>{format(new Date(user.createdAt), "dd-mm-yyyy")}</span>
              </div>
            </section>
          </section>
        </>
      )}
    </div>
  );
};

export default Profile;
