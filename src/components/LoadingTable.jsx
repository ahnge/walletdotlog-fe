import React from "react";

const LoadingTable = ({ loadingRows }) => {
  // console.log([...Array(loadingRows).keys()]);
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
        {/* Just a fancy solution to reuse the loading table 😎 */}
        {[...Array(loadingRows).keys()].map((i) => {
          return (
            <tr key={i}>
              {i % 2 === 0 ? (
                <>
                  <td className="text-white bg-white">a</td>
                  <td className="text-white bg-white">a</td>
                  <td className="text-white bg-white">a</td>
                  <td className="text-white bg-white">a</td>
                </>
              ) : (
                <td className=" opacity-0">a</td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default LoadingTable;
