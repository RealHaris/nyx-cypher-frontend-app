// SharedStateContext.js
import React, { createContext, useContext, useState } from "react";

const SharedStateContext = createContext();

export function SharedStateProvider({ children }) {
  const [navbarValue, setNavbarValue] = useState("");
  const [searchbarValue, setSearchbarValue] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const updateNavbarValue = (newValue) => {
    setNavbarValue(newValue);
  };

  const updateSearchbarValue = (newValue) => {
    setSearchbarValue(newValue);
  };

  const updateWalletConnection = (connected, address = "") => {
    setIsWalletConnected(Boolean(connected));
    setWalletAddress(address || "");
  };

  const sharedState = {
    navbarValue,
    searchbarValue,
    updateNavbarValue,
    updateSearchbarValue,
    walletAddress,
    isWalletConnected,
    updateWalletConnection,
  };

  return (
    <SharedStateContext.Provider value={sharedState}>
      {children}
    </SharedStateContext.Provider>
  );
}

export function useSharedState() {
  return useContext(SharedStateContext);
}
