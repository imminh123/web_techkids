// cach 2 : better
// const getQuestionArea = document.getElementById('questionArea');

function onLoad(){
    console.log('ola');
    
}


// maxLength = 200;
// getQuestionArea.addEventListener('input', function(){ 
//     var countfield = maxLength - getQuestionArea.value.length;
//     document.getElementById('counter').innerHTML = countfield;
// })


maxLength = 200;
$("#questionArea").on("input", function(){
    var countfield = maxLength - $("#questionArea").val().length;
    $("#counter").text(countfield);
})