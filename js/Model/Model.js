class Model{
    constructor(context, x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.context = context;
        this.setImage()
        this.degree = 270
    }

    setImage = () =>{
        this.image = new Image()
        this.image.src = './images/model_sprite.jpg'
    }

    getSprite=(item)=>{
        return{
            'fence' : {sx : 60 * 16, sy : 60*2, sw : 60, sh:60, dx : this.x, dy:this.y, dw : this.width, dh : this.height},
            'road' : {sx : 0, sy : 0, sw : 60, sh:60, dx : this.x, dy:this.y, dw : this.width, dh : this.height},
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


    drawImage = (requireRotate, sprite) =>{
        if(requireRotate){
            
            this.context.save()
            this.context.translate(this.x + (this.x + this.width)/2, this.y + (this.y + this.height)/2)
            this.context.rotate((Math.PI/180) * this.degree)
            this.context.drawImage(this.image, sprite.sx, sprite.sy, sprite.sw, sprite.sh, sprite.dx, -sprite.dy, sprite.dw, sprite.dh)
            this.context.restore()
        }else{
            this.context.drawImage(this.image, sprite.sx, sprite.sy, sprite.sw, sprite.sh, sprite.dx, sprite.dy, sprite.dw, sprite.dh)
        }
    }
    draw = (color) =>{
        this.context.beginPath()
        let requireRotate = false;
        
        let sprite;
        let spriteName;

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

            if(this.isLeftJunction || this.isRightJunction){
                if(this.isLeftJunction){
                    spriteName += '_LJ'
                    
                }else{
                    spriteName += '_RJ'
                }
            }
        }

        if(spriteName){
            sprite = this.getSprite(spriteName)
            if(sprite){
                this.drawImage(requireRotate, sprite)
            }
        }else{
            this.context.rect(this.x, this.y, this.width, this.height)
        }
        
        this.context.strokeStyle = color;
        this.context.stroke()            
    }

}