import { ConfigProvider } from "antd";
import enUS from "antd/es/locale/en_US";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import i18n from "./i18n/i18n";
import LayoutWrapper from "./layouts/LayoutWrapper";
import Navbar from "./views/navbar/Navbar";
import Footer from "./views/footer/Footer";
import { LoaderContextProvider } from "./context/LoaderContext";
import AxiosInterceptor from "./interceptor/AxiosInterceptor";
import Loader from "./views/loader/Loader";

const App = () => {
  const [antdLocale, setAntdLocale] = useState(enUS);

  useEffect(() => {
    setAntdLocale(i18n.language === "en" ? enUS : enUS);
  }, []);

  return (
    <div id="app">
      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
        <ConfigProvider locale={antdLocale}>
          <LayoutWrapper>
            <LoaderContextProvider>
              <AxiosInterceptor>
                <Loader />
                <Navbar />
                <Outlet />
                <Footer />
              </AxiosInterceptor>
            </LoaderContextProvider>
          </LayoutWrapper>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default App;
