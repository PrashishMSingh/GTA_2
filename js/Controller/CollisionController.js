class CollisionController{
    constructor(player, uiController){
        this.player = player
        this.uiController = uiController
    }

    // check if the user has collided to different type of items in content
    // @ param obj : object that need to check for collision
    // @ param content : content will the the items rendered in the enviroment
    // filter item that the obj is allowed to collide
    hasCollided = (obj, content) =>{
        let collided = false
        Object.keys(content).map(key =>{
            content[key].map(item =>{
                if(obj instanceof Car){
                    if(key ==='building' || key === 'car'){
                        if(item !== obj){
                            if(this.checkCollision(item, obj)){
                                collided = true
                                if(obj.isPlayerCar && item.isPoliceVehicle){
                                    if(!this.player.state.pursuit){
                                        this.player.state.pursuit = 1
                                        this.uiController.showPursuitStar()
                                    }
                                }
                            
                            }
                        }                        
                    }
                    if(!obj.isPlayerCar){
                        if(item instanceof Person && item.isPlayer){
                            if(this.checkCollision(item, obj)){
                                collided = true
                            }
                        }
                    }
                }
                else{
                    let condition1 = key ==='building' || key === 'car' || key === 'pedesterian' || key === 'player'
                    let condition2 = key ==='building' || key === 'car'
                    let checkCondition = obj.isPlayer ? condition2 : condition1
                    if(checkCondition){
                        if(item !==obj) {
                            if(this.checkCollision(item, obj)){
                                collided = true
                            }
                        }
                    }
                }
                
            })
        })
        return collided
    }

    // @ param obj: a moving object that can collide to an element
    // @ param item: an item with which the obj has collided
    // returns true if the user had collision and rearranges the user position
    checkCollision = (item, obj) =>{
        let rightCollision = obj.x + obj.width > item.x
        let leftCollision = obj.x < item.x + item.width
        let topCollision = obj.y + obj.height > item.y
        let bottomCollision = obj.y <  item.y + item.height
        
        if(rightCollision && leftCollision && topCollision && bottomCollision){
            if(obj instanceof Person && item instanceof Car){
                if(!obj.isPlayer && item.onMove){
                    this.objectItemCollision(item, obj)   
                }
            }
            if(item.updateCollisionPosition){
                if(obj instanceof Person && !obj.isPlayer ){
                    if(obj.isPolice && item instanceof Person){
                        if(item && item.state.pursuit > 0 && item.state.health > 0){
                            obj.hit(item, this.uiController.showPlayersHeart)
                        }else{
                            this.updateCollidedPlace(item, obj)   
                        }
                    }else if(!obj.updateCollidedPlace){
                        this.updateCollidedPlace(item, obj)                
                    }
                }
                else{
                    this.updateCollidedPlace(item, obj)                
                }
            }
            return true
        }
        return false;
    }

    // identify at which side has the player collided at
    // @param item, the item the player has collided with
    // returns the position where the collision is felt
    getCollisionPlace =(item, obj)=>{
        let collisionPlace;
        let minDiff = item.width;
        var leftDiff =   item.x + item.width - obj.x
        var rightDiff = (obj.x + obj.width) - item.x
        var bottomDiff = (obj.y + obj.height) - item.y
        var topDiff = (item.y + item.height) - obj.y 

        if( leftDiff < minDiff){
            collisionPlace = 'left'
            minDiff = leftDiff          
        }

        if(rightDiff < minDiff){
            collisionPlace = 'right'
            minDiff = rightDiff
        }

        if(bottomDiff < minDiff){
            collisionPlace = 'bottom'
            minDiff = bottomDiff
        }

        if(topDiff < minDiff){
            collisionPlace = 'top'
            minDiff = topDiff
        }
        return collisionPlace
    }

    // @ param item : Car item that has collided with the obj
    // @ param obj : a pedesterian with which car has collided
    // for running over the pedesterian if th can has collided with the pedesterian
    objectItemCollision = (item, obj ) =>{
        obj.onMove = false
        obj.updateCollisionPosition = false
        item.updateCollisionPosition = false
        obj.hasFalled = true

        setTimeout(() =>{
            if(obj.hasFalled){
                if(obj.state.health > 0){
                    if(obj.isPolice && !this.player.state.pursuit){
                        if(item instanceof Car){
                            if(item === this.playersCar){
                                this.player.state.pursuit = 1
                                this.showPursuitStar()
                            }                            
                        }                        
                    }
                    obj.state.health -= 1
                    obj.checkIsDead()
                    obj.hasFalled = false
                    item.updateCollisionPosition = true
                    obj.updateCollisionPosition = true
                    obj.onMove = true
                }else{
                    obj.onMove = false
                    obj.updateCollisionPosition = false
                }                            
            }
        }, 2000)
    }

    
    // @ collisionType: orientation of the object when the collision occured
    // upon collision with other moving object changes the direction for a duration and 
    // returns back to original direction
    changeObjectDirection = (obj, item, collisiontType) =>{
        if(obj instanceof Person){
            if(!obj.isPlayer || !obj.isPlayerCar){
                let direction = obj.direction
                if(collisiontType == 'horizontal'){
                    if((Math.abs(direction) !== 0 ) && Math.abs(direction !== 180 )){
                        direction = Math.random() > 0.5 ? 0  : 180
                    }
                }else{
                    if(Math.abs(direction !== 270) && Math.abs(direction !== 90 )){
                        direction = Math.random() > 0.5 ? 270 : 90
                    }
                }
                let tempDirection = obj.direction
                obj.direction = direction
                if(item instanceof Car || item instanceof Person){
                    setTimeout(() =>{
                        obj.direction = tempDirection
                    }, 500 + 500 * Math.ceil(item.width / obj.width))
                }               
            }
        }
    }

    // @ param obj: a moving object
    // @ param item: other moving objects
    // checks where the collision has occured and changes the obj directon accrodingly
    updateCollidedPlace = (item, obj) =>{
        let collisionPlace = this.getCollisionPlace(item, obj)
        switch(collisionPlace){
            case 'left':
                obj.x = item.x + item.width
                this.changeObjectDirection(obj, item, 'horizontal')
                break;
            
            case 'right':
                obj.x = item.x -obj.width
                this.changeObjectDirection(obj, item, 'horizontal')
                break
            
            case 'bottom':
                obj.y = item.y - obj.height
                this.changeObjectDirection(obj, item, 'vertical')
                break;
            
            case 'top':
                obj.y = item.y + item.height
                this.changeObjectDirection(obj, item, 'vertical')
        }  
    }

}