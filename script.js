/*----GLOBAL VARIABLE----*/
var array_input = [''];
var array_position = 0;
// var oneOp = {
//     '+': function(a,b) {return a + b},
//     '-': function(a,b) {return a - b},
//     '*': function(a,b) {return a * b},
//     '/': function(a,b) {return a / b}
//     };
/*DON'T FORGET TO INCORPORATE ARGUMENTS TO POSSIBLY DO MATHEMATICAL FUNCTIONS*/


/*------WHEN THE DOCUMENT LOADS--------*/
 $(document).ready(click_handlers, show_input());
/*-----FUNCTIONS-----*/

/*CLICK HANDLERS*/
// function displayZero(){
//     $('#theInput').text(array_input);
//     // array_input = [''];
// }
function click_handlers() {
    $('.numButton').on('click', function () {
        number_clicked($(this).text());
    });
    $('.opButton').on('click', function () {
        op_clicked($(this).text());
    });
    $('.clearButton').on('click', function () {
        clear_clicked($(this).text());
    });
}

function number_clicked(theValue){
    switch (theValue){
        case '=':
            if (theValue == '='){
                do_maths();
                console.log('the equal sign is doing its job');
                return;
            }
    //         break;
    //     case '.':
    //         if (theValue == '.'){/*DISABLES THE DECIMAL BUTTON WHEN CLICKED*/
    //             console.log('the decimal was clicked, doing nothing');
    //             return;
    //         }
    //         break;
    }
    array_input[array_position] += theValue;
    show_input();
    console.log(array_input);
}

function op_clicked(theOps){
    array_position++;
    array_input[array_position] = '';
    array_input[array_position] += theOps;
    show_input();
    array_position++;
    array_input[array_position] = '';
    console.log(array_input)
}

function clear_clicked(clear){
    if(array_position==0 && array_input[array_position] == ''){
        console.log('Nothing to clear');
        return;
    }
    switch(clear){
        case 'CE':
            if (array_input[array_position] == '') {
                array_input.splice(array_input.length-2,2);
                if(array_position>=2){ /*ADDED TO PREVENT THE ARRAY GOING NEGATIVE VALUE*/
                    array_position-=2;
                }
                else{
                    array_position = 0;
                }
                console.log("getting rid of operator: ",array_input);

            }
            else{
                var num = array_input[array_position];
                array_input[array_position] = num.slice(0,num.length-1);
                show_input();
                console.log('getting rid of numbers', array_input);
            }
            break;
        case 'AC':
            array_input=[''];
            array_position=0;
            show_input();
            break;
    }
}
function show_input(){
    $('#theInput').text(array_input.join(''));
    $('#theInput').text(array_input[array_position]); /*maybe I want to display entire line of numbers*/
}

/*(for loop that has i start at the position i need to then i+=2) to go through an array and pick out the odd numbers*/
// var last_op = null; setting the last known variable global
function do_maths(){
    var answer;
    // var last_op = array_input[1];last known operator stored in variable
    if (array_input.length == 3) {
    var num1 = parseInt(array_input[0]);
    console.log('parsing int');
    var num2 = parseInt(array_input[2]);
    console.log('parsing int 2');
    var ops = array_input[1];

    switch (ops){
        case '+':
            answer = num1 + num2;
            break;
        case '-':
            answer = num1 - num2;
            break;
        case '*':
            answer = num1 * num2;
            break;
        case '/':
            answer = num1 / num2;
            break;
        case '=':
            break;
    }
        array_input = [''];
        array_input[0] = answer;
        array_position = 0
}
    show_input();
    // array_input[1] = last_op; For the operation repeat to add later.
}
