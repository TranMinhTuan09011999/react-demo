/* eslint-disable react-refresh/only-export-components */
import loadable from "@loadable/component";

const Home = loadable(() => import("@/views/home/Home"), {
  fallback: <h1>Loading</h1>,
});

const appRoute = () => {
  return [
    {
      path: "/",
      element: <Home />,
    },
  ];
};

export default appRoute;
