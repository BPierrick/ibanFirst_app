import {
  AppAction,
  SET_CURRENCY_RATE_ACTION,
  SET_ACCOUNT_DATA_ACTION,
  GET_ACCOUNT_DATA_ACTION,
  SET_CURRENCY_RATES_LOADED_ACTION
} from "./appActions";
import { Account } from "./appReducer";

export const applyMiddleware = (dispatch: Function) => async (
  action: AppAction
) => {
  switch (action.type) {
    case GET_ACCOUNT_DATA_ACTION:
      let currencyRatesLoaded = true;
      const proxyUrl = "https://cors-anywhere.herokuapp.com/";
      const targetUrl =
        "https://platform.ibanfirst.com/js/dataTestDevFront.json";

      fetch(proxyUrl + targetUrl)
        .then(async data => {
          const dataObj: { accounts: Array<Account> } = await data.json();
          dispatch({
            type: SET_ACCOUNT_DATA_ACTION,
            accounts: dataObj.accounts
          });

          //We get the account currency rates
          dataObj.accounts.forEach(account => {
            const EUR_CURRENCY = "EUR";

            if (account.currency === EUR_CURRENCY) {
              dispatch({
                type: SET_CURRENCY_RATE_ACTION,
                currency: account.currency,
                rate: 1
              });
            } else {
              const targetUrl = `https://api.ibanfirst.com/PublicAPI/Rate/${EUR_CURRENCY}${account.currency}/`;

              fetch(proxyUrl + targetUrl)
                .then(async response => {
                  const responseObj = await response.json();
                  if (responseObj.errorMessage) {
                    console.error(responseObj.errorMessage);
                    dispatch({
                      type: SET_CURRENCY_RATE_ACTION,
                      currency: account.currency,
                      rate: 1
                    });
                  }
                  if (responseObj.rate !== undefined) {
                    dispatch({
                      type: SET_CURRENCY_RATE_ACTION,
                      currency: account.currency,
                      rate: parseFloat(responseObj.rate.rate)
                    });
                  }
                })
                .catch(error => {
                  console.error(error);
                  currencyRatesLoaded = false;
                });
            }
          });
        })
        .catch(error => {
          console.error(error);
          currencyRatesLoaded = false;
        })
        .finally(() => {
          console.log(
            "GET DATA PROMISE TERMINATED WITH currencyRatesLoaded: ",
            currencyRatesLoaded
          );
          dispatch({
            type: SET_CURRENCY_RATES_LOADED_ACTION,
            currencyRatesLoaded
          });
        });
      break;

    default:
      dispatch(action);
  }
};
