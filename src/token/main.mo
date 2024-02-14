import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";


actor Token{

    var owner : Principal = Principal.fromText("52ten-jmxb2-fhi4t-w4znc-tckux-d5c2c-gacv5-teoum-on64e-w2gxc-gae");
    var totalSupply:Nat = 1000000000;

    var balances = HashMap.HashMap<Principal,Nat>(1,Principal.equal,Principal.hash);
    balances.put(owner,totalSupply);

    public query func balanceOf(who:Principal) : async Nat{
        var balance = switch(balances.get(who)) {
            case(null) {0};
            case(?result) {result};
        };
        return balance;
    }


}