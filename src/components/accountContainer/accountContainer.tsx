import React, { useContext, useEffect } from "react";
import { AppContext } from "../../store/appProvider";
import AccountComponent from "../account/account";
import { Account } from "../../store/appReducer";

const AccountContainer: React.FC<{}> = () => {
  const appContext = useContext(AppContext);
  const { state, actions } = appContext;

  useEffect(() => {
    actions.getAccountData();
  }, []);

  return (
    <div style={{ textAlign: "left", overflowY: "auto" }}>
      {state.accounts.map((account: Account, index: number) => {
        if (
          state.selectedCountryCode === "" ||
          state.selectedCountryCode === account.holderBank.address.country
        ) {
          return <AccountComponent key={index} account={account} />;
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default AccountContainer;
