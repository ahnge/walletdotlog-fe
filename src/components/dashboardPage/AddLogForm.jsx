import React, { useState } from "react";
import useAxios from "../../hooks/useAxios";
import Alert from "../Alert";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const AddLogForm = ({
  setPlusLogFormOpen,
  currentWallet,
  setCurrentWallet,
}) => {
  // local states
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  // intercepted axios
  const axiosInstance = useAxios();

  const queryClient = useQueryClient();

  const addLog = () => {
    return axiosInstance
      .post(`api/wallet/${currentWallet.id}/log/list-create/`, {
        amount,
        description,
        log_type: "p",
      })
      .then((res) => res.data);
  };

  const { mutate, status } = useMutation(addLog, {
    onSuccess: (data) => {
      console.log(data);
      queryClient.setQueryData(["logs", currentWallet.id], (old) => [
        ...old,
        data,
      ]);
      queryClient.setQueryData(["wallets"], (old) => {
        const newWallets = old.map((w) => {
          if (w.id !== currentWallet.id) return w;
          return { ...w, amount: w.amount + parseInt(amount) };
        });
        return newWallets;
      });
      setCurrentWallet({
        ...currentWallet,
        amount: currentWallet.amount + parseInt(amount),
      });
      setPlusLogFormOpen((p) => !p);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <>
      {/* Alert */}
      <div className="fixed top-20 right-10 w-fit z-50 transition duration-500 flex flex-col space-y-3">
        {status === "error" && (
          <Alert type="error" text="Something went wrong!" />
        )}
      </div>
      {/* Alert End */}
      <div className="fixed flex justify-center items-center z-50 inset-0 px-10">
        <div
          className=" absolute inset-0 bg-white/30 backdrop-blur-sm cursor-pointer"
          onClick={() => setPlusLogFormOpen((p) => !p)}
        ></div>
        <div className="card bg-neutral text-neutral-content w-full max-w-sm shadow-xl">
          <div className="card-body">
            <h2 className="card-title block text-center">Add</h2>
            <form className="mt-5 space-y-3" onSubmit={handleSubmit}>
              <input
                type="number"
                className="input input-bordered w-full input-primary text-black"
                placeholder="Amount"
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
              <input
                type="text"
                className="input input-bordered w-full input-primary text-black"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <button
                type="submit"
                className={`btn btn-primary ${
                  status === "loading" ? "loading" : ""
                }`}
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddLogForm;
