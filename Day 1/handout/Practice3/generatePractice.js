'use strict'

function generate(testLengthArray){
  // return Array.from({length : testLengthArray.length})
  //   .map(item => ({
  //     input: Array.from({length: item}).map(item => []),
  //     target: 0,
  //     output: -1
  //   })
  // ); // Remove this line and change to your own algorithm
  var data;
  testLengthArray.array.forEach(element => {
    var array  = [1,2,3,4];
    for(var i=0; i<element;i++){
      array.push((Math.random() * 20000) - 10000);
    }
    array.sort();
    var target = array[Math.random() * 10000];
    var expect = array.indexOf(target);
    var object = {
      "input": array,
      "target": target,
      "output": expect
    }

    data.push(object);
  });
  return data;
}

module.exports = generate
