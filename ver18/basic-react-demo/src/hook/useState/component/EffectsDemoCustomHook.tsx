import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const useFetch = (url: string, initialValue: User[]) => {
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url);
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);
  return { loading, data };
};
const EffectsDemoCustomHook = () => {
  const { loading, data } = useFetch(
    "https://jsonplaceholder.typicode.com/posts/",
    []
  );
  console.log({ loading, data });
  return (
    <div className="App">
      {loading && <div className="loader" />}
      {data.length > 0 && data.map((blog) => <p key={blog.id}>{blog.title}</p>)}
    </div>
  );
};

export default EffectsDemoCustomHook;
