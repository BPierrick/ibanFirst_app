import React, { useContext, useEffect } from "react";
import { AppContext } from "../../store/appProvider";
import AccountComponent from "../account/account";
import { Account } from "../../store/appReducer";
import { Card, Divider } from "@material-ui/core";

const AccountContainer: React.FC<{}> = () => {
  const appContext = useContext(AppContext);
  const { state, actions } = appContext;

  useEffect(() => {
    actions.getAccountData();
  }, []);

  const accountsToDisplay: Array<JSX.Element> = [];
  state.accounts.forEach((account: Account, index: number) => {
    if (
      state.selectedCountryCode === "" ||
      state.selectedCountryCode === account.holderBank.address.country
    ) {
      accountsToDisplay.push(
        <div key={index}>
          <AccountComponent account={account} />
          <Divider variant="middle" />
        </div>
      );
    }
  });

  console.log(accountsToDisplay.length);

  return (
    <div
      className="accountCountainer"
      style={{ textAlign: "left", overflowY: "auto" }}
    >
      {accountsToDisplay.length > 0 && <Card variant="outlined">{accountsToDisplay}</Card>}
    </div>
  );
};

export default AccountContainer;
