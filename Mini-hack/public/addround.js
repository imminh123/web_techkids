$(document).ready(function(){
    let url_split = window.location.href.split("/");
    $.ajax({
        url: "http://localhost:1125/games/"+url_split[4],
        type: "POST",
        success: (response)=>{
            console.log("Response ne");
            console.log(response);
            
            //set player name
            $("#player1").text(response.player[0]);
            $("#player2").text(response.player[1]);
            $("#player3").text(response.player[2]);
            $("#player4").text(response.player[3]);
            
            //set player score
            console.log('Round number : '+ response.score.length);
            updateTable(response);

        },
        error: (err)=>{
            console.log(err);
        }
    });

    $("#add-row").click(function(){
        //add row
        addRow(0,0,0,0);
        console.log('Clicking');
        //send request to add a round to DB
        $.ajax({
            url: "http://localhost:1125/addRound",
            type: "POST",
            data: {id: url_split[4]},
            success: function(response){
                console.log(response);
            },
            error: function(error){
                console.log(err);
            }
        });
    });
    
    

    $(document).on("input", ".numberInput", function(){
        let stt = $(this).data('stt');
        let val = $(this).val();
        let numberOfRows = $("#table-round tbody tr").length;
        console.log('Sending data {stt: '+ stt +'value: '+ val);
        $.ajax({
            url: "http://localhost:1125/process/"+url_split[4],
            type: "POST",
            data: {stt: stt, value: val, numberOfRows: numberOfRows },
            success: function(response){
                console.log('response ne : '+ response);
               updateSum(response);
            },
            error: function(err){
                console.log(err);
            }
        })
        
    });
    
});


function addRow(input1,input2,input3,input4){
    var numberOfRows = $("#table-round tbody tr").length;
        var markup = `<tr>
        <th scope="row">Round ${numberOfRows}</th>
            <td><input type="number" class="form-control numberInput" data-stt="1" value="${input1}" id="input1"></td>
            <td><input type="number" class="form-control numberInput" data-stt="2" value="${input2}" id="input2"></td>
            <td><input type="number" class="form-control numberInput" data-stt="3" value="${input3}" id="input3"></td>
            <td><input type="number" class="form-control numberInput" data-stt="4" value="${input4}" id="input4"></td>
        </tr>`;
        $("table tbody").append(markup);
}

function updateTable(response){
    var score = response.score;
    for(var i=0; i<score.length;i++){
        addRow(score[i][0], score[i][1], score[i][2], score[i][3]);
    }
    updateSum(response);
}


function updateSum(response){
    var score = response.score;
    var score1 = 0;
    var score2 = 0;
    var score3 = 0;
    var score4 = 0;
    for(var i=0; i<score.length;i++){
        score1 = score1 + Number(score[i][0]);
        score2 = score2 + Number(score[i][1]);
        score3 = score3 + Number(score[i][2]);
        score4 = score4 + Number(score[i][3]);
    }
    $("#sum1").text(score1);
    $("#sum2").text(score2);
    $("#sum3").text(score3);
    $("#sum4").text(score4);
}