class Tree{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.grow = 0;
        this.planted = false;
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

    chooseCharacter(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;

    }

    growing(){
        this.grow++;
        if (this.grow >= 15){
            for (let i = 0; i<treeArr.length; i++){
                if (treeArr[i].x == this.x && treeArr[i].y == this.y){                   
                    treeArr.splice(i, 1);
                    matrix[this.y][this.x] = 0;
                }
            }
        }
        
        else if (this.grow >= 2 && this.planted == false){
             var newchar = random(this.chooseCharacter(0));
             if (newchar){
                const newGrass = new Grass(newchar[0], newchar[1])
                grassArr.push(newGrass);
                matrix[newchar[1]] [newchar[0]] = 1;
                this.planted = true;
             }

        }
    }

}