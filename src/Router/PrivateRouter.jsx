import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate } from "react-router-dom";

const PrivateRouter = ({ children }) => {
  const { loading, user } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <div className="w-20 h-20 border-4 border-dashed rounded-full animate-spin dark:border-black"></div>
      </div>
    );
  }
  if (user) {
    return children;
  }

  return <Navigate to="/login"></Navigate>;
};

export default PrivateRouter;
