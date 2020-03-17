import React from "react";
import { AppContext } from "../../store/appProvider";
import AccountComponent from "../account/account";
import { Account } from "../../store/appReducer";
import { Card, Divider } from "@material-ui/core";

class AccountContainer extends React.PureComponent<{}, {}> {
  static contextType = AppContext;

  componentDidMount() {
    this.context.actions.getAccountData();
  }
  
  render() {
    const accountsToDisplay: Array<JSX.Element> = [];
    const { state } = this.context;
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

    return (
      <div
        className="accountCountainer"
        style={{ textAlign: "left", overflowY: "auto" }}
      >
        {accountsToDisplay.length > 0 && (
          <Card variant="outlined">{accountsToDisplay}</Card>
        )}
      </div>
    );
  }
}

export default AccountContainer;
