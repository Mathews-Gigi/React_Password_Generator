import react, { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowd, setNumberAllowd] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //ref variable

  const passwordRef = useRef(null);

  const passwordGenrator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowd) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_=-{}[]:';'.,/|";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowd, charAllowed, setPassword]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);
  useEffect(() => {
    passwordGenrator();
  }, [length, numberAllowd, charAllowed, passwordGenrator]);

  return (
    <>
      <div>
        <h1 className="textHeading">Password Genrator</h1>
        <div className="mainPannel">
          <div className="container">
            <input
              type="text"
              className="inputFeild"
              placeholder="Password"
              readOnly
              value={password}
              ref={passwordRef}
            />

            <button className="ButtonCopy" onClick={copyPassword}>
              copy
            </button>
          </div>
          <div className="controlPannel">
            <input
              className="PassowrdRange"
              type="range"
              min={8}
              max={30}
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length : {length}</label>

            <input
              type="checkbox"
              defaultChecked={numberAllowd}
              id="numberInput"
              onChange={() => {
                setNumberAllowd((prev) => !prev);
              }}
            />
            <label>Numbers</label>

            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label>Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
