import {
  AppAction,
  SET_CURRENCY_RATE_ACTION,
  SET_ACCOUNT_DATA_ACTION,
  GET_ACCOUNT_DATA_ACTION
} from "./appActions";
import { Account } from "./appReducer";

export const applyMiddleware = (dispatch: Function) => async (
  action: AppAction
) => {
  switch (action.type) {
    case GET_ACCOUNT_DATA_ACTION:
      const proxyUrl = "https://cors-anywhere.herokuapp.com/";
      const targetUrl =
        "https://platform.ibanfirst.com/js/dataTestDevFront.json";

      fetch(proxyUrl + targetUrl).then(data => {
        data.json().then((dataObj: { accounts: Array<Account> }) => {
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
              return;
            }

            const targetUrl = `https://api.ibanfirst.com/PublicAPI/Rate/${EUR_CURRENCY}${account.currency}/`;

            fetch(proxyUrl + targetUrl)
              .then(response => {
                response.json().then(responseObj => {
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
                });
              })
              .catch(console.error);
          });
        });
      });
      break;

    default:
      dispatch(action);
  }
};
