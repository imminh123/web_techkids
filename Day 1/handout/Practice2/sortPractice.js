'use strict'

function sort(input) {
  // return input.sort((a,b) => a-b); // Remove this line and change to your own algorithm
  var temp;
  for(var i = 0; i< input.length;i++){
    for(var j=0; j< input.length-1-i;j++){
      if(input[j] > input[j+1]){
        temp = input[j];
        input[j] = input[j+1];
        input[j+1] = temp;
      }
    }
  }
  return input;
}

module.exports = sort
