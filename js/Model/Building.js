class Building extends Model{
    constructor(context, x, y, width, height, floors, face){
        super(context, x, y, width, height)     
        this.floors = floors;
        this.face = face;
        this.floorList = []
    }

    createFloor = (player) =>{
        for(let floor = 0; floor< this.floors; floor++){
            let flat = new Flat(this.context, this.x, this.y, this.width, this.height, floor, this.face)
            this.floorList.push(flat)
        }
    }


}