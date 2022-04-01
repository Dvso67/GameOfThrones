var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);
var fs = require("fs");
const { setInterval } = require("timers/promises");

app.use(express.static("."));

app.get("/", function (req, res) {
  res.redirect("indexp2.html");
});
server.listen(3001);

matrix = [
  [],[],[],[],[],
  [],[],[],[],[],
  [],[],[],[],[],
  [],[],[],[],[],
  [],[],[],[],[],
  [],[],[],[],[],
  /*[],[],[],[],[],
    [],[],[],[],[],
    [],[],[],[],[],
    [],[],[],[],[],
    [],[],[],[],[]*/
];

function generator() {
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < 30; x++) {
      matrix[y].push(Math.round(Math.random() * 1));
    }
  }
}

io.sockets.emit("send matrix", matrix);

grassArr = [];
eaterArr = [];
manArr = [];
swampArr = [];
treeArr = [];

var Swamp_gen_value = 0;

io.sockets.emit("Setuping", matrix);

Grass = require("./Grass_Class");
Eater = require("./Eater_Class");
Man = require("./Man_Class");
Tree = require("./Tree_Class");
Swamp = require("./Swamp_Class");

function CreateObjects() {
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 1 || matrix[y][x] == 4 || matrix[y][x] == 5) {
        matrix[y][x] = 1;
        grassArr.push(new Grass(x, y));
      } else if (matrix[y][x] == 2 || matrix[y][x] == 6) {
        matrix[y][x] = 2;
        eaterArr.push(new Eater(x, y));
      } else if (matrix[y][x] == 3) {
        manArr.push(new Man(x, y));
      } else if (matrix[y][x] == 0 || matrix[y][x] == 7 || matrix[y][x] == 8) {
        matrix[y][x] = 0;
      }
    }
  }

  io.sockets.emit("send matrix", matrix);
}

function Game() {
  for (var i in grassArr) {
    grassArr[i].mul();
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

  Swamp_gen_value++;
  if (Swamp_gen_value == 3) {
    SwampGenerating();
  }

  io.sockets.emit("send matrix", matrix);
}

setInterval(Game, 1000);
//setInterval(CreateObjects, 1000)

function ArraySplicing(NeededArray) {
  for (var i in NeededArray) {
    if (NeededArray[i].y == this.y && NeededArray[i].x == this.x) {
      matrix[this.y][this.x] = 0;
      NeededArray.splice(i, 1);
      break;
    }
  }
}

function SwampGenerating() {
  Swamp_gen_value = 0;
  let found = false;

  while (found == false) {
    let y = Math.round(Math.random() * (matrix.length - 1));
    let x = Math.round(Math.random() * 29);
    if (matrix[y][x] != 9 && matrix[y][x] != 10) {
      if (matrix[y][x] == 1) {
        ArraySplicing(grassArr);
      } else if (matrix[y][x] == 2) {
        ArraySplicing(eaterArr);
      } else if (matrix[y][x] == 3) {
        ArraySplicing(manArr);
      }
      swampArr.push(new Swamp(x, y, false));
      matrix[y][x] = 10;
      found = true;
      break;
    }
  }
}

io.on("connection", function (socket) {
  generator();
  CreateObjects();
});
