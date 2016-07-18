/*----GLOBAL VARIABLE----*/
var array_input = [''];
var array_position = 0;
var storage = {}; //will be an object that stores the previously used numbers and operators
// var oneOp = {
//     '+': function(a,b) {return a + b},
//     '-': function(a,b) {return a - b},
//     '*': function(a,b) {return a * b},
//     '/': function(a,b) {return a / b}
//     };
/*DON'T FORGET TO INCORPORATE ARGUMENTS TO POSSIBLY DO MATHEMATICAL FUNCTIONS*/


/*------WHEN THE DOCUMENT LOADS--------*/
 $(document).ready(function(){
     click_handlers();
     show_input();
 });
/*-----FUNCTIONS-----*/

function click_handlers() {
    $('.numButton').on('click', function () { // adds the click handler on the the number key pad
        number_clicked($(this).text()); // changes the text node when the number key pad is clicked
    });
    $('.opButton').on('click', function () { // adds the click handler on the operator key pad
        op_clicked($(this).text()); //changes the text node when the operator key pad is pressed
    });
    $('.clearButton').on('click', function () { // adds the click handler on the clear button key pad
        clear_clicked($(this).text()); // changes the text node when the clear button key pad is clicked
        
    });
}

function number_clicked(theValue){ // function to run when the number key pad is clicked
    switch (theValue){ //switch statement evaluates the value of the number key pad that is clicked
        case '=':   //this checks if the equal sign is pressed
            if (theValue == '='){ //conditional statement to check the value of the equal sign, if true, run code block
                calculate_equation(); // if above condition is true, run the function calculate_equation
                console.log('the equal sign is doing its job'); //****** console logging for optimization
                return; // exits the function after running
            }
            break; //exits out of the switch statement
    //     case '.':
    //         if (theValue == '.'){/*DISABLES THE DECIMAL BUTTON WHEN CLICKED*/
    //             console.log('the decimal was clicked, doing nothing');
    //             return;
    //         }
    //         break;
    }
    array_input[array_position] += theValue; // if the number keypad is pressed and is not = or . then run these lines
    show_input(); // show input function changes the text node that corresponds to the number key pressed
    console.log(array_input); //******** console logging for optimization
}

function op_clicked(theOps){ // op_clicked function will run when the operator key pad is clicked
    array_position++; // increments the position of the array to the next position
    array_input[array_position] = ''; // used to concatenate the operator into a new string
    array_input[array_position] += theOps; //inputing the operator value pressed into the new string created above
    show_input(); // function to display the operator that was clicked
    array_position++; // increment the array position for new number key to be pressed
    array_input[array_position] = ''; // fill that new position with empty string to concatenate the next value to be pressed
    console.log(array_input); //************ console logging for optimization
}

function clear_clicked(clear){ //clear clicked funtion to run when the clear keypad is pressed
    if(array_position==0 && array_input[array_position] == ''){ //conditional to check if the array position is at 0 and an empty string is true
        console.log('Nothing to clear');//************** console logging for optimization
        return; // if above condition is true, exit out of the function
    }
    switch(clear){ // switch statement to evaluate if the parameter pressed was the clear key pad
        case 'CE': // case statement to check if the clear button pressed is CE
            if (array_input[array_position] == '') { // if the value of the key clicked is CE then check if the array input position contains empty string
                array_input.splice(array_input.length-2,2); // if above condition is true, cut the array starting from position, to ending position
                if(array_position>=2){ /*ADDED TO PREVENT THE ARRAY GOING NEGATIVE VALUE*/
                    array_position-=2; // if the array position is greater than 2, set the array position to 2 positions back
                } else { // if the above condition is not true,
                    array_position = 0; // set the array position back to 0
                }
                console.log("getting rid of operator: ",array_input); //**************console logging for optimization purposes

            }
            else{ // if the CE condition above is not true then,
                var num = array_input[array_position]; // assigning the value at the position of the array into variable num
                num = num.slice(0,num.length-1); // slice the last piece of the string and return the value back to the array input at the current position
                show_input(); // show the result on the display
                console.log('getting rid of numbers', array_input); //******************console logging for optimization
            }
            break; // exit out of the switch statement if above case is met
        case 'AC': // if the clear button pressed has the value of AC, then...
            array_input=['']; //set the input array back to empty string
            array_position=0; // set the position of the array back to 0
            show_input(); // display the number
            break; // exit out of the switch statement
    }
}

function show_input(){ // function to show the input on the display area
    // $('#theInput').text(array_input.join(''));
    var output = null; //setting variable called output to null
    if(array_input[array_position] == ''){ // setting a conditional statement that if the current position in the array is an empty string, then
        output = 0; // set the output to 0
    } else { // if the above condition is not true, then
       output = array_input[array_position]; //assign the current array position of the array as the output
    }
    $('#theInput').text(output); //change the text node of #theInput to the parameter output that was assigned
}
function calculate_equation(show_result){ // calculate equation function made to calculate the equation of the parameters that was clicked
    //the parameter show_result above will be undefined
    var params; // declaring params as an undefined variable
    if(show_result==undefined){ // conditional statement to check if show_result parameter is undefined, then
        show_result = true; //assign the parameter value to true
    }
    if (array_input.length == 3 && array_input[array_position]!='') { // conditional to check if the length of array is 3 AND the last position of the array is NOT an empty string, then
        params = get_params_from_array(); //assign the result of the function get params from array to variable params

    }
    else if(array_input.length==1 && storage.ops != undefined && storage.num2 != undefined){ // conditional to check if the array has 1 or more AND operator storage is undefined (empty string)
        // AND the number2 in storage is also undefined is true, then
        array_input[1] = storage.ops; // assign storage ops into array at position 1
        array_input[2] = storage.num2; // assign storage number 2 into array at position 2
        params = get_params_from_array(); // params gets assigned the result from the function of get params from array
    }
    else if(array_input.length==3 && array_input[array_position]==''){ // conditional to check if the length of the array is 3 AND current position in array is an empty string
        // condition statement checking when user inputs '2 + ='
        if(storage.num2 != undefined) { // if the number 2 in storage is NOT undefined, then
            array_input[2] = storage.num2; // the number 2 in storage gets assigned to the array in the 2 position
        } else{ // if above condition is not true, then
            array_input[2] = array_input[0]; // the array in position 0 gets assigned to the array in the 0 position
        }
        params = get_params_from_array(); // if the above else if statement is true, then the result of get params function is assigned to params
    }
    var result = do_maths(params.num1, params.num2, params.ops); // the result of the function do maths with the parameters gets assigned to result
    storage = params; // previous params gets assigned to storage after use
    update_array_with_answer(result); // update the array with the answer result
    if(show_result){ // if show result is set to true
        show_input();//then display the input on screen
    }
}
function get_params_from_array(){ // get params from array function retrieves the objects from the array, parses them into numbers for calculation
    var params = {}; // empty object assigned to store the parameters from the array
    params.num1 = parseFloat(array_input[0]); // parses the string in the 0 position of the array and assigns to number 1 of params
    console.log('parsing float'); //************* console logging for optimization
    params.num2 = parseFloat(array_input[2]); // parses the string in the 2nd position of the array and assigns it to the number 2 of params
    console.log('parsing float 2');//********** console logging for optimization
    params.ops = array_input[1]; // takes array at position 1 (which is the operator) and assigns it to the ops of params.
    return params; // returns the value of params to where the function was originally called and exits the function
}
function update_array_with_answer(answer){ // function to update the display with the parameter answer
    array_input[0]=answer; // takes the answer parameter and assigns it to the 0 position of the array
    array_input.splice(1,2); //splices the array starting from position 1 to position 2
    array_position=0; // take the value of 0 and assigns it to the array position
}
/*(for loop that has i start at the position i need to then i+=2) to go through an array and pick out the odd numbers also use modulus*/
// var last_op = null; setting the last known variable global
function do_maths(num1, num2, ops){ // do math function to simply do math and nothing else
    var answer; // declares an undefined variable called answer
    switch (ops) { // switch statement to evaluate the parameter ops that was passed through the function
        case '+': // in case of + then add
            answer = num1 + num2; // assign the sum of num1 and num2 to answer
            break; // stop function if above condition was met
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
        // array_input[1] = last_op; For the operation repeat to add later.
    return answer;

}
