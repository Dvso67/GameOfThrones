class Grass extends LivingCreature {
    
    mul(){
        this.energy++;
        var newCell = random(this.chooseCell(0));
        if (this.energy >= 3 && newCell) {
            const newGrass = new Grass(newCell[0], newCell[1])
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.energy = 0;
        }
    }
}