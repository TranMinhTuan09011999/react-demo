import loadable from "@loadable/component";

const Home = loadable(() => import("@/views/Home/Home"), {
  fallback: <h1>Loading</h1>,
});

const appRoute = () => {
  return [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/book",
      element: <Home />,
    },
  ];
};

export default appRoute;
