// const getQuestionArea = document.getElementById('questionArea');

// function onLoad(){
//     console.log('ola');
    
// }

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



// axios.get('http://localhost:3600/randomquestion')
// .then(function (response){
//     document.getElementById("questionContent").innerText = response.data.questionContent;
// })
// .catch(function (error){
//     console.log(error);
// });

getRandomQuestion();

function getRandomQuestion(){
    $.ajax({
        url: "http://localhost:3600/randomquestion",
        type: "GET",
        success: function(response){
            $("#questionContent").text(response.questionContent);
            $(".answer_btn").data("questionId", response._id);
            $("#yes_btn").data("yes", response.yes);
            $("#no_btn").data("no", response.no);
            console.log(response);
            //cach 2
            $("#viewDetail").attr("href", "/question/"+ response._id);
        },
        error: function(error){
            console.log(error);
        }
    });
};

$("#otherQuestion").on("click", function(){
    getRandomQuestion();
});

$(".answer_btn").on("click", function(){
    console.log($(this).data());
    var questionId = $(this).data().questionId;
    $.ajax({
        url: "http://localhost:3600/answer",
        type: "POST",
        data: $(this).data(),
        success: function(response){
            if(response.success){
                window.location.href = "/question/"+ questionId;
    
            }
                
        },
        error: function(error){
            console.log('Send fail');
        }
    })
});

// $("#seeResult").on("click", function(){
//     window.location.href = "/question?id=" + $(".answer_btn").data().questionId;
// });
