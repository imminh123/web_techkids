const getQuestionArea = document.getElementById('questionArea');

function onLoad(){
    console.log('ola');
    
}

// function textCounter(field,counter,maxlimit)
// {
//  var countfield = document.getElementById(counter);
//  if ( field.value.length > maxlimit ) {
//   field.value = field.value.substring( 0, maxlimit );
//   return false;
//  } else {
//   countfield.innerHTML = maxlimit - field.value.length;
//  }
// }

//cach 2 : better
maxLength = 200;
getQuestionArea.addEventListener('input', function(){ 
    var countfield = maxLength - getQuestionArea.value.length;
    document.getElementById('counter').innerHTML = countfield;
})

