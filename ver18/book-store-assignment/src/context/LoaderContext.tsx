import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface AppContextInterface {
  loader: boolean;
  setLoader: Dispatch<SetStateAction<boolean>>;
}

const loaderContextDefaultValue: AppContextInterface = {
  loader: false,
  setLoader: () => false,
};

const LoaderContext = createContext<AppContextInterface>(
  loaderContextDefaultValue
);

type LoaderContextProviderProps = {
  children: ReactNode;
};

const LoaderContextProvider = ({ children }: LoaderContextProviderProps) => {
  const [loader, setLoader] = useState<boolean>(false);
  const value = { loader, setLoader };
  return (
    <LoaderContext.Provider value={value}>{children}</LoaderContext.Provider>
  );
};

export { LoaderContext, LoaderContextProvider };
