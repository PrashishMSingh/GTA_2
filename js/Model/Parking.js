class Parking extends Model{
    constructor(context, x, y, width, height, orientation, isFreeSpace){
        super(context, x, y, width, height);
        this.orientation = orientation;
        this.isFreeSpace = isFreeSpace;
        this.updateCollisionPosition = false
    }
}