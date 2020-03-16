import React, { useReducer, createContext } from "react";
import { applyMiddleware } from "./appMiddleware";
import { useActions } from "./appActions";
import { appReducer, initialState, AppState, Account } from "./appReducer";

type ContextType = {
  state: AppState;
  actions: ReturnType<typeof useActions>;
};

const initialContext: ContextType = {
  state: { ...initialState },
  actions: {
    setSelectedCountry: (code: string) => code,
    setAccountData: (accounts: Array<Account>) => accounts,
    getAccountData: () => {}
  }
};
export const AppContext = createContext<ContextType>(initialContext);

const AppProvider: React.FC<any> = props => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  // Attach middleware to capture every dispatch
  const enhancedDispatch = applyMiddleware(dispatch);
  const actions = useActions(state, enhancedDispatch);
  const contextValue = {
    state: { ...state },
    actions: { ...actions }
  };
  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
