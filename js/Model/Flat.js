const FLOOR_WIDTH = 160
const TO_RADIANT = Math.PI/180
class Flat{
    constructor(context, parentX, parentY, parentWidth, parentHeight, floor, face){   
        this.context = context;
        this.parentX = parentX;
        this.parentY = parentY;
        this.parentWidth = parentWidth;
        this.parentHeight = parentHeight;
        this.floor = floor;
        this.face = face;
        
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
        let x = this.face == 'right' ? this.parentX - (this.xFloorHeight * this.floor) : this.parentX + (this.xFloorHeight * this.floor)
        let y = this.parentY - (this.yFloorHeight * (this.floor))

        this.leftSideBoxData = {
            x: this.face == 'right' ? x + this.parentWidth : x ,
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

        this.bottomSideData = {
            x : x,
            y : y

        }

        switch(this.floor){
            case 1:
                break;
            
            case 2:
            case 3:
        }
    }

    changePrespective = (player) =>{
        let xGap = -this.xFloorHeight;
        let yGap = -this.yFloorHeight;
        
        switch(this.face){
            case 'right':
                xGap = (player.x - this.parentX - this.parentWidth)* this.gameFriction;
                yGap = (player.y - this.parentY ) * this.gameFriction;
                break;
            
            case 'left':
                xGap = (this.parentX - player.x - player.width) * this.gameFriction
                yGap = (player.y + player.height - this.parentY) * this.gameFriction;
                break;

            case 'down':
                xGap = (this.parentX - player.x - player.width)* this.gameFriction;
                yGap = (player.y - this.parentY ) * this.gameFriction;
                break;
            case 'up':
                break;
        }

        if(yGap > this.maxFloorHeight){
            this.yFloorHeight = this.maxFloorHeight
        }
        else if(yGap < this.minFloorHeight && yGap > 0){
            
            this.yFloorHeight = this.minFloorHeight
        }else if(yGap < -this.maxFloorHeight){
            this.yFloorHeight = -this.maxFloorHeight
        }
        else{
            this.yFloorHeight = yGap;
        }

        if(xGap > this.maxFloorHeight){
            this.xFloorHeight = this.maxFloorHeight
        }
        
        else if(xGap < this.minFloorHeight && xGap > 0){
            this.xFloorHeight = this.minFloorHeight
        }
        else if(xGap < -this.maxFloorHeight){
            this.xFloorHeight = -this.maxFloorHeight
        }
        else{
            this.xFloorHeight = xGap;
        }
        
        this.create()        
        this.draw()
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

    drawLPoints = (tempX, x, y) =>{
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

    drawBPoints = (tempX, x, y) =>{
        // top point
        this.context.lineTo(x, y)
            
        // left point
        this.context.lineTo(x + this.parentWidth ,y )
        
        // right point
        this.context.lineTo(x + this.xFloorHeight + this.parentWidth, y - this.yFloorHeight )

        // bottom point
        this.context.lineTo(x + this.xFloorHeight, y - this.yFloorHeight)
        
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
        let tempX =  this.face === 'right'? x - this.xFloorHeight : x + this.xFloorHeight
        switch(orientation){
            case 'horizontal':
                if(this.face === 'down'){
                    this.drawLPoints(tempX, x, y + this.parentHeight)
                }else{
                    this.drawFPoints(tempX, x, y)
                }
                break;
            case 'vertical':
                if(this.face === 'down'){
                    this.drawFPoints(tempX, x, y - this.parentHeight)
                    
                }else{
                    this.drawLPoints(tempX, x, y)
                }
                break;
            case 'top':
                this.drawTPoints(tempX, x, y)
                break;
            
            case 'back':
                this.drawBPoints(tempX, x, y)
                break;
        }

        this.context.closePath()        
        this.context.fillStyle = color
        this.context.fill()        
        this.context.restore()
    }


    draw = () =>{
        if(this.floor < 1){
            this.drawPoints('grey', this.rightSideBoxData.x, this.rightSideBoxData.y, 'vertical')   
            this.drawPoints('blue', this.leftSideBoxData.x, this.leftSideBoxData.y, 'horizontal') 
            this.drawPoints('orange', this.topSideBoxData.x, this.topSideBoxData.y, 'top')                 
            this.drawPoints('yellow', this.bottomSideData.x, this.bottomSideData.y, 'back')                 
        }
        
    }
}