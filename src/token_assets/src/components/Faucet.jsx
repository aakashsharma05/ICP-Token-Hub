import React,{useState} from "react";
import { createActor, canisterId} from "../../../declarations/token";
import { AuthClient } from '@dfinity/auth-client';

function Faucet(props) {
  const [btnText, setbtnText] = useState("Gimme Gimme");
  const [isdisabled, setdisabled] = useState(false)
  const [userId, setUserId] = useState("")

  async function handleClick(event) {
    setdisabled(true);

    const authClient = await AuthClient.create();
    const identity = await  authClient.getIdentity();
    const authenCanister = await createActor(canisterId,{
      agentOptions: {
        identity,
      },
    });

    const text = await authenCanister.payOut();
    setbtnText(text);
    
  }
  async function getPrinci(){
    const authClient = await AuthClient.create();
    const identity = await  authClient.getIdentity();
    const principal = identity.getPrincipal().toString();
    setUserId(principal);
  }
  getPrinci()

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free DAngela tokens here! Claim 10,000 DANG coins to your account.</label>
      <details>
        <summary>Your Identity</summary>
        <label>{userId}</label>
      </details>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled = {isdisabled}>
          {btnText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
