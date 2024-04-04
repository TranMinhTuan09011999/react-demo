import useLoaderContext from "@/context/UseLoaderContext";
import { ReactNode, useEffect, useState } from "react";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

type AxiosInterceptorProps = {
  children: ReactNode;
};

const AxiosInterceptor = ({ children }: AxiosInterceptorProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { setLoader } = useLoaderContext();

  const reqInterceptor = (config: AxiosRequestConfig) => {
    setLoader(true);
    return config;
  };

  const resInterceptor = (response: AxiosResponse) => {
    setLoader(false);
    return response.data;
  };

  const reqErrInterceptor = (error: AxiosError) => {
    setLoader(false);
    return Promise.reject(error.config);
  };

  const resErrInterceptor = (error: AxiosError) => {
    setLoader(false);
    return Promise.reject(error?.response?.data);
  };

  useEffect(() => {
    const reqInterceptorEject = axios.interceptors.request.use(
      reqInterceptor,
      reqErrInterceptor
    );
    const resInterceptorEject = axios.interceptors.response.use(
      resInterceptor,
      resErrInterceptor
    );
    setIsLoaded(true);
    return () => {
      axios.interceptors.request.eject(reqInterceptorEject);
      axios.interceptors.response.eject(resInterceptorEject);
    };
  }, []);
  return isLoaded ? children : null;
};
export default AxiosInterceptor;
