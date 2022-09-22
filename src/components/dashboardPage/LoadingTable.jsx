import React from "react";

const LoadingTable = () => {
  return (
    <table className="table table-compact animate-pulse md:table-normal w-full">
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
        <tr>
          <td className="text-white bg-white">a</td>
          <td className="text-white bg-white">a</td>
          <td className="text-white bg-white">a</td>
          <td className="text-white bg-white">a</td>
        </tr>
        <tr>
          <td className=" opacity-0">a</td>
        </tr>
        <tr>
          <td className="text-white bg-white">a</td>
          <td className="text-white bg-white">a</td>
          <td className="text-white bg-white">a</td>
          <td className="text-white bg-white">a</td>
        </tr>
        <tr>
          <td className=" opacity-0">a</td>
        </tr>
        <tr>
          <td className="text-white bg-white">a</td>
          <td className="text-white bg-white">a</td>
          <td className="text-white bg-white">a</td>
          <td className="text-white bg-white">a</td>
        </tr>
      </tbody>
    </table>
  );
};

export default LoadingTable;
