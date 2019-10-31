class Car extends Model{

    constructor(context, x, y, width, height, direction, onMove, isPoliceVehicle, model){
        super(context, x, y, width, height)
        this.direction = direction;
        this.isActive = false,
        this.onMove = onMove,
        this.isPoliceVehicle = isPoliceVehicle
        this.model = model
        this.updateCollisionPosition = true
        this.isPlayerCar = false

        this.buffer = []
        this.state = {
            tick : 0,
            tickPerFrame : 1,
            nextSpriteGap : 160,
            orientation: 'horizontal',
            isTurning : false
        }
        this.setModelAttrib()
    }

    setModelAttrib = () =>{
        if(this.isPoliceVehicle){
            this.velocity = 5
            this.friction = 0.6
        }
        switch(this.model){
            case 1:
                this.friction = 0.8
                this.velocity = 4
                break

            case 2:
                this.friction = 0.6
                this.velocity = 5
                break

            case 3:
                this.friction = 0.4
                this.velocity = 6
                break
        }
    }

    swapSides = (code) =>{
        this.state.orientation = code
        if(code === 'vertical' && this.width > this.height){
            let tempWidth = this.width
            this.width = this.height
            this.height = tempWidth
        }else if(code === 'horizontal' && this.height >  this.width){
            let tempWidth = this.width
            this.width = this.height
            this.height = tempWidth
        }
    }

    getClosestDegree = (degree) =>{
        if(degree > 270){
            return 360
        }else if(degree > 180){
            return 270
        }else if(degree > 90){
            return 180
        }else if(degree > 0){
            return 90
        }

    }

    changeDirection = () =>{
        let [leftCode, rightCode] = [37, 39]
        let offSet = 270
        let changeDegree = this.state.degree > offSet?this.state.degree - offSet : offSet-this.state.degree
        let changeDiff = Math.abs(changeDegree) - Math.abs(this.direction)

        if(this.buffer.includes(leftCode) ||this.buffer.includes(rightCode)){
            this.swapSides('horizontal') 
        }else{
            this.swapSides('vertical')  
        }

        if(changeDiff && Math.abs(changeDiff) !== 180){
            if(this.buffer[0]){
                this.state.recentAction = this.buffer[0]
            }
            this.direction = (this.state.degree - offSet)              
        }

    }

    moveCar = (degree) =>{
        this.x += this.velocity * Math.cos(degree * Math.PI / 180) * (1- this.friction);
        this.y += this.velocity * Math.sin(degree * Math.PI / 180) * (1- this.friction);
    }

    move = () =>{
        if(this.isPlayerCar){
            if(!this.state.isTurning){
                this.state.degree = Math.abs(getMoveDirection(this.buffer)) 
             }
            if(this.state.degree || this.state.degree === 0){
                if(this.friction > 0){
                    this.friction -= 0.01
                }
                this.onMove = true
                this.moveCar(this.state.degree)                
                this.updateCollisionPosition = false
                this.changeDirection()
            }else{
                this.updateCollisionPosition = true
                this.onMove = false
                this.setModelAttrib()
            }
        }
        
        else{
            if(this.onMove && (this.direction || this.direction === 0)){
                if(this.friction > 0){
                    this.friction -= 0.01
                }
                this.moveCar(this.direction-90)
            }else{
                this.onMove = false
                this.setModelAttrib()
            }
        }
        
    }
    
}