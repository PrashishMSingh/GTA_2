class Building extends Model{
    constructor(context, x, y, width, height, floors, side){
        super(context, x, y, width, height)     
        this.floors = floors;
        this.side = side;
        this.floorList = []
    }

    createFloor = (player) =>{
        for(let floor = 0; floor< this.floors; floor++){
            let flat = new Flat(this.context, this.x, this.y, this.width, this.height, floor, this.side)
            this.floorList.push(flat)
        }
    }


}