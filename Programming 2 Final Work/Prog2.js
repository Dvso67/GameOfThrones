var socket = io();

var side;
side = 500/20

// socket.on ('send matrix', Draw_Matrix);

function setup() {
    createCanvas(30 * side, 30 * side);  
}


function Draw_Matrix(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            //noStroke();
            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("bisque");
            }
            else if (matrix[y][x] == 10) {
                fill("purple");
            }
            else if (matrix[y][x] == 9) {
                fill("brown");
            }
            else {
                fill("white");
            }
            triangle(x * side, y * side, x * side, y * side+side, x * side+side, y * side,)
            //rect(x * side, y * side, side, side);
        }
    }
}

function kill() {
    socket.emit("kill");
}

function AddGrass() {
    socket.emit("add grass");
}
function AddEaters() {
    socket.emit("add eaters");
}
function AddMen() {
    socket.emit("add men");
}

socket.on('send matrix', Draw_Matrix);
