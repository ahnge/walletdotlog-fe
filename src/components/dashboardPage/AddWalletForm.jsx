import React, { useState } from "react";

const AddWalletForm = ({ setWalletFormOpen }) => {
  // local states
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div className="fixed flex justify-center items-center z-50 inset-0 px-10">
      <div
        className=" absolute inset-0 bg-white/30 backdrop-blur-sm cursor-pointer"
        onClick={() => setWalletFormOpen((p) => !p)}
      ></div>
      <div className="card bg-neutral text-neutral-content w-full max-w-sm  shadow-xl">
        <div className="card-body">
          <h2 className="card-title block text-center">Add wallet</h2>
          <form className="mt-5 space-y-3">
            <input
              type="text"
              className="input input-bordered w-full input-primary text-black"
              placeholder="Wallet name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="number"
              className="input input-bordered w-full input-primary text-black"
              placeholder="Initial amount"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <input type="submit" value="Add" className="btn btn-primary" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddWalletForm;
