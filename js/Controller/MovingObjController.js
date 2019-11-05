class MovingObjController{
    constructor(context, player, left, top, quadrantController, collisionController){
        this.quadrantController = quadrantController
        this.collisionController = collisionController
        this.player = player
        this.left = left
        this.top = top
        this.context = context
    }


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

    getObjectsSpawnPath = (type, top, left) =>{
        let index = this.quadrantController.getCurrentQuadrant().quadrantIndex
        let quadrantDataList = this.quadrantController.quadrantDataList[index[0]][index[1]]

        let spawnedIndex;

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
        spawnedIndex = Math.round(Math.random() * pathSideList.length)
        if(pathSideList[spawnedIndex]){
            selectedPath = pathSideList[spawnedIndex]
        }
        let pathIndex = Math.round(Math.random() * selectedPath.length - 1)
        return { spawnPath : selectedPath[pathIndex], side : this.spawnedAt(spawnedIndex)}
    }

    getMoveDir = (spawnSide) =>{
        return{
            top : 180,
            left : 90,
            right : 270,
            down : 0
        }[spawnSide]
    }

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

    getObjPath = (obj) =>{
        let currentPath =this.quadrantController.content.path.filter(pathItem => {
            return this.collisionController.checkCollision(pathItem, obj)
        })[0]
        return currentPath
    }

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

    updateObjPath =(obj) =>{
        if(obj.currentPath){

            let nextPath = this.quadrantController.content.path[obj.currentPath.id + 1]

            let currentPath;
            if(this.collisionController.checkCollision(nextPath, obj)){
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