import useLoaderContext from "@/context/UseLoaderContext";

const Loader = () => {
  const { loader } = useLoaderContext();
  return (
    <>
      {loader && (
        <div
          className="w-full h-full fixed top-0 left-0 bottom-0 right-0 z-30 bg-black/40"
          id="full-backdrop"
        >
          <div
            id="loading-full"
            className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex flex-col justify-center items-center z-40 text-primary !fixed"
          >
            <div
              data-twe-loading-icon-ref
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            ></div>
            <span data-twe-loading-text-ref>Loading...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Loader;
