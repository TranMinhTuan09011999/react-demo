import { useContext } from "react";
import { LoaderContext } from "./LoaderContext";

const useLoaderContext = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error(
      "useLoaderContext must be used within a LoaderContextProvider"
    );
  }
  return context;
};

export default useLoaderContext;
