import ReactDOM from 'react-dom'
import React from 'react'
import App from "./components/App";
import { AuthClient } from '@dfinity/auth-client';

const init = async () => { 

  const authClient = await AuthClient.create();  

  if(await authClient.isAuthenticated()){
    handledAuthenticated(authClient);
  }
  else{    
    await authClient.login({
      indentityProvider : "https://identity.ic0.app/#authorize",
      onSuccess : ()=>{
        handledAuthenticated(authClient);
      }
    })
  }
  
}

async function handledAuthenticated(authClient){
  ReactDOM.render(<App />, document.getElementById("root"));
}

init();


