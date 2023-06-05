import { createBrowserRouter } from "react-router-dom";
import AddTask from "../pages/AddTask/AddTask";
import DisplayTask from "../pages/DisplayTask/DisplayTask";
import UpdateTask from "../pages/UpdateTask/UpdateTask";
import Root from "../layout/Root";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRouter from "./PrivateRouter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRouter>
            <DisplayTask />
          </PrivateRouter>
        ),
        loader: () => fetch("http://localhost:3000/tasks"),
      },
      {
        path: "addTask",
        element: (
          <PrivateRouter>
            <AddTask />
          </PrivateRouter>
        ),
      },
      {
        path: "updateTask/:id",
        element: (
          <PrivateRouter>
            {" "}
            <UpdateTask />
          </PrivateRouter>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
