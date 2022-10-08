import React from "react";
import { useState } from "react";
import { DeleteIcon } from "../svgs/DashboardIcons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";

export function WalletForm({ w }) {
  const [name, setName] = useState(w.name);

  const ai = useAxios();

  const queryClient = useQueryClient();

  const updateWalletName = () => {
    return ai
      .patch(`api/wallet/${w.id}/detail/`, { name })
      .then((res) => res.data);
  };

  const { mutate } = useMutation(updateWalletName, {
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate();
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center space-x-3 justify-between mt-5">
        <input
          type="text"
          className="input input-bordered w-full"
          value={name}
          placeholder="Wallet's name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <div>
          <DeleteIcon />
        </div>
      </div>
      <button type="submit" className="btn mt-3 btn-sm sm:btn-sm md:btn-md ">
        Save
      </button>
    </form>
  );
}
