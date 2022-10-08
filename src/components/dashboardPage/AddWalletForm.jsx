import React, { useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Alert from "../Alert";
import { useGlobalContext } from "../../context/GlobalContext";

const AddWalletForm = ({ setWalletFormOpen }) => {
  // local states
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const { globalState, globalDispatch } = useGlobalContext();

  // intercepted axios
  const ai = useAxios();

  const queryClient = useQueryClient();

  const addWallet = () => {
    return ai
      .post("api/wallet/list-create/", { name, amount })
      .then((res) => res.data);
  };

  const { mutate, status } = useMutation(addWallet, {
    onSuccess: (data) => {
      queryClient.setQueryData(["wallets"], (old) => [...old, data]);
      console.log(data);
      if (!globalState.currentWallet.id) {
        globalDispatch({ type: "setCurrentWallet", payload: data });
      }
      setWalletFormOpen((p) => !p);
    },
    onSettled: () => {
      setName("");
      setAmount("");
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
          onClick={() => setWalletFormOpen((p) => !p)}
        ></div>
        <div className="card bg-neutral text-neutral-content w-full max-w-sm  shadow-xl">
          <div className="card-body">
            <h2 className="card-title block text-center">Add wallet</h2>
            <form className="mt-5 space-y-3" onSubmit={handleSubmit}>
              <input
                type="text"
                className="input input-bordered w-full input-primary text-black"
                placeholder="Wallet name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="number"
                className="input input-bordered w-full input-primary text-black"
                placeholder="Initial amount"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
              <button
                className={`btn btn-primary ${
                  status === "loading" ? "loading" : ""
                }`}
                type="submit"
              >
                add
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddWalletForm;
