import useLoaderContext from "@/context/UseLoaderContext";
import { ReactNode, useEffect, useState } from "react";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import API from "@/libs/api";

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
    const reqInterceptorEject = API.apiInstance.interceptors.request.use(
      reqInterceptor,
      reqErrInterceptor
    );
    const resInterceptorEject = API.apiInstance.interceptors.response.use(
      resInterceptor,
      resErrInterceptor
    );
    setIsLoaded(true);
    return () => {
      API.apiInstance.interceptors.request.eject(reqInterceptorEject);
      API.apiInstance.interceptors.response.eject(resInterceptorEject);
    };
  }, []);
  return isLoaded ? children : null;
};
export default AxiosInterceptor;
