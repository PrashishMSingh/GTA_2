class Model{
    constructor(context, x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.context = context;
        this.setImage()
        this.tick =0;
    }

    setImage = () =>{
        this.image = new Image()
        this.image.src = './images/model_sprite.jpg'
    }

    getSprite = () =>{
        let requireRotate = false;
        let spriteName;
        let degree;

        if(this instanceof Path){
            if(this.isRoad){
                spriteName = 'road'
            }else{
                spriteName = 'footPath'   
            }
        }else if(this instanceof Fence){
            spriteName = 'fence'
            if(this.orientation ==='vertical' && this.side == 'right' && !this.isLeftCorner){
                requireRotate = true
                degree = 270
            }
        }else if(this instanceof Person){
            
            requireRotate = true;
            degree = this.direction
            if(this.isPlayer){
                spriteName = 'player'                                
                this.image.src = './images/player_move.png'
                if(this.isFighting){
                    spriteName += '_punch'
                    this.image.src = './images/player_punch.png'
                }
            }else if(this.isMob){
                spriteName ='mob'
                this.image.src = './images/mob_move.png'
                if(this.hasFalled || this.isDead){
                    spriteName += '_down'
                    this.image.src = './images/mob_down.png'
                }
            }else if(this.isPolice){
                spriteName = 'police'
                this.image.src = './images/police_move.png'

                if(this.isFighting){
                    spriteName += '_punch'
                    this.image.src = './images/lathi_charge.png'
                }
                if(this.hasFalled || this.isDead){
                    spriteName += '_down'
                    this.image.src = './images/police_down.png'
                }
            }
            else{
                spriteName ='pedesterian'
                this.image.src = './images/pedesterian_move.png'
                if(this.hasFalled || this.isDead){
                    spriteName += '_down'
                    this.image.src = './images/pedes_down.png'
                }
                
            }
            
        }
        else if(this instanceof Car){
            spriteName = 'car'
            this.image.src = './images/gta_3_sprite.png'
            requireRotate = true;
            degree = this.direction -90
        }
        else if(this instanceof Parking){
            spriteName = 'parking'
            if(this.isFreeSpace){
                spriteName += 'F'
            }
        }

        if(this.orientation){
            if(this.orientation === 'vertical'){
                spriteName += 'V'
            }
            else{
                spriteName += 'H'
            }
        }

        if(this.side){
            if(this.side ==="right" ){
                spriteName += 'R'
            }
            else if(this.side === 'down'){
                spriteName += 'D'
            }else if(this.side ==='up'){
                spriteName += 'U'
            }
            else{
                spriteName += 'L'
            }
        }        

        if(this.isCrossPath){
            spriteName += '_CX'
        }
        else if(this.isLeftJunction || this.isRightJunction){
            if(this.isLeftJunction){
                if(!this.isRoad){
                    spriteName += '_RJ'
                }else{
                    spriteName += '_LJ'
                }                
            }else{
                spriteName += '_RJ'
            }
        }

        if(this.isLeftCorner || this.isRightCorner){
            if(this.isLeftCorner){
                spriteName += '_LC'
            }else{
                spriteName += '_RC'
            }
        }

        if(spriteName === 'fenceVR_RC'){
            spriteName = 'fenceVR_LC'
            requireRotate = true;
            degree = 270;
        }

        if(spriteName =='fenceHD' || spriteName =='fenceHU'){
            if(spriteName == 'fenceHU'){
                requireRotate = true
                degree = 180
            }
            spriteName = 'fenceVR'
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

        if(spriteName === 'parkingV'){
            requireRotate = true;
            degree = 90
        }

        return {
            requireRotate,
            spriteName, 
            degree
        };
    }

    generateHitBox = () =>{
        this.context.fillStyle = 'black'
        this.context.rect(this.x, this.y, this.width, this.height)
        this.context.stroke()
        this.context.beginPath()
        this.context.strokeStyle = 'red'
        this.context.closePath()
        this.context.fill()
        this.context.stroke() 
    }

    draw = () =>{
        this.context.beginPath()
        let spriteInfo = this.getSprite()
        let spriteName = spriteInfo.spriteName
        let requireRotate = spriteInfo.requireRotate
        let degree = spriteInfo.degree
        // for sprite rotation
        let dividingFactor = {
            x : 2, y : 2
        }

        if(spriteName){
            let sprite = getSprite(this.x, this.y ,this.height, this.width, spriteName)
            if(this instanceof Person){
                if(this.isFighting){
                    sprite = this.drawFightPose(sprite)
                }else if(this.hasFalled){
                    sprite = this.drawFalledPose(sprite)
                }else if(this.isDead){
                    sprite = this.drawDeadPose(sprite)
                }
                else{
                    sprite = this.drawPerson(sprite)
                }
            }else if(this instanceof Car){
                if(this.state.orientation === 'vertical'){
                    dividingFactor.x = this.state.recentAction === 40 ? 1 : 1
                    dividingFactor.y = this.state.recentAction === 40 ? this.height : 2
                }
            }

            if(sprite){
                let paintInfo = {
                    context : this.context, 
                    x : this.x, 
                    y : this.y, 
                    width : this.width, 
                    height : this.height, 
                    image : this.image, 
                    requireRotate, 
                    sprite, 
                    degree,
                    dividingFactor
                }

                paintImage(paintInfo)
            }
            
        }
              
    }

}