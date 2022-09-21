import React, { useState } from "react";
import useAxios from "../../utils/useAxios";

const SubstractLogForm = ({
  setMinusLogFormOpen,
  setSubstractLogSuccess,
  setSubstractLogErr,
  getLogs,
  currentWallet,
  setCurrentWallet,
  setInsufficientErr,
}) => {
  // local states
  const [amount, setAmount] = useState();
  const [description, setDescription] = useState();

  const [loading, setLoading] = useState(false);

  // intercepted axios
  const ai = useAxios();

  const updateCurrentWallet = () => {
    const init_amount = currentWallet.amount;
    const entry_amount = parseInt(amount);
    let newAmount;
    if (init_amount > entry_amount) {
      newAmount = currentWallet.amount - parseInt(amount);
    } else {
      setInsufficientErr(true);
      setTimeout(() => {
        setInsufficientErr(false);
      }, 3000);
      newAmount = 0;
    }

    setCurrentWallet((p) => {
      return { ...p, amount: newAmount };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const substractLog = async () => {
      const data = { amount, description, log_type: "n" };
      setLoading(true);
      const res = await ai.post(
        `/api/wallet/${currentWallet.id}/log/list-create/`,
        data
      );
      console.log("addLog success", res);
      updateCurrentWallet();
      setLoading(false);
      setSubstractLogSuccess(true);
      getLogs(currentWallet.id).catch((err) => console.log("getLogs err", err));
      setTimeout(() => setSubstractLogSuccess(false), 3000);
      setMinusLogFormOpen((p) => !p);
    };
    substractLog().catch((err) => {
      console.log(err);
      setLoading(false);
      setSubstractLogErr(true);
      setTimeout(() => setSubstractLogErr(false), 3000);
      setMinusLogFormOpen((p) => !p);
    });
  };
  return (
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
              className={`btn btn-primary ${loading ? "loading" : ""}`}
            >
              Substract
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubstractLogForm;
