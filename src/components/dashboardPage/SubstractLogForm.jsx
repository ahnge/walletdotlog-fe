import React, { useState } from "react";
import Alert from "../Alert";
import useAxios from "../../hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const SubstractLogForm = ({
  setMinusLogFormOpen,
  currentWallet,
  setCurrentWallet,
}) => {
  // local states
  const [amount, setAmount] = useState();
  const [description, setDescription] = useState();

  // intercepted axios
  const axiosInstance = useAxios();

  const queryClient = useQueryClient();

  const calculateNewAmount = (cw) => {
    const init_amount = cw.amount;
    const entry_amount = parseInt(amount);
    let newAmount;
    if (init_amount > entry_amount) {
      newAmount = cw.amount - parseInt(amount);
    } else {
      newAmount = 0;
    }
    return newAmount;
  };

  const substractLog = () => {
    return axiosInstance
      .post(`api/wallet/${currentWallet.id}/log/list-create/`, {
        amount,
        description,
        log_type: "n",
      })
      .then((res) => res.data);
  };

  const { mutate, status } = useMutation(substractLog, {
    onSuccess: (data) => {
      queryClient.setQueryData(["logs", currentWallet.id], (old) => [
        ...old,
        data,
      ]);
      queryClient.setQueryData(["wallets"], (old) => {
        const newWallets = old.map((w) => {
          if (w.id !== currentWallet.id) return w;
          return { ...w, amount: calculateNewAmount(currentWallet) };
        });
        return newWallets;
      });
      setCurrentWallet({
        ...currentWallet,
        amount: calculateNewAmount(currentWallet),
      });
      setMinusLogFormOpen((p) => !p);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate();
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const substractLog = async () => {
  //     const data = { amount, description, log_type: "n" };
  //     setLoading(true);
  //     const res = await ai.post(
  //       `/api/wallet/${walletState.currentWallet.id}/log/list-create/`,
  //       data
  //     );
  //     console.log("addLog success", res);
  //     updateCurrentWallet();
  //     setLoading(false);
  //     setSubstractLogSuccess(true);
  //     getLogs(walletState.currentWallet.id).catch((err) =>
  //       console.log("getLogs err", err)
  //     );
  //     setTimeout(() => setSubstractLogSuccess(false), 3000);
  //     setMinusLogFormOpen((p) => !p);
  //   };
  //   substractLog().catch((err) => {
  //     console.log(err);
  //     setLoading(false);
  //     setSubstractLogErr(true);
  //     setTimeout(() => setSubstractLogErr(false), 3000);
  //     setMinusLogFormOpen((p) => !p);
  //   });
  // };
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
          onClick={() => setMinusLogFormOpen((p) => !p)}
        ></div>
        <div className="card bg-neutral text-neutral-content w-full max-w-sm shadow-xl">
          <div className="card-body">
            <h2 className="card-title block text-center">Subtract</h2>
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
                Substract
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubstractLogForm;
