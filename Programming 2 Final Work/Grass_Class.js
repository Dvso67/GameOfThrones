let LivingCreature = require("./LivingCreature");

module.exports = class Grass extends LivingCreature {
  mul() {
    this.energy++;

    var emptyCells = super.chooseCell(0);
    var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    if (this.energy >= 3 && newCell) {
      const newGrass = new Grass(newCell[0], newCell[1]);
      grassArr.push(newGrass);
      matrix[newCell[1]][newCell[0]] = 1;
      this.energy = 0;
    }
  }
};
