import { useEffect, useState, useRef } from "react";

const EffectsDemoTwoStatesWithEmptyDependencyArray = () => {
  const [title, setTitle] = useState<string>("default title");
  const titleRef = useRef<HTMLInputElement>(null);

  // useEffect without second argument ---> The effect is executed after every render
  useEffect(() => {
    console.log("useEffect title");
    document.title = title;
  });

  // useEffect with empty array in second argument ---> The effect is only executed once after the first render
  useEffect(() => {
    console.log("useEffect local storage");
    const persistedTitle = localStorage.getItem("title");
    setTitle(persistedTitle !== null ? persistedTitle : "null");
  }, []);
  console.log("render");
  const handleClick = () => {
    if (titleRef.current !== null) {
      // Kiểm tra titleRef.current không phải null trước khi truy cập
      setTitle(titleRef.current.value);
    }
  };
  return (
    <div>
      <input ref={titleRef} />
      <button onClick={handleClick}>change title</button>
    </div>
  );
};
export default EffectsDemoTwoStatesWithEmptyDependencyArray;

// https://blog.logrocket.com/useeffect-react-hook-complete-guide/
