class Swamp extends LivingCreature{
    constructor(x, y, bool) {
        super(x, y);
        this.directions_SW = [
            [this.x, this.y - 1],
            [this.x, this.y + 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
        ];
        this.directions_ME = [
            [this.x, this.y - 2], [this.x + 1, this.y - 2], [this.x - 1, this.y - 2],
            [this.x, this.y + 2], [this.x + 1, this.y + 2], [this.x - 1, this.y + 2],
            [this.x - 2, this.y], [this.x - 2, this.y + 1], [this.x - 2, this.y - 1],
            [this.x + 2, this.y], [this.x + 2, this.y + 1], [this.x + 2, this.y - 1],
        ];

        this.multiplayed = bool;
        this.EaterPopulated = false;
        this.ManPopulated = false;
    }

    chooseCharacter(char1, char2, char3, char4, directions) {
        var found = [];
        for (var i in directions) {
            var x = directions[i][0];
            var y = directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] != char1 && matrix[y][x] != char2 && matrix[y][x] != char3 && matrix[y][x] != char4) {
                    found.push(directions[i]);
                }
            }
        }
        return found;

    }

    ArraySplicing(NeededArray){
        for (var i in NeededArray) {
            if (NeededArray[i].y == this.y && NeededArray[i].x == this.x) {
                matrix[this.y][this.x] = 0;
                NeededArray.splice(i, 1);
                break;
            }
        }
    }

    mul() {
        this.energy++;
        var newChar = random(this.chooseCharacter(9, 10, 10, 10, this.directions_SW));
        
        if (this.energy >= 20)
        {
            this.ArraySplicing(swampArr);
        }

        else if (this.energy >= 7 && newChar && this.multiplayed == false) {
            this.multiplayed = true;
            if (matrix[newChar[1]][newChar[0]] == 1) 
            {
                this.ArraySplicing(grassArr);
            }
            else if (matrix[newChar[1]][newChar[0]] == 2) 
            {
                this.ArraySplicing(eaterArr);
            }
            else if (matrix[newChar[1]][newChar[0]] == 3) 
            {
                this.ArraySplicing(manArr);
            }

            const newSwamp = new Swamp(newChar[0], newChar[1], true);
            swampArr.push(newSwamp);
            matrix[newChar[1]][newChar[0]] = 10;
        }

        else if (this.energy >= 12 && this.EaterPopulated == false) {
            var newChar2 = random(this.chooseCharacter(9, 10, 2, 3, this.directions_ME));
            if (newChar2) {
                this.EaterPopulated = true;
                if (matrix[newChar2[1]][newChar2[0]] == 1) 
                {
                    this.ArraySplicing(grassArr);
                }
                const newEater = new Eater(newChar2[0], newChar2[1]);
                eaterArr.push(newEater);
                matrix[newChar2[1]][newChar2[0]] = 2;
            }
        }

        else if (this.energy >= 15 && this.ManPopulated == false) {
            var newChar3 = random(this.chooseCharacter(9, 10, 2, 3, this.directions_ME));
            if (newChar3) {
                this.ManPopulated = true;
                if (matrix[newChar3[1]][newChar3[0]] == 1) 
                {
                    this.ArraySplicing(grassArr);
                }
                const newMan = new Man(newChar3[0], newChar3[1]);
                manArr.push(newMan);
                matrix[newChar3[1]][newChar3[0]] = 3;
            }
        }
    }
}