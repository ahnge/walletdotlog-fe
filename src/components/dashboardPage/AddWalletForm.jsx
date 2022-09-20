import React, { useState } from "react";
import useAxios from "../../utils/useAxios";

const AddWalletForm = ({
  setWalletFormOpen,
  setAddWalletSuccess,
  setAddWalletErr,
  getWallets,
  handleLogout,
}) => {
  // local states
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const [loading, setLoading] = useState(false);

  // intercepted axios
  const ai = useAxios();

  // functions
  const handleSubmit = (e) => {
    e.preventDefault();
    const addWallet = async () => {
      const data = { name, amount };
      setLoading(true);
      const res = await ai.post("/api/wallet/list-create/", data);
      console.log("addWallet success", res);
      setLoading(false);
      setAddWalletSuccess(true);
      setTimeout(() => setAddWalletSuccess(false), 3000);
      getWallets().catch((err) => {
        console.log("get wallet err", err);
        handleLogout();
      });
      setWalletFormOpen((p) => !p);
    };
    addWallet().catch((err) => {
      console.log(err);
      setLoading(false);
      setAddWalletErr(true);
      setTimeout(() => setAddWalletErr(false), 3000);
      setWalletFormOpen((p) => !p);
    });
  };

  return (
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
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <button
              className={`btn btn-primary ${loading ? "loading" : ""}`}
              type="submit"
            >
              add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddWalletForm;
