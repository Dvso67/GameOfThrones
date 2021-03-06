let LivingCreature = require("./LivingCreature");

module.exports = class Eater extends LivingCreature {
  constructor(x, y) {
    super(x, y);
    this.energy = 8;
  }

  mul() {
    var emptyCells = super.chooseCell(0);
    var newChar = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    if (newChar) {
      const newEater = new Eater(newChar[0], newChar[1]);
      eaterArr.push(newEater);
      matrix[newChar[1]][newChar[0]] = 2;
      this.energy = 8;
    }
  }

  eat() {
    this.GetNewCoordinates();
    var grassCells = super.chooseCell(1);
    var newChar = grassCells[Math.floor(Math.random() * grassCells.length)];

    if (newChar) {
      this.energy += 2;
      matrix[this.y][this.x] = 0;
      this.x = newChar[0];
      this.y = newChar[1];
      matrix[this.y][this.x] = 2;
      for (var i in grassArr) {
        if (grassArr[i].y == this.y && grassArr[i].x == this.x) {
          grassArr.splice(i, 1);
          break;
        }
      }

      if (this.energy >= 13) {
        this.mul();
      }
    } else {
      this.move();
    }
  }

  move() {
    var emptyCells = super.chooseCell(0);
    var newChar = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    this.energy -= 2;
    if (this.energy > 0 && newChar) {
      matrix[this.y][this.x] = 0;
      let x = newChar[0];
      let y = newChar[1];
      matrix[y][x] = 2;
      this.x = x;
      this.y = y;
      var emptyCells = super.chooseCell(1);
      var newChar2 = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      if (newChar2) {
        this.energy++;
      }
    } else if (this.energy <= 0) {
      this.die();
    } else {
      this.energy--;
    }
  }

  die() {
    for (let i = 0; i < eaterArr.length; i++) {
      if (eaterArr[i].x == this.x && eaterArr[i].y == this.y) {
        eaterArr.splice(i, 1);
      }
    }
    matrix[this.y][this.x] = 0;
  }
};
