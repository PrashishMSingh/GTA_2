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
        this.maxFloorHeight = 30
        this.yFloorHeight = - this.maxFloorHeight;
        this.xFloorHeight = - this.maxFloorHeight;
        
        this.gameFriction = 0.2;
        this.sides = []
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

    buildingView = (player) =>{
        let xGap = -this.xFloorHeight;
        let yGap = -this.yFloorHeight;
        
        switch(this.side){
            case 'right':
                xGap = (player.x - this.parentX - this.parentWidth/2 ) * this.gameFriction;
                yGap = (player.y - this.parentY ) * this.gameFriction ;
                break;
            
            case 'left':
                xGap = (this.parentX  + this.parentWidth/2 - player.x - player.width ) * this.gameFriction
                yGap = (player.y - this.parentY) * this.gameFriction;
                break;

            case 'down':
                xGap = (this.parentX - player.x ) * this.gameFriction;
                yGap = (player.y - player.width - this.parentY ) * this.gameFriction;
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
    }

    changePerspective = (player) =>{
        if(this.parentX <= 0 || this.parentY <= 0){
            this.xFloorHeight = this.maxFloorHeight - 5
            this.yFloorHeight = this.maxFloorHeight - 5
        }else{
            this.buildingView(player)
        }
        
        this.create()        
        this.draw(player)
    }

    frontCords = (tempX, x, y) =>{
        return{
            top_left : {x : tempX, y : y-this.yFloorHeight},
            top_right:{x, y},
            bottom_right:{x, y:y+this.parentHeight},
            bottom_left : {x : tempX, y : y +this.parentHeight - this.yFloorHeight}
        }
    }

    rightCords = (tempX, x, y) =>{
        return{
            top_left : {x : tempX, y : y-this.yFloorHeight},
            top_right : {x : tempX + this.parentWidth, y : y-this.yFloorHeight},
            bottom_right : {x : x+this.parentWidth, y},
            bottom_left : {x, y}
        }
    }

    leftCords = (tempX, x, y) =>{

        return{
            top_left:{x : tempX, y : y-this.yFloorHeight},
            top_right:{x, y},
            bottom_right:{x, y:y + this.parentHeight},
            bottom_left : {x : tempX, y: y+this.parentHeight -this.yFloorHeight}
        }
    }

    bottomCords = (tempX, x, y) =>{
        return{
            top_left : {x, y},
            top_right : {x : x+this.parentWidth, y},
            bottom_right : {x : tempX +this.parentWidth, y: y-this.yFloorHeight},
            bottom_left : {x : tempX, y:y-this.yFloorHeight}
        }
    }

    topCords = (tempX, x, y) => {
        return{
            top_left : {x : tempX, y},
            top_right : {x : tempX + this.parentWidth, y},
            bottom_right : {x : tempX + this.parentWidth, y : y + this.parentHeight},
            bottom_left : {x : tempX, y:y+this.parentHeight}
        }
    }

    drawSides = (cords) =>{
        Object.keys(cords).map(key =>{
            this.context.lineTo(cords[key].x, cords[key].y)
        })
        this.context.closePath()    
    }

    getCords = (x, y, orientation) =>{
        let tempX =  this.side === 'right'? x - this.xFloorHeight : x + this.xFloorHeight
        return {
            front:this.frontCords(tempX, x, y),
            right: this.rightCords(tempX, x, y),
            top: this.topCords(tempX, x, y),
            back: this.bottomCords(tempX, x, y),
            left: this.leftCords(tempX, x, y)
        }[orientation]
    }


    getSides = (index) =>{
        return [
            ['right', 'left', 'back', 'front', 'top'],
            ['front', 'right','left', 'back', 'top'],
            ['front', 'right', 'back','left', 'top'],
        ][index]
        
    }

    drawCube = (index) =>{
        let sides = this.getSides(index)
        sides.map(side=>{
            let params = this.getCubeParams(side)
            let sideCords = this.getCords(params.x, params.y, side)
            this.context.beginPath()
            this.drawSides(sideCords)
            this.context.fillStyle = params.color
            this.context.strokeStyle = 'grey'
            this.context.fill()        
            this.context.stroke()
            this.context.restore()
        })
    }

    getCubeParams =(orientation) =>{
        return{
                back : { x : this.backSideBoxData.x, y : this.backSideBoxData.y, color : '#A9A9A9'},
                left : { x : this.leftSideBoxData.x, y : this.leftSideBoxData.y, color : '#C0C0C0' },
                front : {x : this.frontSideData.x, y : this.frontSideData.y, color : '#D3D3D3'},
                right: {x : this.rightSideBoxData.x, y : this.rightSideBoxData.y, color: '#C0C0C0'},
                top : {x : this.topSideBoxData.x, y:this.topSideBoxData.y, color: 'grey'}

        }[orientation]
    }


    draw = (player) =>{
        if(player){
            
            // when player has not passed building vertically
            if(player.y + player.height < this.parentY ){
                if(player.x + player.width > this.parentX){
                    this.drawCube(1)
                }else{
                    this.drawCube(0)  
                }
            }
            else{
                // when player has passed building horiaontally
            if(player.x + player.width > this.parentX + this.parentWidth){
                    this.drawCube(2)
                }    
                else if(player.x + player.width > this.parentX){
                    this.drawCube(1)
                }            
                else{
                    this.drawCube(0)    
                }                
            }  
        
                      
        }
    }
}