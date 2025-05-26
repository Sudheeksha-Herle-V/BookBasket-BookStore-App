import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    await axios
      .post("http://localhost:4001/user/login", userInfo)
      .then((res) => {
        if (res.data) {
          toast.success("Logged in Successfully");
          document.getElementById("my_modal_3").close();
          setTimeout(() => {
            localStorage.setItem("Users", JSON.stringify(res.data.user));
            window.location.reload();
          }, 1000);
        }
      })
      .catch((err) => {
        if (err.response) {
          toast.error("Error: " + err.response.data.message);
        }
      });
  };

  return (
    <div className="bg-white">
      <dialog id="my_modal_3" className="modal">
  <div className="modal-box flex flex-col items-center justify-center bg-white">
    <form onSubmit={handleSubmit(onSubmit)} method="dialog" className="w-full max-w-sm text-center">
      <Link
        to="/"
        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        onClick={() => document.getElementById("my_modal_3").close()}
      >
        ✕
      </Link>

      <h3 className="text-xl font-bold text-gray-800 mb-4">Login</h3>

      {/* Email */}
      <div className="mb-4 text-left w-full">
        <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 border rounded-md bg-white text-black"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">This field is required</p>
        )}
      </div>

      {/* Password */}
      <div className="mb-6 text-left w-full">
        <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full px-4 py-2 border rounded-md bg-white text-black"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <p className="text-sm text-red-500 mt-1">This field is required</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3 items-center">
        <button className="w-full bg-pink-500 text-white rounded-md py-2 hover:bg-pink-600 transition">
          Login
        </button>
        <p className="text-sm text-gray-600">
          Not registered?{" "}
          <Link to="/signup" className="underline text-blue-500">
            Signup
          </Link>
        </p>
      </div>
    </form>
  </div>
</dialog>

    </div>
  );
}

export default Login;
