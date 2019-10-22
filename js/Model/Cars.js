class Cars extends Model{

    constructor(context, x, y, width, height, velocity, direction){
        super(context, x, y, width, height)
        this.velocity = velocity;
        this.direction = direction;
    }

    move = () =>{
        this.x = this.velocity
        this.y += this.velocity
    }
    

}