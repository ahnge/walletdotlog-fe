import React, { useState } from "react";
import useAxios from "../../utils/useAxios";

const AddLogForm = ({
  setPlusLogFormOpen,
  setAddLogSuccess,
  setAddLogErr,
  currentWallet,
  setCurrentWallet,
  getLogs,
}) => {
  // local states
  const [amount, setAmount] = useState();
  const [description, setDescription] = useState();

  const [loading, setLoading] = useState(false);

  // intercepted axios
  const ai = useAxios();

  const handleSubmit = (e) => {
    e.preventDefault();
    const addLog = async () => {
      const data = { amount, description, log_type: "p" };
      setLoading(true);
      const res = await ai.post(
        `/api/wallet/${currentWallet.id}/log/list-create/`,
        data
      );
      console.log("addLog success", res);
      const newAmount = currentWallet.amount + parseInt(amount);
      setCurrentWallet((p) => {
        return { ...p, amount: newAmount };
      });
      setLoading(false);
      setAddLogSuccess(true);
      getLogs(currentWallet.id).catch((err) => console.log("getLogs err", err));
      setTimeout(() => setAddLogSuccess(false), 3000);
      setPlusLogFormOpen((p) => !p);
    };
    addLog().catch((err) => {
      console.log(err);
      setLoading(false);
      setAddLogErr(true);
      setTimeout(() => setAddLogErr(false), 3000);
      setPlusLogFormOpen((p) => !p);
    });
  };

  return (
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
              className={`btn btn-primary ${loading ? "loading" : ""}`}
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLogForm;
