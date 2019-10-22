class Person extends Model{
    constructor(context, x, y, width, height, velocity){
        super(context, x, y, width, height);
        this.velocity = velocity,
        this.buffer = []
        this.friction = 0.80
    }

    move = () =>{
        let degree;
        // up
        if(this.buffer.includes(38)){
            if(degree){
                degree += 270
                degree /= 2
            }
            else{
                degree = 270
            }
        }
        // down
        if(this.buffer.includes(40)){
            if(degree){
                degree += 90
            }
            else{
                degree = 90
            }
            degree = 90

        }

        // right
        if(this.buffer.includes(37)){
            if(degree){
                degree += 180
                degree /= 2
            }
            else{
                degree = 180
            }
        }

        // left
        if(this.buffer.includes(39)){
            if(degree){
                if(degree === 270){
                    degree = (270 + 360)/2
                }else{
                    degree += 0
                    degree /= 2
                }
                
            }
            else{
                degree = 0
            }
        }

        if(degree || degree == 0){
            if(this.friction < 2){
                this.friction += 0.01
            }
            
            this.x += this.velocity * Math.cos(degree * Math.PI / 180) * (this.friction);
            this.y += this.velocity * Math.sin(degree * Math.PI / 180) * (this.friction);
        }
        
    }
}