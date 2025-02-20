import { useCallback, useState,useEffect } from "react";

function App() {
  const [length, Updlength] = useState(8);
  const [isnumberallowed, setIsnumberallowed] = useState(false);
  const [isspecialcharallowed, setIsspecialcharallowed] = useState(false);
  const [isspaceallowed, setIsspaceallowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copy, setCopy] = useState("COPY")
  
  const copyHandler = () => {
    navigator.clipboard.writeText(password);
    setCopy("COPIED");
    setTimeout(() => {
      setCopy("COPY");
    }, 1000);
  }



  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let num = "0123456789";
    let sym = "!@#$%^&*()_+";
    let spc = " ";
    str += string;

    if (isnumberallowed) {
      str += num;
    }
    if (isspaceallowed) {
      str += spc;
    }
    if (isspecialcharallowed) {
      str += sym;
    }

    for (let i = 0; i < length; i++) {
      let indx = Math.floor(Math.random() * str.length);
      pass += str.charAt(indx);
    }
    setPassword(pass);

  }, [length, isnumberallowed, isspaceallowed, isspecialcharallowed])
  
  useEffect(() => {
    generatePassword();
  }
  , [length, isnumberallowed, isspaceallowed, isspaceallowed, generatePassword])



  return (
    <div className="max-w-xl my-10 mx-auto bg-gray-500 px-15 py-10 rounded-md shadow-md">
      <h1 className="text-center text-white my-2 font-extrabold text-3xl font-serif w-full">PASSWORD GENERATOR</h1>

      <div className="mx-auto w-full my-6 mb-10 grid grid-cols-12 shadow overflow-hidden rounded-lg ">
        <input
          className="bg-gray-200 px-3 col-span-10 outline-none font-bold py-1 mx-0"
          readOnly
          value={password}
          placeholder="pASswOrD"
          type="text"
        />{" "}
        <button
          onClick={copyHandler}
          className="   
        bg-blue-700 text-black col-span-2 font-bold  rounded-md  active:text-white hover:bg-blue-500
        mx-0 px-3 py-1 shrink-0"
        >
          {copy}
        </button>
      </div>

      <div className="grid grid-cols-2 m-6 mx-auto  w-full gap-6 text-sm">
        <div className="w-full gap-2 flex items-center ">
          <input
            className="cursor-pointer   range-slider"
            onChange={(e) => Updlength(e.target.value)}
            type="range"
            name="range"
            id="range"
            min={6}
            max={30}
            value={length}
          />
          <label htmlFor="range" className="text-black font-semibold">
            Length : {length}
          </label>
        </div>

        <div className="w-full gap-2 flex">
          <input
            className="cursor-pointer "
            onChange={(e) =>
              setIsnumberallowed(e.target.checked ? true : !true)
            }
            type="checkbox"
            defaultChecked={isnumberallowed}
            name="checkboxsp"
            id="checkboxsp"
          />
          <label htmlFor="checkboxsp" className="text-black font-semibold">
            Numbers {isnumberallowed ? "Allowed" : "Not Allowed"}
          </label>
        </div>

        <div className="w-full gap-2 flex">
          <input
            className="cursor-pointer "
            onChange={(e) =>
              setIsspecialcharallowed(e.target.checked ? true : !true)
            }
            type="checkbox"
            defaultChecked={isspecialcharallowed}
            name="checkboxch"
            id="checkboxch"
          />
          <label htmlFor="checkboxch" className="text-black font-semibold">
            Symbols {isspecialcharallowed ? "Allowed" : "Not Allowed"}
          </label>
        </div>

        <div className="w-full gap-2 flex">
          <input
            className="cursor-pointer "
            onChange={(e) => setIsspaceallowed(e.target.checked ? true : !true)}
            type="checkbox"
            defaultChecked={isspaceallowed}
            name="checkboxspc"
            id="checkboxspc"
          />
          <label htmlFor="checkboxspc" className="text-black font-semibold">
            Space {isspaceallowed ? "Allowed" : "Not Allowed"}
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
