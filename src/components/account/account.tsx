import React from "react";
import "./account.scss";
import { Account } from "../../store/appReducer";
import AmountWrapper from "../amountWrapper/amountWrapper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

interface AccountComponentProps {
  account: Account;
}

const AccountComponent: React.FC<AccountComponentProps> = (
  props: AccountComponentProps
) => {
  const { account } = props;
  return (
    <Card variant="outlined">
      <CardContent>
        <ul className="accountInfo">
          <li>
            <Typography color="primary" variant="h6">
              Name
            </Typography>
            <Typography color="textPrimary" variant="subtitle1" gutterBottom>
              {account.tag}
            </Typography>
            <Divider variant="middle" />
          </li>
          <li>
            <Typography color="primary" variant="h6">
              Number
            </Typography>
            <Typography color="textPrimary" variant="subtitle1" gutterBottom>
              {account.accountNumber}
            </Typography>
            <Divider variant="middle" />
          </li>
          <li>
            <Typography color="primary" variant="h6">
              BIC
            </Typography>
            <Typography color="textPrimary" variant="subtitle1" gutterBottom>
              {account.holderBank.bic}
            </Typography>
            <Divider variant="middle" />
          </li>
          <li>
            <Typography color="primary" variant="h6">
              Amount
            </Typography>
            <AmountWrapper currency={account.currency}>
              {parseFloat(account.amount)}
            </AmountWrapper>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default AccountComponent;
