import React from "react";
import { useState } from "react";
import { DeleteIcon } from "../svgs/DashboardIcons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import Alert from "../Alert";
import { useGlobalContext } from "../../context/GlobalContext";

export function WalletForm({ w, setWallets }) {
  const [name, setName] = useState(w.name);

  const { globalState, globalDispatch } = useGlobalContext();

  const ai = useAxios();

  const queryClient = useQueryClient();

  const updateWalletName = () => {
    return ai
      .patch(`api/wallet/${w.id}/detail/`, { name })
      .then((res) => res.data);
  };

  const deleteWallet = (id) => {
    return ai.delete(`api/wallet/${id}/detail/`).then((res) => res.data);
  };

  const { mutate, status } = useMutation(updateWalletName, {
    onSuccess: (data) => {
      // change the wallets query
      queryClient.setQueryData(["wallets"], (old) => {
        const newWallets = old.map((wl) => {
          if (wl.id !== w.id) return wl;
          return { ...wl, name: data.name };
        });
        return newWallets;
      });

      // change the current wallet if changed one is current wallet
      if (globalState.currentWallet?.id === w.id) {
        globalDispatch({ type: "updateName", payload: data.name });
      }
    },
  });

  const { mutate: deleteMutate, status: deleteStatus } = useMutation(
    deleteWallet,
    {
      onSuccess: () => {
        // change the wallets query
        queryClient.setQueryData(["wallets"], (old) => {
          const newWallets = old.filter((wl) => {
            if (wl.id !== w.id) return wl;
          });
          // change the wallets state
          setWallets(newWallets);
          return newWallets;
        });

        // if deleted one is currentwallet; empty it
        if (w.id === globalState.currentWallet.id)
          globalDispatch({ type: "setCurrentWallet", payload: {} });
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate();
  };
  return (
    <>
      {/* Alert */}
      {status === "error" && (
        <Alert type="error" text="Something went wrong!" />
      )}
      {status === "success" && <Alert type="success" text="Success!" />}
      {deleteStatus === "error" && (
        <Alert type="error" text="Something went wrong!" />
      )}
      {/* Alert End */}
      <form onSubmit={handleSubmit}>
        <div className="flex items-center space-x-3 justify-between mt-5">
          <input
            type="text"
            className="input input-bordered w-full"
            value={name}
            placeholder="Wallet's name"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <div className=" cursor-pointer" onClick={() => deleteMutate(w.id)}>
            <DeleteIcon />
          </div>
        </div>
        <button type="submit" className="btn mt-3 btn-sm sm:btn-sm md:btn-md ">
          Save
        </button>
      </form>
    </>
  );
}
