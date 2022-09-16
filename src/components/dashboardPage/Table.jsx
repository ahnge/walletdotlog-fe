import React from "react";

const Table = () => {
  return (
    <div className="overflow-x-auto mt-10">
      <h2 className=" text-2xl font-bold py-5">Latest logs</h2>
      <table className="table table-compact md:table-normal table-zebra w-full">
        {/* <!-- head --> */}
        <thead>
          <tr>
            <th></th>
            <th>Amount</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {/* <!-- row 1 --> */}
          <tr>
            <th>1</th>
            <td className=" text-green-400">10000</td>
            <td>Quality Control Specialist</td>
            <td>Blue</td>
          </tr>
          {/* <!-- row 2 --> */}
          <tr>
            <th>2</th>
            <td className=" text-green-400">5000</td>
            <td>Desktop Support Technician</td>
            <td>Purple</td>
          </tr>
          {/* <!-- row 3 --> */}
          <tr>
            <th>3</th>
            <td className=" text-red-400">7000</td>
            <td>Tax Accountant</td>
            <td>Red</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
