const url_origin = window.location.href;
const url = new URL(url_origin);
const id = url.searchParams.get("id");
console.log(id);

$.ajax({
    url: "http://localhost:3600/question/"+id,
    type: "GET",
    success: function(response){
        console.log(response);
        
        var yesCount = response.yes;
        var noCount = response.no;
        var yesRate = Math.floor((yesCount/(yesCount+noCount)) * 100);
        var noRate = Math.ceil((noCount/(yesCount+noCount)) * 100);

        $("#questionContent").text(response.questionContent);
        $("#yes").text(yesRate + "%");
        $("#no").text(noRate + "%");
    },
    error: function(error){
        console.log(error);
    }
});
