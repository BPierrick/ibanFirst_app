import React, { useReducer, createContext } from "react";
import { applyMiddleware } from "./appMiddleware";
import { useActions } from "./appActions";
import { appReducer, initialState, AppState } from "./appReducer";
import StylesProvider from "@material-ui/styles/StylesProvider";

export type AppProviderContextType = {
  state: AppState;
  actions: ReturnType<typeof useActions>;
};

const initialContext: AppProviderContextType = {
  state: { ...initialState },
  actions: {
    setSelectedCountry: (code: string) => code,
    getAccountData: () => {}
  }
};

export const AppContext = createContext<AppProviderContextType>(initialContext);

interface AppProviderProps {
  children: JSX.Element;
}

/**
 * Provides the app with a context and the @material-ui StylesProvider
 * @param props
 */
const AppProvider: React.FC<AppProviderProps> = props => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Attach middleware to capture every dispatched actions
  const enhancedDispatch = applyMiddleware(dispatch);

  const actions = useActions(state, enhancedDispatch);
  const contextValue = {
    state: { ...state },
    actions: { ...actions }
  };
  return (
    <AppContext.Provider value={contextValue}>
      <StylesProvider injectFirst>{props.children}</StylesProvider>
    </AppContext.Provider>
  );
};

export default AppProvider;
