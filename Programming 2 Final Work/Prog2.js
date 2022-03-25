var socket = io();

var matrix_value = 30;
var side = 500 / matrix_value;

socket.on ('send matrix', draw);

function setup() {
    createCanvas(matrix[0].length * side, matrix.length * side);  
}


function draw(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("bisque")
            }
            else if (matrix[y][x] == 10) {
                fill("purple");
            }
            else if (matrix[y][x] == 9) {
                fill("brown");
            }
            else {
                fill("grey");
            }
            rect(x * side, y * side, side, side);
        }
    }
}

socket.on('send matrix', draw);
