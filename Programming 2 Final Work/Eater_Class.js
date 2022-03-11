class Eater{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        //this.index = index;
        this.energy = 8;
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

    chooseCharacter(char1){
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
    
    mul(){
        var newChar = random(this.chooseCharacter(0));
        if (newChar) {
            const newEater = new Eater(newChar[0], newChar[1]);
            eaterArr.push(newEater);
            matrix[newChar[1]][newChar[0]] = 2;
            this.energy = 8;
        }
    }
    
    eat(){
        this.GetNewCoordinates();
        var newChar = random(this.chooseCharacter(1));
        if (newChar){
            this.energy+=2;
            matrix[this.y][this.x] = 0;
            this.x = newChar[0];
            this.y = newChar[1];
            matrix[this.y][this.x] = 2;
            for (var i in grassArr){
                if (grassArr[i].y == this.y && grassArr[i].x == this.x){
                    grassArr.splice(i, 1);
                    break;
                }
            }

            if (this.energy >= 13){
                this.mul();
            }
        }
        else{
            this.move();
        }
        
    }
    
    move(){
        var newChar = random(this.chooseCharacter(0));
        this.energy -=2;
        if (this.energy > 0 && newChar){
            matrix[this.y][this.x] = 0;
            let x = newChar[0];
            let y = newChar[1];
            matrix[y][x] = 2;
            this.x = x;
            this.y = y;
            var newChar2 = random(this.chooseCharacter(1));
            if (newChar2){
                this.energy ++;
            }
        }
        else if (this.energy <= 0){
            this.die();
        }
        else{
            var newChar3 = random(this.chooseCharacter(1));
            if (newChar3){
                this.energy ++;
            }
        }
    }

    die(){
        for (let i = 0; i<eaterArr.length; i++){
            if (eaterArr[i].x == this.x && eaterArr[i].y == this.y){
                
                eaterArr.splice(i, 1);

            }
        }
        matrix[this.y][this.x] = 0;
    }
}