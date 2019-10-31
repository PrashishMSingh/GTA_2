const SCREEN_PADDING = 60
const SCREEN_WIDTH = 600;
const SCREEN_HEIGHT = 600;

class Environment{
    constructor(context, healthBar, sprintBar, moneyBar, pursuitBar, canvas, currentIndex){
        this.canvas = canvas;
        this.healthBar = healthBar;
        this.sprintBar = sprintBar;
        this.moneyBar = moneyBar;
        this.pursuitBar = pursuitBar;
        this.context = context;
        this.createMobProb = 0.2

        this.createPedesterianProb = 0.8

        if(!currentIndex){
            this.currentIndex = environmentData.initialQuadrant
        }        
        this.quadrantDataList = []
        this.quadrantList = []
        this.content = {
            fence : [],
            parking: [],
            path : [],
            car : [],
            building : [],
            pedesterian : [],
            player : []
        }
        
        this.playerVelocity = 1.5
        this.playersCar;
        this.pursuitDuration = 500
        this.init()
    }   

    init = () =>{
        this.playerDir;
        this.createEnvironment()
        this.createQuadrant()
        this.initiateEventListener()
        this.top = 0
        this.left = 0
        this.pedesterianState = {
            generationTime : 100,
            timer : 0,
            maxPedesterian : 20
        },
        this.coolDownState = {
            tick : 0,
            tickPerFrame : 500
        }
        this.changeDirState = {
            tick : 0,
            tickPerFrame : 120
        }
    }

    // fas fa-bolt
    showPlayerStamina = () =>{
        this.sprintBar.innerHTML = ''
        let ul = document.createElement('ul')
        for(var i =0; i <this.player.state.sprint; i++){
            let li = document.createElement('li')
            let sprintIcon = document.createElement('i')
            sprintIcon.setAttribute('class', 'fas fa-bolt')
            sprintIcon.style.color = '#3498DB'
            li.appendChild(sprintIcon)
            ul.appendChild(li)
        }
        this.sprintBar.appendChild(ul)
    }

    showPlayersHeart=(heartCount) =>{
        this.healthBar.innerHTML = ''
        if(!heartCount){
            heartCount = this.player.state.health
        }
        let ul = document.createElement('ul');
        for(var i = 0; i < heartCount; i++){
            let li = document.createElement('li')
            let heartIcon = document.createElement('i')
            heartIcon.setAttribute('class', 'fas fa-heart');
            heartIcon.style.color = 'red'
            li.appendChild(heartIcon)
            ul.appendChild(li)
        }
        this.healthBar.appendChild(ul)
    }

    showPursuitStar = () =>{
        this.pursuitBar.innerHTML = ''
        let startUl = document.createElement('ul')
        for(var i = 0; i< this.player.state.pursuit; i++){
            let li = document.createElement('li')
            let icon = document.createElement('i')
            icon.setAttribute('class', 'fas fa-star')
            icon.style.color = '#F5D106'
            li.appendChild(icon)
            startUl.appendChild(li)
        }
        this.pursuitBar.appendChild(startUl)
    }

    showPlayerBalance = () =>{
        this.moneyBar.innerText = this.player.state.money
    }

    /*
    * @param car : this car the player has currently entered
    * Sets the reference to the car the user is currently in for the enviroment
    */
    setActiveCar = (car) =>{
        this.activeCar = car
    }

    addPlayer = (player) =>{
        this.player = player
        this.player.state.health = 10
        // this.player.state.pursuit = 2;
        if(!this.player.currentPathId){
            this.player.currentPath = this.getPersonPath(this.player);
        }
        this.content.player.push(player)
        this.showPlayersHeart()
        this.showPlayerBalance()
        this.showPlayerStamina()
        this.showPursuitStar()
    }

    // get the index of the quadrant the user is currently at
    getQuadrantIndex = () =>{
        let col = 0;
        let row = 0
        for(var i = 0; i< this.quadrantList.length; i++){
            if(this.player.x >SCREEN_WIDTH * i && this.player.x < SCREEN_WIDTH * (i + 1)){
                col = i;
            }   
            if(this.player.y > SCREEN_HEIGHT * i && this.player.y < SCREEN_HEIGHT * (i + 1)){
                row = i
            }
        }
        return {row : row, col : col}
    }

    spawnedAt = (index) =>{
        return['left', 'top', 'right', 'down'][index]
    }

    getPedestrianSpawnPath = () =>{
        let index = this.getQuadrantIndex()
        let quadrantDataList = this.quadrantDataList[index.row][index.col]
        let endLeftSides = Math.abs(this.left)
        let endTopSides = Math.abs(this.top)

        let endRightSides = endLeftSides + SCREEN_WIDTH
        let endBottomSides = endTopSides + SCREEN_HEIGHT

        let leftSidePaths = quadrantDataList.path.filter(path => !path.isRoad && path.x < endLeftSides && path.x + path.width > endLeftSides &&path.orientation === 'horizontal')
        let topSidePaths = quadrantDataList.path.filter(path => !path.isRoad && path.y < endTopSides && path.y + path.height > endTopSides && path.orientation === 'vertical')
        
        let rightSidePaths = quadrantDataList.path.filter(path => !path.isRoad && path.x < endRightSides && path.x + path.width > endRightSides && path.orientation === 'horizontal')
        let bottomSidePaths = quadrantDataList.path.filter(path => !path.isRoad && path.y < endBottomSides && path.y + path.height > endBottomSides && path.orientation === 'vertical')
        
        let pathSideList = [leftSidePaths, topSidePaths, rightSidePaths, bottomSidePaths]
        let selectedPath = []
        let spawnedIndex;
        
        spawnedIndex = Math.round(Math.random() * pathSideList.length)

        if(pathSideList[spawnedIndex]){
            selectedPath = pathSideList[spawnedIndex]
        }
        let pathIndex = Math.round(Math.random() * selectedPath.length - 1)
        return { spawnPath : selectedPath[pathIndex], side : this.spawnedAt(spawnedIndex)}
    }

    generatePedesterian = () =>{
        this.pedesterianState.timer+=1
        if(this.pedesterianState.timer > this.pedesterianState.generationTime){
            this.pedesterianState.timer = 0
            if(this.content.pedesterian.length < this.pedesterianState.maxPedesterian){
                let {spawnPath, side} = this.getPedestrianSpawnPath()
                if(spawnPath){
                    let direction;
                    switch(side){
                        case 'top':
                            direction = 180
                            break;
                        
                        case 'left':
                            direction = 90
                            break;
                        
                        case 'right' : 
                            direction = 270
                            break;
                        
                        case 'down':
                            direction = 0
                    }
                    let pedesterian = new Person(this.context, spawnPath.x, spawnPath.y, 30, 30, 0.5, false, direction)
                    pedesterian.onMove = true
                    pedesterian.isMob = Math.random() < this.createMobProb ? true : false
                    if(!pedesterian.isMob){
                        pedesterian.isPolice = Math.random() < this.createPedesterianProb ? false : true
                    }
                    this.content.pedesterian.push(pedesterian)
                }               
            }
        }
    }

    getPersonPath = (person) =>{
        let currentPath =this.content.path.filter(pathItem => {
            return this.checkCollision(pathItem, person)
        })[0]
        return currentPath
    }

    updatePersonPath =(person) =>{
        if(person.currentPath){
            let currentPath = person.currentPath
            let currentPathId = currentPath.id
            let nextPath = this.content.path[currentPathId + 1]
            if(this.checkCollision(nextPath, person)){
                currentPath = nextPath
            }else{
                currentPath = this.getPersonPath(person)
            }
            person.currentPath = currentPath

            if(currentPath && !person.isPlayer){
                this.changeDirState.tick++
                if(this.changeDirState.tick > this.changeDirState.tickPerFrame){
                    this.changeDirState.tick = 0
                    person.direction = this.getPersonDirection(currentPath, person.direction)
                }                
            }
        }else{
            person.currentPath = this.getPersonPath(person)
        }
    }

    getPersonDirection = (path, currentDirection) =>{
        let direction = currentDirection
        if(path.isRightJunction){
            switch(currentDirection){
                case 180:
                    direction = 90
                    break

                case 90:
                    direction = 180
                    break;
                
                case 270:
                    direction = 0
                    break;
                
                case 0:
                    direction = 90
                    break;
            }
        }
        else if(path.isLeftJunction){
            switch(currentDirection){
                case 180:
                    direction = 90
                    break

                case 90:
                    direction = 180
                    break;
                
                case 270:
                    direction = 180
                    break;
                
                case 0:
                    direction = 90
                    break;
            }
        }
        return direction
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

    changePedesterianDirection = (obj,item, collisiontType) =>{
        if(obj instanceof Person){
            if(!obj.isPlayer){
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

    updateCollidedPlace = (item, obj) =>{
        let collisionPlace = this.getCollisionPlace(item, obj)
        
        switch(collisionPlace){
            case 'left':
                obj.x = item.x + item.width
                this.changePedesterianDirection(obj, item, 'horizontal')
                break;
            
            case 'right':
                obj.x = item.x -obj.width
                this.changePedesterianDirection(obj, item, 'horizontal')
                break
            
            case 'bottom':
                obj.y = item.y - obj.height
                this.changePedesterianDirection(obj, item, 'vertical')
                break;
            
            case 'top':
                obj.y = item.y + item.height
                this.changePedesterianDirection(obj, item, 'vertical')
        }  
    }

    objectItemCollision = (item, obj ) =>{
        obj.pedesterianState.hasFallen = true
        obj.updateCollisionPosition = false
        obj.onMove = false
        obj.hasFallen = true
        item.updateCollisionPosition = false
        setTimeout(() =>{
            if(obj.pedesterianState.hasFallen){
                if(obj.state.health > 0){
                    obj.state.health -= 1
                    obj.checkIsDead()
                    obj.hasFallen = false
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
                            obj.hit(item, this.showPlayersHeart)
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

    hasCollided = (obj) =>{
        let collided = false
        Object.keys(this.content).map(key =>{
            this.content[key].map(item =>{

                if(obj instanceof Car){
                    if(key ==='building'){
                        if(this.checkCollision(item, obj)){
                            collided = true
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

    initiateEventListener = () =>{    
        window.addEventListener('keydown', (e)=>{        
            e.preventDefault()    
            let keyCode = e.keyCode;
            if(!this.player.buffer.includes(keyCode)){
                this.player.buffer.push(keyCode)
            }
            if(this.playersCar && !this.playersCar.buffer.includes(keyCode)){
                let hasPressedUpAndDown = this.playersCar.buffer.includes(40) && keyCode === 38 || this.playersCar.buffer.includes(38) && keyCode === 40
                let hasPressedLeftAndRight = this.playersCar.buffer.includes(37) && keyCode === 39 || this.playersCar.buffer.includes(39) && keyCode === 37

                if(!hasPressedLeftAndRight && !hasPressedUpAndDown){
                    this.playersCar.buffer.push(keyCode)
                }
            }
            if(keyCode === 70 || keyCode === 13){
                if(!this.playersCar){
                    this.playersCar = this.player.getInCar(this.checkCars)  
                }else{
                    this.player.isActive = true
                    this.player.updateCollisionPosition = true
                    this.playersCar.updateCollisionPosition = true
                    this.playersCar = undefined                    
                }
            }

        })

        window.addEventListener('keyup', (e) =>{
            e.preventDefault()
            let keyCode = e.keyCode
            let index = this.player.buffer.indexOf(keyCode)
            
            if(index !== -1){
                this.player.buffer.splice(index, 1)
                if(this.playersCar){
                    this.playersCar.buffer.splice(index, 1)
                }
                this.player.resetState()
            }
        })
    }

    getMidPoint =(obj) =>{
        return {
            x : obj.x + obj.width/2,
            y : obj.y + obj.height/2
        }
    }

    isNearBy = (item1, item2, radius) =>{
          var xDiff = ((item1.x) - (item2.x))**2
          var yDiff = ((item1.y) - (item2.y))**2
          if(Math.sqrt(xDiff + yDiff ) <= (radius)){
            return true
          }
          return false;
    }

    isPlayerNearby = (police, range) =>{
        let playerCords = this.getMidPoint(this.player)
        let policeCords = this.getMidPoint(police)
        let nearBy = this.isNearBy(playerCords, policeCords, police.width * range)
        police.onPursuite = nearBy
        if(nearBy){
            return true
        }
        return false
    }

    checkPeople = (player, range = 1) =>{
        let playerCords = this.getMidPoint(player)
        let person = this.content['pedesterian'].filter(person=>{
           let personCords = this.getMidPoint(person)
           return this.isNearBy(playerCords, personCords, this.player.width * range)
            
        })[0]
        return person
    }

    checkCars = () =>{
        let isCloseToCar = false
        let closeCar;
        this.content['car'].map(car =>{
            
            // car left to the player
            let checkBottomDistance = Math.abs(this.player.y - car.y - car.height);
            let checkTopDistance = Math.abs(this.player.y + this.player.height - car.y);
            let minDiff = car.width + this.player.width

            let leftAndRightCondition = this.player.x > car.x  && this.player.x+this.player.width < car.x+car.width
            let upAndDownCondition = this.player.y > car.y && this.player.y + this.player.height < car.y + car.height
            
            let getInCondition = car.state.orientation === 'horizontal' ? leftAndRightCondition : upAndDownCondition

            if(getInCondition){
                if(checkTopDistance < minDiff || checkBottomDistance < minDiff){
                    isCloseToCar = true;
                    closeCar = car
                }
            }
        })
        return {
            isCloseToCar,
            closeCar
        }
    }

    onSideQuadrants = (index) =>{
        let sideQuadrants = {}
        let condition1 = this.currentIndex[index] > 1;
        // check if index is a col or a row
        let condition2 = index ? this.currentIndex[index] < environmentData.colCount-1 : this.currentIndex[index] < environmentData.rowCount-1;
        
        if(!condition1){
            index? sideQuadrants['left'] = false : sideQuadrants['top'] = false;
        }
        if(!condition2){
            index? sideQuadrants['right'] = false : sideQuadrants['bottom'] = false;
        }
        return sideQuadrants;
    }

    createEnvironment = () =>{
        let quadrantCount = (environmentData.quadrantRenderRange * 2) + 1;
        let rowInd = 0;
        let colInd = 1;
        
        this.rowCount = this.onSideQuadrants(rowInd) ? quadrantCount - 1 : quadrantCount;
        this.colCount = this.onSideQuadrants(colInd) ? quadrantCount - 1 : quadrantCount;

        this.canvas.setAttribute('width', SCREEN_WIDTH * this.colCount)
        this.canvas.setAttribute('height', SCREEN_HEIGHT * this.rowCount)

        for(let row = 0; row < this.rowCount; row++){
            let vQuadrant = []
            for(let col = 0; col < this.colCount; col ++){
               vQuadrant.push(quadrantData[row][col]) 
            }
            this.quadrantDataList.push(vQuadrant)            
        }
    }

    // add content from all the quadrants in a single list for collision
    updateContent = (content) =>{
        Object.keys(content).map(key =>{
            this.content[key] = this.content[key].concat(content[key])
        })
        
    }

    createQuadrant = () =>{
        this.quadrantDataList.map((quadrantData, i) =>{
            let tempList = []
            quadrantData.map((data, j) =>{
                let quadrant = new Quadrant(this.canvas, this.context, data, this.player)
                this.updateContent(quadrant.create(), i, j)
                tempList.push(quadrant)
            })
            this.quadrantList.push(tempList)
        })
        
    }

   
    checkPursuit = () =>{
        if(this.player.state.pursuit){
            this.coolDownState.tick ++
            if(this.coolDownState.tick > this.coolDownState.tickPerFrame){
                this.coolDownState.tick = 0
                let policeOnPursuite = this.content.pedesterian.filter(people => people.onPursuite)[0]
                if(!policeOnPursuite){
                    this.player.state.pursuit -=1
                }
            }
        }
    }

    updatePlayerAction = () =>{
        let shiftKeyCode = 16
        let punchKeyCode = 88
        if(this.player.buffer.includes(shiftKeyCode)){
            this.player.sprint(this.showPlayerStamina)
        }else{
            this.player.resetVelocity(this.showPlayerStamina)
        }
        if(this.player.buffer.includes(punchKeyCode)){
            this.player.punch(this.checkPeople)
        }
        this.checkPursuit()
        this.player.updatePursuit(this.showPursuitStar)
        
    }

    // Move player environment
    move = () =>{
        let screenShiftSpeed = (1 - this.player.friction) * this.player.velocity
        if(this.player.x + this.left > SCREEN_WIDTH/2 && -this.left < this.canvas.width - SCREEN_WIDTH){
            this.left -= screenShiftSpeed
        }
        if(this.player.y + this.top> SCREEN_HEIGHT/2 && -this.top < this.canvas.height - SCREEN_HEIGHT){
            this.top  -= screenShiftSpeed
        }

        if(this.player.y + this.top < SCREEN_HEIGHT/2 && -this.top > 0){
            this.top  += screenShiftSpeed  
        }

        if(this.player.x + this.left < SCREEN_HEIGHT/2 && - this.left > 0){
            this.left  += screenShiftSpeed
        }        
        this.generatePedesterian()
    }

    updatePedesterianMove = () =>{
        this.content.pedesterian.map(pedesterian =>{
            let condition1 =pedesterian.x > Math.abs(this.left) + SCREEN_WIDTH * 2
            let condition2 = pedesterian.y > Math.abs(this.top) + SCREEN_HEIGHT * 2
            if(condition1 || condition2){
                this.content.pedesterian = this.content.pedesterian.filter(indivisual => indivisual !== pedesterian)
            }else{
                if(!pedesterian.pedesterianState.hasFallen && pedesterian.state.health > 0){
                    pedesterian.move(this.updatePersonPath)
                    let checkRange = 10
                    
                    if(pedesterian.isPolice && this.player.state.pursuit > 0 && this.isPlayerNearby(pedesterian, checkRange)){
                        pedesterian.pursuitPlayer(this.player, this.updatePersonPath)
                    }
                    // pedesterian.onMove = true
                }
                this.hasCollided(pedesterian)
            }   
        })
        
    }

    draw = () =>{
        this.canvas.style.top = this.top + 'px'
        this.canvas.style.left = this.left + 'px'

        let color = {
            // building : 'blue',
            fence : 'yellow',
            path : 'grey'
        }

        Object.keys(this.content).map(key =>{
            
            this.content[key].map(item =>{
                if(key === 'building'){
                    item.floorList.map(flat => flat.changePerspective(this.player))
                }
                if(key === 'player'){
                    if(this.content[key].isActive){
                        item.draw()
                    }
                }else{
                    item.draw(color[key])
                }
                
                })
        })
        this.updatePedesterianMove()
    }

    update = () =>{
        this.context.clearRect(0, 0, SCREEN_WIDTH * this.rowCount, SCREEN_HEIGHT * this.colCount)
           
        if(this.playersCar) {
            if(!this.hasCollided(this.playersCar)){ 
                this.player.velocity = this.playersCar.velocity  
                this.player.friction = this.playersCar.friction          
                this.playersCar.move()  
                this.player.x = this.playersCar.x
                this.player.y = this.playersCar.y
            }
        }else{
            if(!this.hasCollided(this.player)){ 
                this.updatePlayerAction()
                this.player.move(this.updatePersonPath)
            }
        }
        
        this.move()
        this.draw()

        if(this.player.isActive){
            this.player.draw()
        }
        
    }    

}