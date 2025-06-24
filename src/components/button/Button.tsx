import { useState } from "react";

const Button = ({globalCount, setGlobalCount }: { globalCount: number,setGlobalCount: React.Dispatch<React.SetStateAction<number>> }) => {
  const [count, setCount] = useState<number>(0);
  return (
    <button
      onClick={() => {
        setCount((count) => count + 1);
        setGlobalCount(()=>globalCount + 1);
      }}
    >
      count is {count}
    </button>
  );
};
export default Button;
