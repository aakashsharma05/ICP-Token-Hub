import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor Token{

    Debug.print("hello");
    var owner : Principal = Principal.fromText("52ten-jmxb2-fhi4t-w4znc-tckux-d5c2c-gacv5-teoum-on64e-w2gxc-gae");
    var totalSupply:Nat = 1000000000;
    var symbol : Text = "DANG";

    private var balances = HashMap.HashMap<Principal,Nat>(1,Principal.equal,Principal.hash);
    private stable var balanceEntries :[(Principal, Nat)] = [];
    if(balances.size() < 1){
        balances.put(owner,totalSupply);
    };
    public query func balanceOf(who:Principal) : async Nat{
        var balance = switch(balances.get(who)) {
            case(null) {0};
            case(?result) {result};
        };
        return balance;
    };
    public query func getSymbol() : async Text{
        return symbol;
    };
    public shared(msg)  func payOut() : async Text{
        Debug.print(debug_show(msg.caller));
        
        if(balances.get(msg.caller) == null){
            let amount = 10000;
            balances.put(msg.caller,amount);
            let result = await transfer(msg.caller,amount);
            return result;
        }
        else{
            return "Already claimed.";
        }
    };

    public shared(msg) func transfer(receiver:Principal, amount:Nat): async Text{
        let bal:Nat = await balanceOf(msg.caller);
        Debug.print("I was called.");
        if(bal >= amount){
            let newBal :Nat = bal-amount;
            balances.put(msg.caller,newBal);
            let newRecBal :Nat = (await balanceOf(receiver)) + amount;
            balances.put(receiver,newRecBal);
            balances.put(receiver,newRecBal);
            return "Success";
        }
        else{
            return "Insufficent Balance";
        }    
        
    };

    system func preupgrade(){
        balanceEntries := Iter.toArray(balances.entries());
    };
    system func postupgrade(){
        balances := HashMap.fromIter<Principal,Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
        if(balances.size() < 1){
            balances.put(owner,totalSupply);
        };
    }


}