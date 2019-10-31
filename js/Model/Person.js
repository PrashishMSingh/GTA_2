class Person extends Model{
    constructor(context, x, y, width, height, velocity, isPlayer, direction, currentPath, healthPoint, isMob, isPolice){
        super(context, x, y, width, height);
        this.velocity = velocity,
        this.buffer = []
        this.friction = 0.2,
        this.pedesterianFriction = 0.01,
        this.currentQuadrant = 0
        this.isPlayer = isPlayer
        this.isActive = true
        this.isMoving = false
        this.direction = direction
        this.currentPath = currentPath
        this.healthPoint = healthPoint
        this.updateCollisionPosition =  true
        this.isMob = isMob
        this.isPolice = isPolice
        this.isRunnable = false
        this.isFighting = false
        this.isHitting = false
        this.hasTurned = false
        this.onPursuit = false
        this.hasFalled = false
        this.isDead = false
        
        this.state = {   
            health : 7,    
            sprint : 7,
            money : 100,
            pursuit : 0,
            kill : 0,
            policeKills : 0
        }
        this.resetState()
    }

    resetState = () =>{
        this.playerState = {
            tick : 0,
            tickPerFrame : 8,
            frameIndex : 0,
            spriteIndex :  [180, 5, 100],
            // spriteIndex : [110, 80, 50],
            // spriteIndex :  [50, 150, 280]
        },

        this.punchState = {
            tick : 0,
            tickPerFrame : 4,
            frameIndex : 0,
            spriteIndex :  [ 320, 150, 40, 20],
        }

        this.lathiChargeState = {
            tick : 0,
            tickPerFrame : 4,
            frameIndex : 0,
            spriteIndex : [110, 80, 50],
        }

        this.hitState = {
            tick : 0,
            tickPerFrame : 18
        }



        this.sprintState = {
            tick : 0,
            tickPerFrame : 20
        }
        
        this.pedesterianState = {
            tick : 0,
            tickPerFrame : 6,
            frameIndex : 0,
            spriteIndex : [0 ,27 , 57,90, 127, 157],
            mobIndex : [ -5, 30,68,105, 140,178, 215, 255],
            policeIndex : [0 ,25, 55,88, 125, 155, 188, 225, 255, 288],

            directionTick : 0,
            directionChangeWait : 500,
            hasTurned : true,            
        }
    }

    checkIsDead = () =>{
        if(this.state.health <= 0){
            this.hasFalled = true
            setTimeout(() =>{
                this.isDead = true
            }, 2000)
        }
    }

    updatePursuit = (showPursuitStar) =>{
        let kill = this.state.kill;
        let policeKills = this.state.policeKills
        let pursuit = this.state.pursuit;
        if(kill > 30 || policeKills > 10){
            pursuit = 5
        }else if(kill > 25 || policeKills > 7){
            pursuit = 4
        }else if(kill > 20 || policeKills > 5){
            pursuit = 3
        }else if(kill > 10 || policeKills > 2){
            pursuit = 2
        }else if(kill > 5 || policeKills > 1){
            pursuit = 1
        }
        this.state.pursuit = pursuit
        showPursuitStar()
    }

    hit = (obj, showPlayersHeart) =>{
        this.onMove= false
        this.isFighting = true
        this.isHitting = true
        this.hitState.tick+= 1
        if(obj){
            if(obj.isPlayer){
                if(this.hitState.tick > this.hitState.tickPerFrame){
                    if(obj.state.health > 0){
                        obj.onMove = false
                        obj.state.health -= 1
                        obj.sprint()
                        obj.checkIsDead()
                        showPlayersHeart(obj.state.health)
                    }
                    this.hitState.tick = 0
                }
            }else{
                obj.onMove = false
                obj.state.health -=1
                obj.checkIsDead()
                if(obj.health <= 0){
                    if(obj.isPolice){
                        this.state.policeKills +=1
                    }
                    this.state.kill += 1
                }
            }         
            if(obj.isPolice && !this.isPolice){
                if(!this.state.pursuit){
                    this.state.pursuit = 1
                }
            }   

            setTimeout(() =>{
                obj.onMove = true
            }, 300)
        }
        
        setTimeout(() =>{
            this.onMove = true
            this.isHitting = false
            if(!this.isPlayer){
                this.isFighting = false
            }
        }, 500)
        
    }

    punch = (checkPeople) =>{
        let punchRange = 1.5
        let personNearBy = checkPeople(this, punchRange)
        
        if(!this.isHitting){
            this.hit(personNearBy)  
        }
        
    }

    drawFalledPose = (sprite) =>{
        return sprite
    }

    drawDeadPose = (sprite) =>{
        return sprite
    }

    drawFightPose = (sprite) =>{
        let state;
        let spriteIndex;
        if(this.isPlayer){
            state = this.punchState
            spriteIndex = this.punchState.spriteIndex
        }else if(this.isPolice){
            state = this.lathiChargeState
            spriteIndex = this.lathiChargeState.spriteIndex
        }
        
        if(this.isHitting){
            this.animateSprite(sprite, state, spriteIndex)
        }      
        return {...sprite, sy : spriteIndex[state.frameIndex]}
    }

    animateSprite = (sprite, state, spriteIndex) =>{
        state.tick++
        if(state.tick > state.tickPerFrame){
            state.tick = 0
            if(state.frameIndex < spriteIndex.length - 1){
                state.frameIndex++
                sprite = {...sprite, sy : spriteIndex[state.frameIndex - 1]}
                return sprite
            }else{
                state.frameIndex = 0
            }
        }
    }

    drawPerson = (sprite) =>{
        let state;
        if(this.isPlayer){
            state = this.playerState;
        }else{
            state = this.pedesterianState;
        }       
        let spriteIndex = state.spriteIndex;  

        if(this.isMob){
            spriteIndex = state.mobIndex
        }else if(this.isPolice){
            spriteIndex = state.policeIndex
        }
        if(this.onMove){
           this.animateSprite(sprite, state, spriteIndex)
        }
        return {...sprite, sy : spriteIndex[state.frameIndex]}
    }

    getInCar = (checkCars) =>{
        let {isCloseToCar, closeCar} = checkCars()   
        if(isCloseToCar && closeCar){
            if(this.isActive){
                this.updateCollisionPosition = false
                this.isActive = false   
            }
            closeCar.updateCollisionPosition = false;
        }    
        return closeCar
    }

    pursuitPlayer = (player, updatePersonPath) =>{
        if(this.isPolice && this.onMove){
            if(player.state.pursuit > 0 && player.state.health > 0){
                let xDiff = player.x - this.x
                let yDiff = player.y - this.y 
                this.direction = Math.atan2(yDiff, xDiff) * 180 / Math.PI + 90
                this.move()
            }else{
                this.move(updatePersonPath)
            }  
        }
    }

    movePerson = (degree, updatePersonPath) =>{
        let friction = this.friction
        if(!this.isPlayer){
            friction = this.pedesterianFriction
        }else{
            this.onMove = true;
        }
        if(this.onMove && !this.isDead){
            this.x += this.velocity * Math.cos(degree * Math.PI / 180) * (1- friction);
            this.y += this.velocity * Math.sin(degree * Math.PI / 180) * (1- friction);
        }
        

        
        if(updatePersonPath){
            setTimeout(() =>{
                updatePersonPath(this)        
            }, 1500)
            
        }
    }

    resetVelocity = (showPlayerStamina) =>{
        if(this.isPlayer){
            this.playerState.tickPerFrame = 8
            this.velocity = 1.5
        }else{
            this.velocity = 1
        }
        this.updateSprint('increase', showPlayerStamina)
    }

    updateSprint = (action, showPlayerStamina) =>{
        let maxSprintValue = this.isPlayer ? 10 : 7
        
        this.sprintState.tick++
        if(this.sprintState.tick > this.sprintState.tickPerFrame){
            this.sprintState.tick = 0
            if(action === 'decrease'){
                if(this.state.sprint <= 0) {
                    this.isRunnable = false;
                }else{
                    this.state.sprint -= 1
                }
                
            }else if(action === 'increase'){
                if(this.state.sprint >= maxSprintValue){
                    this.isRunnable = true
                }else{
                    this.state.sprint += 1
                }
            }
            showPlayerStamina()
        }
        
    }

    sprint = (showPlayerStamina) =>{
        if(this.isRunnable){
            this.playerState.tickPerFrame = 4
            if(this.isPlayer){
                this.velocity = 3
                this.updateSprint('decrease', showPlayerStamina)
            }
        }else{
            this.resetVelocity(showPlayerStamina)
        }     
        if(!this.isPlayer && !this.isPolice){
            this.velocity = 2
            setTimeout(() =>{
                this.velocity = 1
            }, 5000)
        }
    }


    move=(updatePersonPath)=>{
        let degreeOffSet = 270 
        
        if(!this.isPlayer){
            if(this.state.health > 0){
                let degree = this.direction
                if(this.state.health > 0){
                    this.movePerson(degree-90, updatePersonPath)
                }else{
                    this.updateCollisionPosition = false
                }
            }
            
        }else{
            if(this.state.health > 0){
                let degree = getMoveDirection(this.buffer) 
                if(degree || degree === 0){
                    this.isFighting = false
                    this.direction = degree - degreeOffSet
                    if(this.friction > 0){
                        this.friction -= 0.03
                    }
                    this.movePerson(degree, updatePersonPath)
                }else{
                    this.onMove = false;
                    this.friction = 0.9
                }  
            }
        }

    }
}