let LivingCreature = require('./LivingCreature')

module.exports = class Tree extends LivingCreature{
    constructor(x, y) {
        super(x,y);
        this.grow = 0;
        this.planted = false;
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
            var emptyCells = super.chooseCell(0);
            var newChar = emptyCells [Math.floor(Math.random() * emptyCells.length)];
             if (newChar){
                const newGrass = new Grass(newChar[0], newChar[1])
                grassArr.push(newGrass);
                matrix[newChar[1]] [newChar[0]] = 1;
                this.planted = true;
             }

        }
    }

}