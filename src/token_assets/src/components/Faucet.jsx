import React,{useState} from "react";
import {token} from "../../../declarations/token";

function Faucet() {
  const [btnText, setbtnText] = useState("Gimme Gimme");
  const [isdisabled, setdisabled] = useState(false)
  async function handleClick(event) {
    setdisabled(true);
    const text = await token.payOut();
    setbtnText(text);
    
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free DAngela tokens here! Claim 10,000 DANG coins to your account.</label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled = {isdisabled}>
          {btnText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
