import React from "react";
import LoadingTable from "./LoadingTable";
import { Down, Up } from "./svgs/DashboardIcons";

const Table = ({ logs, loadingLogs, title, loadingRows }) => {
  return (
    <div className="overflow-x-auto mt-10 min-h-fit mb-10">
      <h2 className=" text-2xl font-bold py-5">{title}</h2>
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
                  <td></td>
                  <td
                    className={`${
                      log.log_type === "p" ? "text-success" : "text-error"
                    } flex space-x-3`}
                  >
                    <span>{log.amount}</span>
                    <span>{log.log_type === "p" ? <Up /> : <Down />}</span>
                  </td>
                  <td>{log.description}</td>
                  <td>{log.created_at}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div>
          {loadingLogs ? (
            <LoadingTable loadingRows={loadingRows} />
          ) : (
            <div>There is no logs in this wallet.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Table;
