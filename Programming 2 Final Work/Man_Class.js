class Man {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        //this.index = index;
        this.energy = 6;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    GetNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCharacter(char1) {
        this.GetNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char1) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    mul() {
        var newChar = random(this.chooseCharacter(0));
        if (newChar) {
            const newMan = new Man(newChar[0], newChar[1]);
            manArr.push(newMan);
            matrix[newChar[1]][newChar[0]] = 3;
            this.energy = 6;
        }
    }

    plant() {
        var newChar = random(this.chooseCharacter(10));
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
        var newChar = random(this.chooseCharacter(2));
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
        var newChar = random(this.chooseCharacter(0));
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