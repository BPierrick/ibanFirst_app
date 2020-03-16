import React from "react";
import { Account } from "../../store/appReducer";

interface AccountComponentProps {
  account: Account;
}

const AccountComponent: React.FC<AccountComponentProps> = (
  props: AccountComponentProps
) => {
  const { account } = props;
  return (
    <ul>
      <li>
        <span>{account.tag}</span>
      </li>
      <li>
        <span>{account.accountNumber}</span>
      </li>
      <li>
        <span>{account.holderBank.bic}</span>
      </li>
      <li>
        <span>
          {account.currency} {account.amount}
        </span>
      </li>
    </ul>
  );
};

export default AccountComponent;
