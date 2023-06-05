import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

export default function AddTask() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    //console.log(data);
    const title = data.title;
    const description = data.description;
    const status = data.status;
    //console.log(task, description, status);

    // add task to db
    fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ title, description, status }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  //  console.log(watch("example")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div className="w-2/3 mx-auto">
      <h1 className="text-4xl font-semibold text-center my-4">Add your task</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center "
      >
        {/* register your input into the hook by invoking the "register" function */}
        <div>
          <label htmlFor="title" className="label ">
            Task Title:
          </label>
          <input
            className="input input-bordered w-96 max-w-xs"
            placeholder="title"
            name="title"
            {...register("title")}
          />
        </div>

        {/* include validation with required or other standard HTML validation rules */}
        <div>
          <label htmlFor="desc" className="label ">
            Task Description:
          </label>
          <input
            className="input input-bordered w-96 max-w-xs"
            placeholder="description"
            name="desc"
            {...register("description", { required: true })}
          />
          {/* errors will return when field validation fails  */}
          {errors.description && (
            <div className="text-red-500">*This field is required</div>
          )}
        </div>
        <div>
          <label htmlFor="status" className="label">
            Status:{" "}
          </label>
          <select
            //placeholder="select"

            name="status"
            defaultValue="status"
            className="select select-bordered w-80"
            {...register("status")}
          >
            <option value="status" disabled>
              Status
            </option>
            <option value="done">done</option>
            <option value="ongoing">ongoing</option>
          </select>
        </div>

        <input
          type="submit"
          className="btn btn-outline mt-3"
          value="add task"
        />
      </form>
    </div>
  );
}