import { useEffect, useState, useRef } from "react";

const EffectsDemoTwoStatesWithDependency = () => {
  const [title, setTitle] = useState("default title");
  const titleRef = useRef<HTMLInputElement>(null);
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    console.log("useEffect");
    document.title = title;
  }, [title]);
  console.log("render");
  const handleClick = () => {
    if (titleRef.current !== null) {
      // Kiểm tra titleRef.current không phải null trước khi truy cập
      setTitle(titleRef.current.value);
    }
  };
  const handleCheckboxChange = () => setDarkMode((prev) => !prev);
  return (
    <div className={darkMode ? "view dark-mode" : "view"}>
      <label htmlFor="darkMode">dark mode</label>
      <input
        name="darkMode"
        type="checkbox"
        checked={darkMode}
        onChange={handleCheckboxChange}
      />
      <input ref={titleRef} />
      <button onClick={handleClick}>change title</button>
    </div>
  );
};

export default EffectsDemoTwoStatesWithDependency;

// https://blog.logrocket.com/useeffect-react-hook-complete-guide/
// Test result:
// When component is loaded ---> console.log("render") ---> console.log("useEffect");
// When click on handleClick ---> state title will change ---> console.log("render") ---> console.log("useEffect");
// When click checkbox ---> console.log("render") ---> no console.log("useEffect");
