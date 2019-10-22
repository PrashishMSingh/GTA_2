class Model{
    constructor(context, x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.context = context;
    }

    
    draw = (color) =>{
        this.context.beginPath()
        this.context.rect(this.x, this.y, this.width, this.height)
        this.context.strokeStyle = color;
        this.context.stroke()            
    }

}