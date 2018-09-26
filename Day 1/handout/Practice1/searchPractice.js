'use strict'


function binarySearch(array, first,last,target){
      
  if(last >= first){
    var mid = (first+last)/2;
    if(array[mid] == target){
      return mid;
    }else if(array[mid] < target){
      binarySearch(array,mid+1,last,target);
    }else{
      binarySearch(array,first,mid-1,target);
    }
  }
  return -1;
}


function search(input, target) {
  // return  input.indexOf(target);  // Remove this line and change to your own algorithm
  for(var i = 0;i<input.length;i++){
    if(input[i] == target){
      return i;
    }
  }
  return -1;
  // binarySearch(input, 0 , input.length-1, target); //binary search is so fuc***g stupid
  
}

module.exports = search
