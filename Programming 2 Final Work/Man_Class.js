let LivingCreature = require('./LivingCreature')

module.exports = class Man extends LivingCreature{
    constructor(x, y) {
        super(x, y);
        this.energy = 8; 

    }

    chooseCell(ch) {
        this.GetNewCoordinates();
        return super.chooseCell(ch);
    }

    mul() {
        var emptyCells = super.chooseCell(0);
        var newChar =emptyCells [Math.floor(Math.random() * emptyCells.length)];
        if (newChar) {
            const newMan = new Man(newChar[0], newChar[1]);
            manArr.push(newMan);
            matrix[newChar[1]][newChar[0]] = 3;
            this.energy = 6;
        }
    }

    plant() {
        var emptyCells = super.chooseCell(10);
        var newChar =emptyCells [Math.floor(Math.random() * emptyCells.length)];
        if (newChar) {
            for (let i = 0; i < swampArr.length; i++) {
                if (swampArr[i].x == newChar[0] && swampArr[i].y == newChar[1]) {
                    swampArr.splice(i, 1);
                    const newTree = new Tree(newChar[0], newChar[1]);
                    treeArr.push(newTree);
                    matrix[newChar[1]][newChar[0]] = 9;
                }
            }
        }
        else {
            this.eat();
        }
    }

    eat() {
        var emptyCells = super.chooseCell(2);
        var newChar =emptyCells [Math.floor(Math.random() * emptyCells.length)];
        if (newChar) {
            this.energy += 2;
            matrix[this.y][this.x] = 0;
            this.x = newChar[0];
            this.y = newChar[1];
            matrix[this.y][this.x] = 3;
            for (var i in eaterArr) {
                if (eaterArr[i].y == this.y && eaterArr[i].x == this.x) {
                    eaterArr.splice(i, 1);
                    break;
                }
            }

            if (this.energy >= 10) {
                this.mul();
            }
        }
        else {
            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }
            else {
                this.move();
            }
        }

    }

    move() {
        var emptyCells = super.chooseCell(0);
        var newChar =emptyCells [Math.floor(Math.random() * emptyCells.length)];
        if (this.energy > 0 && this.energy < 10 && newChar) {
            matrix[this.y][this.x] = 0;
            this.x = newChar[0];
            this.y = newChar[1];
            matrix[this.y][this.x] = 3;
        }
        else if (this.energy >= 10) {
            this.mul();
        }
    }

    die() {
        for (let i = 0; i < manArr.length; i++) {
            if (manArr[i].x == this.x && manArr[i].y == this.y) {
                matrix[this.y][this.x] = 0;
                manArr.splice(i, 1);

            }
        }
    }
}