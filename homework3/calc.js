
//global var
var fNum='', fNumRes='',sNum='',sNumRes='',op='', sNumRes2='';
var answer='';
var fNumDone = true, sNumDone = false, opDone = false, singleOp = false,opClicked = false;


var math = { //does the operation
    '+': function(x,y){
        return x+y;
    },
    '-': function(x,y){
        return x-y;
    },
    '*': function(x,y){
        return x*y;
    },
    '/': function(x,y){
        return x/y;
    }
};

//functions
function pickFirstNum(){ 
        $('.numButton').click( function(){
            opDone = false;
            if(fNumRes==answer&& fNumDone && !sNumDone){ //click new number after answer
                fNumRes = '';
                fNum = $(this).val();
                fNumRes += fNum;
                $('#display').val(fNumRes);
            }
            else if(fNumDone && !sNumDone){ //normal
                fNum = $(this).val();
                //console.log(fNum);
                fNumRes += fNum;
                //console.log(fNumRes);
                $('#display').val(fNumRes);
            };
        });
}; 

function pickOp(){
    $('.operator').click(function(){ 
        //keep fNumRes same
        opDone = false;
        if(singleOp){ //clicking operator multiple times. choose the last one
        }
        else if(!fNumDone && sNumDone){ //multiple operators at a time
            fNumRes = Number(fNumRes);
            sNumRes = Number(sNumRes);
            fNumRes = math[op](fNumRes,sNumRes);
            $('#display').val(fNumRes);
            sNumRes = '';
        }
        op = $(this).val();
        fNumDone = false; //makes sure second number is picked
        sNumDone = true; 
        singleOp = true;
        opClicked = true;
    });
}
function pickSecNum(){
    $('.numButton').click( function(){
        sNumRes2=''; //resets the placeholder when not in use
        singleOp = false;
        opDone = false;
        opClicked = false; //check if op clicked for looping the equal sign
        if(!fNumDone&&sNumDone){ //second number is picked
            sNum = $(this).val();
            //console.log(fNum);
            sNumRes += sNum;
            //console.log(sNumRes);
            $('#display').val(sNumRes);
        };
    });
}
function equals(){
    singleOp = false;
    $('#equalsButton').click(function(){
        // var second = toNumber(arr);

        if(opDone){ //equals again
            if(sNumRes2==''){ //clicking equals again after operator

                answer = fNumRes;
                $('#display').val(answer);
                fNumDone = true; //cycle through pickFirstNum
                sNumDone = false;
            }
            else{ //click equals again
                if(opClicked){
                    answer = fNumRes;
                    $('#display').val(answer);
                    fNumDone = true; //cycle through pickFirstNum
                    sNumDone = false;
                }
                else{
                    answer = math[op](answer,sNumRes2);
                    fNumRes = answer;
                    $('#display').val(answer);
                }
            }
        }
        else if(sNumRes===''){ //if there is no second number
            $('#display').val(fNumRes);
            fNumDone = true; //cycle through pickFirstNum
            sNumDone = false;
            answer = fNumRes;
        }
        else{ //ordinary equals, makes answer the first Number
            fNumRes = Number(fNumRes);
            sNumRes = Number(sNumRes);
            answer = math[op](fNumRes,sNumRes);
            $('#display').val(answer);
            sNumRes2 = sNumRes; //placeholder for second number
            sNumRes=''; //reset the second number
            fNumRes = answer; //answer becomes the first number
            fNumDone = true; //cycle through pickFirstNum
            sNumDone = false;
        }
        opDone = true; //press equals again

    });
}
function reset(){ //clear
    $('#clearButton').click(function(){
        $('#display').val('');
        fNum='', fNumRes='',sNum='',sNumRes='',op='',answer;
        fNumDone = true, sNumDone = false, opDone = true;
    });

}


//main
pickFirstNum();
pickOp();
pickSecNum();
equals();
reset();

