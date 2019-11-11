class MovingObjController{
    constructor(context, player, left, top, quadrantController, collisionController){
        this.quadrantController = quadrantController
        this.collisionController = collisionController
        this.player = player
        this.left = left
        this.top = top
        this.context = context
        this.quadrantIndex = [0, 0]
    }


    // returns an index from which the pedesterian shall be generated
    // 0 : generate at the left side of the enviroment
    // 1 : generate at the top side of the enviroment
    // 2 : generate at the right side of the enviroment
    // 3 : generate at the bottom side of the enviroment
    checkPathSide= (path, top, left) =>{
        let endLeftSides = Math.abs(left)
        let endTopSides = Math.abs(top)
        let endRightSides = endLeftSides + SCREEN_WIDTH
        let endBottomSides = endTopSides + SCREEN_HEIGHT
        
        let side;

        if(path.x < endLeftSides && path.x + path.width > endLeftSides &&path.orientation === 'horizontal'){
            side = 0
        }else if(path.y < endTopSides && path.y + path.height > endTopSides && path.orientation === 'vertical'){
            side = 1
        }else if(path.x < endRightSides && path.x + path.width > endRightSides && path.orientation === 'horizontal'){
            side = 2
        }else if(path.y < endBottomSides && path.y + path.height > endBottomSides && path.orientation === 'vertical'){
            side = 3
        }
        return side
    }

    spawnedAt = (index) =>{
        return['left', 'top', 'right', 'down'][index]
    }

    // gets available path to generate the pedesterian 
    //  and generate the pedesterian randomly on the random path
    // @ param type : if the obj is a pedesterian or a car
    // @ param top : top shift of the canvas
    // @ param left : left shift of the canvas
    getObjectsSpawnPath = (type, top, left) =>{
        let currentQuadrant = this.quadrantController.getCurrentQuadrant()       
        let quadrantDataList = currentQuadrant.data
        
        let selectedPath = []
        let bottomSides = []
        let leftSides  = []
        let rightSides = []
        let topSides = []

        let pathSideList = [leftSides, topSides, rightSides, bottomSides]
        if(type === 'pedesterian'){
            quadrantDataList.path.map(path => {
                if(!path.isRoad){
                    let side = this.checkPathSide(path, top, left)
                    if(side){
                        pathSideList[side].push(path)
                    }
                }
            })
        }else{
            quadrantDataList.path.map(path => {
                if(path.isRoad){
                    let side = this.checkPathSide(path, top, left)
                    if(side){
                        pathSideList[side].push(path)
                    }
                }                
            })
        }       
        
        let spawnedIndex;
        spawnedIndex = Math.round(Math.random() * pathSideList.length)
        if(pathSideList[spawnedIndex]){
            selectedPath = pathSideList[spawnedIndex]
        }
        let pathIndex = Math.round(Math.random() * selectedPath.length - 1)
        return { spawnPath : selectedPath[pathIndex], side : this.spawnedAt(spawnedIndex)}
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

    // direction where the spawned object shall move
    getMoveDir = (spawnSide) =>{
        return{
            top : 180,
            left : 90,
            right : 270,
            down : 0
        }[spawnSide]
    }

    // check if the spawned obj's are inside the render zone
    isInsideRenderZone = (obj, top, left) =>{
        let condition1 =obj.x > Math.abs(left) + SCREEN_WIDTH * 2
        let condition2 =obj.y > Math.abs(top) + SCREEN_HEIGHT * 2
        let condition3 = obj.y + obj.height <  Math.abs(top) - SCREEN_WIDTH * 2
        let condition4 = obj.x + obj.width < Math.abs(left) - SCREEN_WIDTH * 2
        
        if(condition1 || condition2 || condition3 || condition4){
            return false            
        }
        return true
    }

    // returns a midpoint from where the range of the police is measured
    // range is used to detect nearby player with pursuit star 
    // @param obj: item (police or police vehicle) whose middle point needs to be calculated
    getMidPoint =(obj) =>{
        return {
            x : obj.x + obj.width/2,
            y : obj.y + obj.height/2
        }
    }

    // check if item 1 is close to item 2
    // @param radius: range to measure close by
    isNearBy = (item1, item2, radius) =>{
          var xDiff = ((item1.x) - (item2.x))**2
          var yDiff = ((item1.y) - (item2.y))**2
          if(Math.sqrt(xDiff + yDiff ) <= (radius)){
            return true
          }
          return false;
    }

    // returns path of the player or pedesterian at where they stand
    getObjPath = (obj) =>{
        let currentPath =this.quadrantController.content.path.filter(pathItem => {
            return this.collisionController.checkCollision(pathItem, obj)
        })[0]
        return currentPath
    }

    // changes move direction of the obj based of obj move degree and collision place
    changeDirection = (obj) =>{
        let currentPath = obj.currentPath

        if(!obj.isPlayer && !obj.isPlayerCar){   

            if(currentPath.isRightJunction || currentPath.isLeftJunction){
                
                let collisionPlace = this.collisionController.getCollisionPlace(currentPath, obj)
                let direction ;

                switch(collisionPlace){
                    case 'top':
                        if(obj.direction === 180){
                            direction = 90
                        }else if(obj.direction === 90){
                            direction = Math.random() > 0.5 ? 0: 180
                        }else if(obj.direction === 270){
                            direction = Math.random() > 0.5 ? 0: 180
                        }
                        break;
                    
                    case 'left':
                        if(obj.direction === 0){
                            direction = Math.random() > 0.5 ? 270: 90
                        }else if(obj.direction === 90){
                            direction = Math.random() > 0.5 ? 0: 180
                        }else if(obj.direction === 180){
                            direction = Math.random() > 0.5 ? 270: 90
                        }
                        break;

                    case 'right':
                        if(obj.direction === 0){
                            direction = Math.random() > 0.5 ? 270: 90
                        }else if(obj.direction === 90){
                            direction = Math.random() > 0.5 ? 0: 180
                        }else if(obj.direction === 180){
                            direction = Math.random() > 0.5 ? 270: 90
                        }
                        break;

                    case 'bottom':
                        if(obj.direction === 0){
                            direction = 90
                        }else if(obj.direction === 270){
                            direction = Math.random() > 0.5 ? 0: 180
                        }else if(obj.direction === 90){
                            direction = Math.random() > 0.5 ? 0: 180
                        }
                        break                    
                }
                
                
                if(collisionPlace){
                    let recentJunction = obj.recentJunction
                    if(recentJunction.isRightJunction !== currentPath.isRightJunction || 
                        recentJunction.isLeftJunction !== currentPath.isLeftJunction){
                        if(direction){
                            obj.direction = direction
                            recentJunction.isRightJunction = obj.currentPath.isRightJunction
                            recentJunction.isLeftJunction = obj.currentPath.isLeftJunction
                        }
                        
                    }                    
                }
            }
        }
    }

    // check next path the player is about to move to and assign the path to the player
    updateObjPath =(obj) =>{
        if(obj.currentPath){

            let nextPath = this.quadrantController.content.path[obj.currentPath.id + 1]
            
            let currentPath;
            if(nextPath && this.collisionController.checkCollision(nextPath, obj)){
                currentPath = nextPath
            }else{
                currentPath = this.getObjPath(obj, this.quadrantController.content)
            }
            if(currentPath){
                obj.currentPath = currentPath
            }
            if(obj.currentPath.isLeftJunction || obj.currentPath.isRightJunction){
                this.changeDirection(obj)
            }else{
                obj.initJunctionBuffer()
            }

        }else{
            obj.currentPath = this.getObjPath(obj, this.quadrantController.content)
        }
    }

    //  returns a direction degree where the obj shall move 
    // upon encountering left or right junction
    getObjDirection = (path, currentDirection) =>{
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
}