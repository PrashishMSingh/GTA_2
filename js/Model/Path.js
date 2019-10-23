class Path extends Model{
    constructor(context, x, y, width, height, isRoad, isLeftJunction, isRightJunction, orientation, face){
        super(context, x, y, width, height);
        this.isRoad = isRoad;
        this.isLeftJunction = isLeftJunction;
        this.isRightJunction = isRightJunction;
        this.orientation = orientation;
        this.face = face
    }

}