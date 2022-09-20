import React from "react";

const Table = ({ logs }) => {
  return (
    <div className="overflow-x-auto mt-10">
      <h2 className=" text-2xl font-bold py-5">Latest logs</h2>
      {logs.length > 0 ? (
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
            {logs?.map((log) => {
              return (
                <tr key={log.id}>
                  <th>1</th>
                  <td className="">{log.amount}</td>
                  <td>{log.description}</td>
                  <td>{log.created_at}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div>There is no logs in this wallet.</div>
      )}
    </div>
  );
};

export default Table;
