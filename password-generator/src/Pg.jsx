import { useRef } from "react";
import { useCallback, useEffect, useState } from "react";

function Pg() {
  let [length, setlength] = useState(8);
  let [addnumber, setaddnumber] = useState(false);
  let [addchar, setaddchar] = useState(false);
  let [password, setpassword] = useState("");

  let passgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (addnumber) str += "0123456789";
    if (addchar) str += "@#$%^&*()";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [length, addnumber, addchar]);

  useEffect(() => {
    passgenerator();
  }, [length, addchar, addnumber, passgenerator]);

    let refrence = useRef(null);
    
    const copytoclipboard = useCallback(() => {
        window.navigator.clipboard.writeText(password)
        refrence.current?.select();
        refrence.current?.setSelectionRange(0,100)
    },[password])

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-yellow-500 ">
      <h1 className="text-white text-center my-3">PASSWORD GENERATOR</h1>
      <div className=" flex shadow rounded-lg overflow-hidden mb-4">
        <input
          className="outline-none w-full py-1 px-3"
          type="text"
          ref={refrence}
          value={password}
          readOnly
        />
        <button
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          onClick={copytoclipboard}
        >
          copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={5}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={e => {
              setlength(e.target.value);
            }}
          />
          <label>Length:{length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            className="cursor-pointer"
            defaultChecked={addnumber}
            onChange={() => {
              setaddnumber(prev => !prev);
            }}
          />
          <label>Numbers</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            className="cursor-pointer"
            defaultChecked={addchar}
            onChange={() => {
              setaddchar(prev => !prev);
            }}
          />
          <label>charecters</label>
        </div>
      </div>
    </div>
  );
}
export default Pg;
