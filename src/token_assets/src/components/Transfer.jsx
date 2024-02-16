import React, { useState } from "react";
import {Principal} from "@dfinity/principal";
import { createActor, canisterId} from "../../../declarations/token";
import { AuthClient } from '@dfinity/auth-client';

function Transfer() {

  const [receiverId,setId] = useState("");
  const [amount,setAmount] = useState("");
  const [isHidden,setHidden] = useState(true);
  const [isdisabled,setDisabled] = useState(false);
  const [feedback,setFeedback] = useState("");
  
  async function handleClick() {

    setDisabled(true);
    setHidden(true);

    const authClient =await  AuthClient.create();
    const identity = await authClient.getIdentity();
    const authenticatedCanister = createActor(canisterId,{
      agentOptions:{
        identity,
      },
    });
    
    const result = await authenticatedCanister.transfer(Principal.fromText(receiverId), parseInt(amount));
    setFeedback(result);    

    setDisabled(false);
    setHidden(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={receiverId}
                onChange={(evt)=>setId(evt.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                min = {0}
                onChange={(evt)=>setAmount(evt.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled = {isdisabled} >
            Transfer
          </button>
          <p hidden = {isHidden}>{feedback}</p>
        </p>
      </div>
    </div>
  );
}

export default Transfer;
