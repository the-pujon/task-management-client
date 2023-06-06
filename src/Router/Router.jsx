import { createBrowserRouter } from "react-router-dom";
import AddTask from "../pages/AddTask/AddTask";
import DisplayTask from "../pages/DisplayTask/DisplayTask";
import UpdateTask from "../pages/UpdateTask/UpdateTask";
import Root from "../layout/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <DisplayTask />,
        loader: () => fetch("https://backend-dusky-eight.vercel.app/tasks"),
      },
      {
        path: "addTask",
        element: <AddTask />,
      },
      {
        path: "updateTask/:id",
        element: <UpdateTask />,
      },
    ],
  },
]);

export default router;
