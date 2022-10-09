import React from "react";
import { WalletForm } from "./WalletForm";

export function Wallets({ wallets, setWallets }) {
  return (
    <div className="w-full max-w-lg mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 font-inter">
      <div className="card-body">
        <h2 className="text-lg font-bold">Wallets</h2>
        {wallets?.map((w) => {
          return <WalletForm w={w} key={w.id} setWallets={setWallets} />;
        })}
      </div>
    </div>
  );
}
