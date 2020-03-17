import { AppState, Account } from "./appReducer";

//________________________________________________________________________
/**
 * Action dispatched when a country is selected from the map component
 */
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

//________________________________________________________________________
/**
 * Action dispatched by the middleware when received new account datas
 */
export const SET_ACCOUNT_DATA_ACTION = "SET_ACCOUNT_DATA_ACTION";
interface SetAccountDataAction {
  type: "SET_ACCOUNT_DATA_ACTION";
  accounts: Array<Account>;
}

//________________________________________________________________________
/**
 * Action dispatched by account container component on load
 */
export const GET_ACCOUNT_DATA_ACTION = "GET_ACCOUNT_DATA_ACTION";
interface GetAccountDataAction {
  type: "GET_ACCOUNT_DATA_ACTION";
}
function getAccountData(): GetAccountDataAction {
  return {
    type: GET_ACCOUNT_DATA_ACTION
  };
}

//________________________________________________________________________
/**
 * Action dispatched by the middleware after receiving new account datas.
 * It is used to set the account currency rate with EURO currency
 */
export const SET_CURRENCY_RATE_ACTION = "SET_CURRENCY_RATE_ACTION";
interface SetCurrencyRateAction {
  type: "SET_CURRENCY_RATE_ACTION";
  currency: string;
  rate: number;
}

//________________________________________________________________________
/**
 * Action dispatched by the middleware after receiving new account datas.
 * It is used to set the state.currencyRatesLoaded watcher
 */
export const SET_CURRENCY_RATES_LOADED_ACTION =
  "SET_CURRENCY_RATES_LOADED_ACTION";
interface SetCurrencyRatesLoadedAction {
  type: "SET_CURRENCY_RATES_LOADED_ACTION";
  currencyRatesLoaded: boolean;
}

export const useActions = (state: AppState, dispatch: Function) => {
  return {
    setSelectedCountry: (code: string) => {
      dispatch(setSelectedCountry(code));
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
  | SetCurrencyRateAction
  | SetCurrencyRatesLoadedAction;
