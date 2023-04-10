import React, { useContext } from "react";
import { Context } from "../index";
import Loader from "./Loader";
const Profile = () => {
  const { isAuthenticated, user, loading } = useContext(Context);

  console.log(user);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <h1 className="text-5xl">{user.name}</h1>
          <p>{user.email}</p>
          <h1 className="text-xl">
            Created At : {user.createdAt}
          </h1>
        </>
      )}
    </div>
  );
};

export default Profile;
