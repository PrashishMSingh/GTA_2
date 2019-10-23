const FLOOR_WIDTH = 160
const TO_RADIANT = Math.PI/180
class Flat{
    constructor(context, parentX, parentY, parentWidth, parentHeight, floor, side){   
        this.context = context;
        this.parentX = parentX;
        this.parentY = parentY;
        this.parentWidth = parentWidth;
        this.parentHeight = parentHeight;
        this.floor = floor;
        this.side = side;
        
        this.init()
        this.create()
    }

    init = () =>{
        this.minFloorHeight = 5;
        this.maxFloorHeight = 50
        this.yFloorHeight = - this.maxFloorHeight;
        this.xFloorHeight = - this.maxFloorHeight;
        
        this.gameFriction = 0.2;
        let imagePath = './images/model_sprite.jpg'
        this.image = new Image()
        this.image.src = imagePath
    }

    create = () =>{
        let x = this.side == 'right' ? this.parentX - (this.xFloorHeight * this.floor) : this.parentX + (this.xFloorHeight * this.floor)
        let y = this.parentY - (this.yFloorHeight * (this.floor))

        this.frontSideData = {
            x: this.side == 'right' ? x + this.parentWidth : x ,
            y : y
        }

        this.rightSideBoxData = {
            x: x,
            y: y + this.parentHeight,
        }

        this.topSideBoxData = {
            x: x,
            y : y - this.yFloorHeight
        }

        this.backSideBoxData = {
            x : x,
            y : y
        }
        this.leftSideBoxData = {
            x : x + this.parentWidth,
            y : y
        }

    }

    changePrespective = (player) =>{
        let xGap = -this.xFloorHeight;
        let yGap = -this.yFloorHeight;
        
        switch(this.side){
            case 'right':
                xGap = (player.x - this.parentX - this.parentWidth/2 ) * this.gameFriction;
                yGap = (player.y - this.parentY ) * this.gameFriction ;
                break;
            
            case 'left':
                xGap = (this.parentX  + this.parentWidth/2 - player.x - player.width  ) * this.gameFriction
                yGap = (player.y - this.parentY) * this.gameFriction;
                break;

            case 'down':
                xGap = (this.parentX - player.x ) * this.gameFriction;
                yGap = (player.y - player.width - this.parentY ) * this.gameFriction;
                break;

            case 'up':
                break;
        }

        if(yGap > this.maxFloorHeight){
            this.yFloorHeight = this.maxFloorHeight
        }
        else if(yGap < -this.maxFloorHeight){
            this.yFloorHeight = -this.maxFloorHeight
        }
        else{
            this.yFloorHeight = yGap;
        }

        if(xGap > this.maxFloorHeight){
            this.xFloorHeight = this.maxFloorHeight
        }
        else if(xGap < -this.maxFloorHeight){
            this.xFloorHeight = -this.maxFloorHeight
        }
        else{
            this.xFloorHeight = xGap;
        }
        
        this.create()        
        this.draw(player)
    }

    changeFloorHeight = (xFloorHeight, yFloorHeight) =>{
        this.xFloorHeight = xFloorHeight;
        this.yFloorHeight = yFloorHeight;
        
    }

    drawFPoints = (tempX, x, y) =>{
        // top point
        this.context.lineTo(tempX, y - this.yFloorHeight)
        
        // left point
        this.context.lineTo(x, y)
        
        // bottom point
        this.context.lineTo(x, y + this.parentHeight )

        // right point
        this.context.lineTo(tempX, y + this.parentHeight - this.yFloorHeight)
    }

    drawRPoints = (tempX, x, y) =>{
        // top point
        this.context.lineTo(tempX, y - this.yFloorHeight)
            
        // left point
        this.context.lineTo(tempX + this.parentWidth , y - this.yFloorHeight)
        
        // bottom point
        this.context.lineTo(x + this.parentWidth, y)

        // right point
        this.context.lineTo(x, y)
        
        this.context.closePath()
    }

    drawLPoints = (tempX, x, y) =>{
        // top point
        this.context.lineTo(tempX, y - this.yFloorHeight)
            
        // left point
        this.context.lineTo(x , y)

        // bottom point
        this.context.lineTo(x , y + this.parentHeight)

        // right point
        this.context.lineTo(tempX, y + this.parentHeight - this.yFloorHeight)

        
        
        this.context.closePath()
    }

    drawBPoints = (tempX, x, y) =>{
        // top point
        this.context.lineTo(x, y)
            
        // top right point
        this.context.lineTo(x + this.parentWidth ,y )
        
        // bottom right point
        this.context.lineTo(tempX + this.parentWidth, y - this.yFloorHeight )
        
        // bottom left 
        this.context.lineTo(tempX , y - this.yFloorHeight)
        
        this.context.closePath()
    }

    drawTPoints = (tempX, x, y) => {
        // top point
        this.context.lineTo(tempX, y)
                        
        // left point
        this.context.lineTo(tempX + this.parentWidth  , y)

        // bottom point
        this.context.lineTo(tempX+ this.parentWidth , y + this.parentHeight)

        // right point
        this.context.lineTo(tempX, y + this.parentHeight)
    }

    drawPoints = (color, x, y, orientation ) =>{
        this.context.beginPath()
        let tempX =  this.side === 'right'? x - this.xFloorHeight : x + this.xFloorHeight
        switch(orientation){
            case 'front':
                this.drawFPoints(tempX, x, y)
                // if(this.side === 'down'){
                //     this.drawRPoints(tempX, x, y + this.parentHeight)
                // }else{
                    
                // }
                break;
            case 'right':
                this.drawRPoints(tempX, x, y)
                // if(this.side === 'down'){
                //     this.drawFPoints(tempX, x, y - this.parentHeight)
                    
                // }else{
                    
                // }
                break;
            case 'top':
                this.drawTPoints(tempX, x, y)
                break;
            
            case 'back':
                
                this.drawBPoints(tempX, x, y)
                break;

            case 'left':
                if(this.side == 'right'){
                    this.drawFPoints(tempX, x, y)
                }else{
                    this.drawLPoints(tempX, x, y)
                }
                
                break;
        }

        this.context.closePath()        
        this.context.fillStyle = color
        this.context.fill()        
        this.context.restore()
    }


    draw = (player) =>{
        if(player){
            // when player goes over the building
            if(player.y + player.height > this.parentY && (player.x +player.width < this.parentX || player.y + player.height > this.parentY)){
                this.drawPoints('#2356B5', this.backSideBoxData.x, this.backSideBoxData.y, 'back')  
                this.drawPoints('#137FDF', this.leftSideBoxData.x, this.leftSideBoxData.y, 'left')                 
                this.drawPoints('#137FDF', this.frontSideData.x, this.frontSideData.y, 'front')
                this.drawPoints('#2356B5', this.rightSideBoxData.x, this.rightSideBoxData.y, 'right')   
                this.drawPoints('grey', this.topSideBoxData.x, this.topSideBoxData.y, 'top')    
            }
            else{
                       
                this.drawPoints('#2356B5', this.rightSideBoxData.x, this.rightSideBoxData.y, 'right')
                this.drawPoints('#137FDF', this.frontSideData.x, this.frontSideData.y, 'front')  
                                
                this.drawPoints('#137FDF', this.leftSideBoxData.x, this.leftSideBoxData.y, 'left')    
                this.drawPoints('#2356B5', this.backSideBoxData.x, this.backSideBoxData.y, 'back') 
                this.drawPoints('grey', this.topSideBoxData.x, this.topSideBoxData.y, 'top')    
            }            
        }
        
        
        
    }
}