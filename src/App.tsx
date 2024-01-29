import { useEffect, useState } from "react";
import "./App.css";
import Keypad from "./components/keypad";

function App() {
  const [result, setResult] = useState("");

  //keyboard logic
  const handleKeyPress = (event: KeyboardEvent) => {
    const key = event.key;
    //if result have error
    if (result.includes("error") || result.includes("Infinity")) {
      if (key === "Backspace") {
        reset(); // Call reset function if key is Backspace
      } else if (key === "Escape") {
        reset(); // Call reset function if key is Escape
      }
      return; // Exit the function after handling Backspace or Escape
    }
    const operators = ["+", "-", "*", "/"];
    const lastChar = result.charAt(result.length - 1);

    if (operators.includes(key)) {
      if (operators.includes(lastChar)) {
        if (!(lastChar === "-" && key === "-")) {
          // Replace the last operator with the new one, unless it's '--'
          setResult(result.slice(0, -1) + key);
        }
      } else {
        setResult(result + key);
      }
    } else if (key === "Enter") {
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

  // Add and remove the event listener for keyboard event
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [result]);

  //onclick logic

  const onClick = (button: string) => {
    //if result have error
    if (result.includes("error") || result.includes("Infinity")) {
      if (button === "CE") {
        reset(); // Call reset function if key is Backspace
      } else if (button === "C") {
        reset(); // Call reset function if key is Escape
      }
      return; // Exit the function after handling Backspace or Escape
    }
    const operators = ["+", "-", "*", "/"];
    const lastChar = result.charAt(result.length - 1);

    if (operators.includes(button)) {
      if (operators.includes(lastChar)) {
        if (!(lastChar === "-" && button === "-")) {
          // Replace the last operator with the new one, unless it's '--'
          setResult(result.slice(0, -1) + button);
        }
      } else {
        setResult(result + button);
      }
    } else if (button === "=") {
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

  //c
  const reset = () => {
    setResult("");
  };

  //ce
  const backspace = () => {
    setResult(result.slice(0, -1));
  };

  return (
    <div className=" h-[100vh] md:h-[80vh]  flex flex-col justify-center md:flex md:justify-start md:items-center p-5   md:m-16 ">
      <div className=" md:shadow-xl bg-white p-4  flex flex-col items-center  rounded-xl">
        <div className="bg-green-100 md:min-h-[70px] min-h-[110px] max-w-[350px] w-full  p-4 rounded-lg mb-4   ">
          <h1 className="text-right text-3xl font-bold text-black break-words  ">
            {result || "0"}
          </h1>
        </div>

        <Keypad onClick={onClick} />
      </div>
    </div>
  );
}

export default App;
