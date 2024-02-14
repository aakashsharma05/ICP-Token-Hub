import React,{useState} from "react";
import {Principal} from "@dfinity/principal";
import {token} from "../../../declarations/token";

function Balance() {

  const [principal, setPrincipal] = useState("");
  const [balRes, setbalRes] = useState("");
  const [isHidden, setHidden] = useState(true);
  
  async function handleClick() {
    // console.log("Balance Button Clicked");
    const bal = await token.balanceOf(Principal.fromText(principal));
    setbalRes(bal.toLocaleString()+" " + await token.getSymbol());
    setHidden(false);
  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={principal}
          onChange={(e)=>{setPrincipal(e.target.value)}}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p hidden = {isHidden}>This account has a balance of {balRes}.</p>
    </div>
  );
}

export default Balance;
