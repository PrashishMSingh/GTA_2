class Model{
    constructor(context, x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.context = context;
        this.setImage()
    }

    setImage = () =>{
        this.image = new Image()
        this.image.src = './images/model_sprite.jpg'
    }

    getSprite=(item)=>{
        return{
            'fence' : {sx : 60 * 16, sy : 60*2, sw : 60, sh:60, dx : this.x, dy:this.y, dw : this.width, dh : this.height},
            
            'road' : {sx : 0, sy : 0, sw : 60, sh:60, dx : this.x, dy:this.y, dw : this.width, dh : this.height},

            'roadVR' : {sx : 60 * 4, sy :60 * 22 + 20, sw : 60, sh:60, dx : this.x, dy:this.y, dw : this.width, dh : this.height},

            'roadHL' : {sx : 60 * 4, sy :60 * 22 + 20, sw : 60, sh:60, dx : this.x, dy:this.y, dw : this.width, dh : this.height},
            'roadHR' : {sx : 60 * 4, sy :60 * 22 + 20, sw : 60, sh:60, dx : this.x, dy:this.y, dw : this.width, dh : this.height},

            'roadVL' : {sx : 60 * 4, sy :60 * 22 + 20, sw : 60, sh:60, dx : this.x, dy:this.y, dw : this.width, dh : this.height},
            

            'roadVL_CX' : {sx : 60 * 9 - 22, sy :60 * 27 - 20, sw : 50, sh:50, dx : this.x, dy:this.y, dw : this.height, dh : this.width},
            'roadHL_CX' : {sx : 60 * 9, sy : 60 * 26, sw : 60, sh:60, dx : this.x, dy:this.y, dw : this.width, dh : this.height},

            'roadVR_CX' : {sx : 60 * 9 - 22, sy :60 * 27 - 20, sw : 50, sh:50, dx : this.x, dy:this.y, dw : this.height, dh : this.width},
            'roadHR_CX' : {sx : 60 * 9, sy : 60 * 26, sw : 60, sh:60, dx : this.x, dy:this.y, dw : this.width, dh : this.height},

            'roadVL_RJ' : {sx : 60 * 4, sy :60 * 22 + 20, sw : 60, sh:60, dx : this.x, dy:this.y, dw : this.width, dh : this.height},
            'roadHL_LJ' : {sx : 60 * 16, sy :60 * 4 + 20, sw : 60, sh:60, dx : this.x, dy:this.y, dw : this.width, dh : this.height},

            'roadVR_RJ' : {sx : 60 *1 + 10 , sy :60 * 27 - 5, sw : 58, sh:48, dx : this.x, dy:this.y, dw : this.width, dh : this.height},
            'roadHR_LJ' : {sx : 60 *1 + 10 , sy :60 * 27 - 5, sw : 58, sh:48, dx : this.x, dy:this.y, dw : this.width, dh : this.height},

            'footPathVL' : {sx : 60 * 15 - 10, sy : 60 * 31, sw : 55, sh:60, dx : this.x, dy:this.y, dw : this.width, dh : this.height},
            'footPathVR' : {sx : 60 * 14 + 2, sy : 60 * 31, sw : 55, sh:60, dx : this.x, dy:this.y, dw : this.width, dh : this.height},
            
            'footPathVL_RJ' : {sx : 60 * 13 - 12, sy : 60 * 31, sw : 55, sh:60, dx : this.x, dy:this.y, dw : this.width, dh : this.height},
            'footPathVL_LJ' : {sx : 60 * 15 - 10, sy : 60 * 31, sw : 55, sh:60, dx : this.x, dy:this.y, dw : this.width, dh : this.height},
            'footPathVR_RJ' : {sx : 60 * 6 -38 , sy : 60 * 31 - 4, sw : 60, sh:60, dx : this.x, dy:this.y, dw : this.width, dh : this.height},
            'footPathVR_LJ' : {sx : 60 * 4, sy : 60 * 31, sw : 60, sh:60, dx : this.x, dy:this.y, dw : this.width, dh : this.height},

            'footPathHL' : {sx : 60 * 3 + 13, sy : 60 * 31 + 2, sw : 60, sh:58, dx : this.x, dy:this.y, dw : this.width, dh : this.height},
            'footPathHR' : {sx : 60 * 6 -38 , sy : 60 * 31 - 4, sw : 60, sh:60, dx : this.x, dy:this.y, dw : this.width, dh : this.height},
            
            'footPathHL_LJ' : {sx : 60 * 4, sy : 60 * 31, sw : 60, sh:60, dx : this.x, dy:this.y, dw : this.width, dh : this.height},
            'footPathHL_RJ' : {sx : 60 * 4, sy : 60 * 31, sw : 60, sh:60, dx : this.x, dy:this.y, dw : this.width, dh : this.height},
            'footPathHR_LJ' : {sx : 60 * 4, sy : 60 * 31, sw : 60, sh:60, dx : this.x, dy:this.y, dw : this.width, dh : this.height},
            'footPathHR_RJ' : {sx : 60 * 6 -38 , sy : 60 * 31 - 4, sw : 60, sh:60, dx : this.x, dy:this.y, dw : this.width, dh : this.height},
        }[item]
    }


    drawImage = (requireRotate, sprite, degree) =>{
        if(requireRotate){
            let rotatePointX = this.x + (this.width)/2
            let rotatePointY = this.y + (this.height)/2

            this.context.save()
            this.context.moveTo(0, 0)
            this.context.translate(rotatePointX, rotatePointY)
            this.context.rotate(degree * (Math.PI/180) )
            this.context.drawImage(this.image, sprite.sx, sprite.sy, sprite.sw, sprite.sh, -this.width / 2, -this.height/2 , sprite.dw, sprite.dh)
            
            this.context.restore()
        }else{
            this.context.drawImage(this.image, sprite.sx, sprite.sy, sprite.sw, sprite.sh, sprite.dx, sprite.dy, sprite.dw, sprite.dh)
        }
    }
    draw = (color) =>{
        this.context.beginPath()
        let requireRotate = false;
        let degree;
        
        let sprite;
        let spriteName;
        
        if(this instanceof Person){

        }

        if(this instanceof Path){
            if(this.isRoad){
                spriteName = 'road'
            }else{
                spriteName = 'footPath'   
            }

            if(this.orientation === 'vertical'){
                spriteName += 'V'
            }
            else{
                spriteName += 'H'
            }

            if(this.side ==="right" ){
                spriteName += 'R'
            }
            else{
                spriteName += 'L'
            }

            if(this.isCrossPath){
                spriteName += '_CX'
            }else if(this.isLeftJunction || this.isRightJunction){
                if(this.isLeftJunction){
                    spriteName += '_LJ'
                    
                }else{
                    spriteName += '_RJ'
                }
            }

            if(this.isCrossPath && this.orientation === 'vertical'){
                requireRotate = true;
                degree = 90
            }

            if(this.isRoad && this.orientation === 'vertical'){
                requireRotate = true;
                if(this.side === 'right'){
                    degree = 90
                }
                else if(this.side === 'left'){
                    degree = 270
                }
            }
            if(this.isRoad && this.orientation === 'horizontal'){
                
                if(this.side === 'right'){
                    requireRotate = true;
                    degree = 180
                }
            }

        }

        if(spriteName){
            sprite = this.getSprite(spriteName)
            if(sprite){
                this.drawImage(requireRotate, sprite, degree)
            }
        }else{
            this.context.rect(this.x, this.y, this.width, this.height)
        }
        
        this.context.strokeStyle = color;
        this.context.stroke()            
    }

}