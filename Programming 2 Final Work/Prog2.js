var matrix = [
    [], [], [], [], [],
    [], [], [], [], [],
    [], [], [], [], [],
    [], [], [], [], [],
    [], [], [], [], [],
    [],[],[],[],[],
    /*[],[],[],[],[],
    [],[],[],[],[],
    [],[],[],[],[],
    [],[],[],[],[]*/
];

var matrix_value = 30;

var side = 500 / matrix_value;
var grassArr = [];
var eaterArr = [];
var manArr = [];
var swampArr = [];
var treeArr = [];


var Swamp_gen_value = 0;


function generator() {

    for (var y = 0; y < matrix.length; y++) {

        for (var x = 0; x < matrix_value; x++) {
            matrix[y].push(Math.round(Math.random() * 8));
        }

    }
}


function setup() {
    frameRate(5);
    generator();
    createCanvas(matrix[0].length * side, matrix.length * side);
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1 || matrix[y][x] == 4 || matrix[y][x] == 5) {
                matrix[y][x] = 1;
                grassArr.push(new Grass(x, y))
            }
            else if (matrix[y][x] == 2 || matrix[y][x] == 6) {
                matrix[y][x] = 2;
                eaterArr.push(new Eater(x, y))
            }
            else if (matrix[y][x] == 3) {
                manArr.push(new Man(x, y))
            }
            else if (matrix[y][x] == 0 || matrix[y][x] == 7 || matrix[y][x] == 8) {
                matrix[y][x] = 0;
            }
        }
    }
}


function draw() {
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

    for (var i in grassArr) {
        grassArr[i].mul();
        // console.log(grassArr);
    }
    for (var i in eaterArr) {
        eaterArr[i].eat();
    }
    for (var i in manArr) {
        manArr[i].plant();
    }
    for (var i in swampArr) {
        swampArr[i].mul();
    }
    for (var i in treeArr) {
        treeArr[i].growing();
    }

    Swamp_gen_value++
    if (Swamp_gen_value == 3) {
        SwampGenerating();
    }
}

function SwampGenerating() {
    Swamp_gen_value = 0;
    let found = false;

    while (found == false) {
        let y = Math.round(Math.random() * (matrix.length - 1));
        let x = Math.round(Math.random() * (matrix_value - 1));
        if (matrix[y][x] != 9 && matrix[y][x] != 10) {
            if (matrix[y][x] == 1) {
                for (var i in grassArr) {
                    if (grassArr[i].y == y && grassArr[i].x == x) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
            }
            else if (matrix[y][x] == 2) {
                for (var i in eaterArr) {
                    if (eaterArr[i].y == y && eaterArr[i].x == x) {
                        eaterArr.splice(i, 1);
                        break;
                    }
                }
            }
            else if (matrix[y][x] == 3) {
                for (var i in manArr) {
                    if (manArr[i].y == y && manArr[i].x == x) {
                        manArr.splice(i, 1);
                        break;
                    }
                }
            }
            swampArr.push(new Swamp(x, y, false));
            matrix[y][x] = 10;
            found = true;
            break;
        }
    }
}
