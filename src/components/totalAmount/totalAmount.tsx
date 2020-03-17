import React, { useContext } from "react";
import { Account } from "../../store/appReducer";
import { AppContext } from "../../store/appProvider";
import AmountWrapper from "../amountWrapper/amountWrapper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const TotalAmountComponent: React.FC<{}> = () => {
  // const appContext = useContext(AppContext);
  const { state } = useContext(AppContext);

  if (!state.currencyRatesLoaded) {
    return <span>Loading...</span>;
  }

  const totalAmount = state.accounts.reduce(
    (totalAmount: number, account: Account) => {
      const rate = state.currencyRates[account.currency];
      if (undefined === rate) {
        return totalAmount + parseFloat(account.amount);
      } else {
        return totalAmount + rate * parseFloat(account.amount);
      }
    },
    0
  );
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography color="primary" variant="h6">
          Total Amount
        </Typography>
        <AmountWrapper currency={"EUR"}>{totalAmount}</AmountWrapper>
      </CardContent>
    </Card>
  );
};

export default TotalAmountComponent;
