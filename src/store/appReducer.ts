import {
  AppAction,
  SET_SELECTED_COUNTRY_ACTION,
  SET_ACCOUNT_DATA_ACTION,
  SET_CURRENCY_RATE_ACTION
} from "./appActions";

export interface AppState {
  selectedCountryCode: string;
  accounts: Array<Account>;
  cors_proxy_url: string;
  currencyRates: { [currency: string]: number };
}

export interface Account {
  id: string;
  currency: string;
  tag: string;
  accountNumber: string;
  correspondentBank: string | null;
  amount: string;
  holderBank: HolderBank;
  holder: Holder;
}

interface HolderBank {
  bic: string;
  clearingCodeType: string;
  clearingCode: string;
  name: string;
  address: Address;
}

interface Address {
  street: string;
  postCode: string;
  city: string;
  state: string | null;
  country: string;
}

interface Holder {
  name: string;
  type: string;
  address: Address;
}

export const initialState: AppState = {
  selectedCountryCode: "",
  accounts: [],
  cors_proxy_url: "https://cors-anywhere.herokuapp.com/",
  currencyRates: {}
};

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case SET_SELECTED_COUNTRY_ACTION:
      return {
        ...state,
        selectedCountryCode: action.code
      };

    case SET_ACCOUNT_DATA_ACTION: {
      return {
        ...state,
        accounts: action.accounts
      };
    }

    case SET_CURRENCY_RATE_ACTION: {
      return {
        ...state,
        currencyRates: {
          ...state.currencyRates,
          [action.currency]: 1/action.rate
        }
      };
    }

    default:
      return state;
  }
}