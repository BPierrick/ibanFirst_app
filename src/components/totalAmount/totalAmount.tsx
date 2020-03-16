import React, { useContext } from "react";
import { Account } from "../../store/appReducer";
import { AppContext } from "../../store/appProvider";

const TotalAmountComponent: React.FC<{}> = () => {
  const appContext = useContext(AppContext);
  const totalAmount = appContext.state.accounts.reduce(
    (totalAmount: number, account: Account) => {
      const rate = appContext.state.currencyRates[account.currency];
      if (undefined === rate) {
        return totalAmount + parseFloat(account.amount);
      } else {
        return totalAmount + rate * parseFloat(account.amount);
      }
    },
    0
  );

  return <div>{totalAmount} €</div>;
};

export default TotalAmountComponent;
