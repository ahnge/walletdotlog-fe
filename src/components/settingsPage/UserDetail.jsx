import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";

export function UserDetail() {
  const { authState, authDispatch } = useAuth();
  // local states
  const [name, setName] = useState(authState.user.full_name);
  const [img, setImg] = useState(null);

  const axiosInstance = useAxios();

  const updateData = () => {
    let form_data = new FormData();
    form_data.append("full_name", name);
    if (img) form_data.append("image", img);
    return axiosInstance
      .patch("dj-rest-auth/user/", form_data)
      .then((res) => res.data);
  };

  const { mutate, status, error } = useMutation(updateData, {
    onSuccess: (data) => {
      authDispatch({ type: "updateProfile", payload: data });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate();
  };
  return (
    <div className="w-full max-w-lg mx-auto mt-10 sm:mt-0 overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 font-inter">
      <form className=" card-body" onSubmit={handleSubmit}>
        <h2 className="font-bold text-xl">User</h2>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Full name</span>
          </label>
          <input
            type="text"
            placeholder="Full name"
            className="input input-bordered"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Profile image</span>
          </label>
          <div className="flex items-center space-x-3">
            <div className="avatar inline">
              <div className="w-12 rounded-full">
                <img src={authState.user.profile_img} />
              </div>
            </div>
            <input
              type="file"
              accept="image/jpeg,image/png"
              className=" bg-slate-100 p-2 rounded-md"
              onChange={(e) => setImg(e.target.files[0])}
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-sm sm:btn-sm md:btn-md w-fit mt-3"
        >
          Save
        </button>
      </form>
    </div>
  );
}
