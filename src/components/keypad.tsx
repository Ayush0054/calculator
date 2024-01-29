function Keypad({ onClick }: { onClick: (button: string) => void }) {
  const buttons = [
    "(",
    "CE",
    ")",
    "C",
    "1",
    "2",
    "3",
    "+",
    "4",
    "5",
    "6",
    "-",
    "7",
    "8",
    "9",
    "*",
    ".",
    "0",
    "=",
    "/",
  ];

  return (
    <div className=" md:max-h-[500px]   grid grid-cols-4 md:gap-4 gap-2 bg-slate-50 md:mt-0 mt-10  md:m-4">
      {buttons.map((button) => (
        <button
          key={button}
          className=" focus:outline-none font-semibold  bg-white shadow-lg hover:drop-shadow-lg hover:bg-green-50 rounded-md md:rounded-lg text-4xl p-4 text-black"
          value={button}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            onClick(e.currentTarget.value)
          }
        >
          {button}
        </button>
      ))}
    </div>
  );
}

export default Keypad;
