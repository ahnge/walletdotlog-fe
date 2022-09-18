import React from "react";

const SubstractLogForm = ({ setMinusLogFormOpen }) => {
  return (
    <div className="fixed flex justify-center items-center z-50 inset-0 px-10">
      <div
        className=" absolute inset-0 bg-white/30 backdrop-blur-sm cursor-pointer"
        onClick={() => setMinusLogFormOpen((p) => !p)}
      ></div>
      <div className="card bg-neutral text-neutral-content w-full max-w-sm shadow-xl">
        <div className="card-body">
          <h2 className="card-title block text-center">Subtract</h2>
          <form className="mt-5 space-y-3">
            <input
              type="number"
              className="input input-bordered w-full input-primary text-black"
              placeholder="Initial amount"
              min="1"
            />
            <input
              type="text"
              className="input input-bordered w-full input-primary text-black"
              placeholder="Description"
            />
            <input type="submit" value="Add" className="btn btn-primary" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubstractLogForm;
