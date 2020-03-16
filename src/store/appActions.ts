import { AppState, Account } from "./appReducer";

export const SET_SELECTED_COUNTRY_ACTION = "SET_SELECTED_COUNTRY_ACTION";
interface SetSelectedCountryAction {
  type: "SET_SELECTED_COUNTRY_ACTION";
  code: string;
}
function setSelectedCountry(code: string): SetSelectedCountryAction {
  return {
    type: SET_SELECTED_COUNTRY_ACTION,
    code
  };
}

export const SET_ACCOUNT_DATA_ACTION = "SET_ACCOUNT_DATA_ACTION";
interface SetAccountDataAction {
  type: "SET_ACCOUNT_DATA_ACTION";
  accounts: Array<Account>;
}
function setAccountData(accounts: Array<Account>): SetAccountDataAction {
  return {
    type: SET_ACCOUNT_DATA_ACTION,
    accounts
  };
}

export const GET_ACCOUNT_DATA_ACTION = "GET_ACCOUNT_DATA_ACTION";
interface GetAccountDataAction {
  type: "GET_ACCOUNT_DATA_ACTION";
}
function getAccountData(): GetAccountDataAction {
  return {
    type: GET_ACCOUNT_DATA_ACTION
  };
}

export const SET_CURRENCY_RATE_ACTION = "SET_CURRENCY_RATE_ACTION";
interface SetCurrencyRateAction {
  type: "SET_CURRENCY_RATE_ACTION";
  currency: string;
  rate: number;
}

export const useActions = (state: AppState, dispatch: Function) => {
  return {
    setSelectedCountry: (code: string) => {
      dispatch(setSelectedCountry(code));
    },
    setAccountData: (accounts: Array<Account>) => {
      dispatch(setAccountData(accounts));
    },
    getAccountData: () => {
      dispatch(getAccountData());
    }
  };
};

export type AppAction =
  | SetSelectedCountryAction
  | SetAccountDataAction
  | GetAccountDataAction
  | SetCurrencyRateAction;
