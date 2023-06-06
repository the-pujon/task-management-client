import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function UpdateTask() {
  const { id } = useParams();
  const state = useLocation().state;
  const { title, description, status } = state;
  const navigate = useNavigate();

  //for react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //for getting data from form
  const onSubmit = (data) => {
    const title = data.title;
    const description = data.description;
    const status = data.status;

    // Update task to db
    fetch(`https://backend-dusky-eight.vercel.app/tasks/${id}`, {
      method: "PUT",
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

  return (
    <div className="w-2/3 mx-auto">
      <h1 className="text-4xl font-semibold text-center my-4">Add your task</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center "
      >
        {/* for title */}
        <div>
          <label htmlFor="title" className="label ">
            Task Title:
          </label>
          <input
            className="input input-bordered w-96 max-w-xs"
            placeholder="title"
            defaultValue={title}
            name="title"
            {...register("title")}
          />
        </div>

        {/* for description */}
        <div>
          <label htmlFor="desc" className="label ">
            Task Description:
          </label>
          <input
            className="input input-bordered w-96 max-w-xs"
            placeholder="description"
            defaultValue={description}
            name="desc"
            {...register("description", { required: true })}
          />
          {/* errors will return when field validation fails  */}
          {errors.description && (
            <div className="text-red-500">*This field is required</div>
          )}
        </div>

        {/* for status */}
        <div>
          <label htmlFor="status" className="label">
            Status:{" "}
          </label>
          <select
            name="status"
            defaultValue={status}
            className="select select-bordered w-80"
            {...register("status")}
          >
            <option value="done">done</option>
            <option value="ongoing">ongoing</option>
          </select>
        </div>

        <input
          type="submit"
          className="btn btn-outline mt-3"
          value="Update task"
        />
      </form>
    </div>
  );
}
