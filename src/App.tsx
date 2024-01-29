import { useEffect, useState } from "react";
import "./App.css";
import Keypad from "./components/keypad";

function App() {
  const [result, setResult] = useState("");

  const handleKeyPress = (event) => {
    const key = event.key;

    if (key === "Enter") {
      calculate();
    } else if (key === "Backspace") {
      backspace();
    } else if (key === "Escape") {
      reset();
    } else if (
      (key >= "0" && key <= "9") ||
      ["+", "-", "*", "/", "(", ")", "."].includes(key)
    ) {
      setResult(result + key);
    } else {
      // If key doesn't match any button, don't do anything
      return;
    }
  };

  // Add and remove the event listener
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [result]);

  const onClick = (button: string) => {
    if (button === "=") {
      calculate();
    } else if (button === "C") {
      reset();
    } else if (button === "CE") {
      backspace();
    } else {
      setResult(result + button);
    }
  };
  const calculate = () => {
    const checkResult = result.includes("--")
      ? result.replace("--", "+")
      : result;
    try {
      setResult((eval(checkResult) || "") + "");
    } catch (e) {
      setResult("error");
    }
  };

  const reset = () => {
    setResult("");
  };

  const backspace = () => {
    setResult(result.slice(0, -1));
  };

  return (
    <div className=" h-[100vh]  flex flex-col justify-center md:flex md:justify-center md:items-center p-5   md:m-16 ">
      <div className=" md:shadow-xl p-4  flex flex-col items-center  rounded-xl">
        <div className="bg-green-100 md:min-h-[70px] min-h-[110px] max-w-[350px] w-full  p-4 rounded-lg mb-4   ">
          <h1 className="text-right text-3xl font-medium text-black break-words  ">
            {result || "0"}
          </h1>
        </div>
        <Keypad onClick={onClick} />
      </div>
    </div>
  );
}

export default App;
