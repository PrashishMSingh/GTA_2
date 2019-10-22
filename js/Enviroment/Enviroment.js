const SCREEN_PADDING = 60
const SCREEN_WIDTH = 600;
const SCREEN_HEIGHT = 600;

class Enviroment{
    constructor(context, canvas, currentIndex){
        this.canvas = canvas;
        this.context = context;

        if(!currentIndex){
            this.currentIndex = enviromentData.initialQuadrant
        }        
        this.quadrantDataList = []
        this.quadrantList = []
        this.content = {
            building : [],
            fence : [],
            path : []
        }
        this.playerVelocity = 3.5
        this.init()
    }

    init = () =>{
        this.playerDir;
        this.addPlayer()
        this.createEnviroment()
        this.createQuadrant()
        this.initiateEventListener()
        this.top = 0
        this.left = 0
    }

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

    getCollidedPlace = (item) =>{
        let collisionPlace;
        let minDiff = item.width;
        var leftDiff =   item.x + item.width -this.player.x
        var rightDiff = (this.player.x + this.player.width) - item.x
        var bottomDiff = (this.player.y + this.player.height) - item.y
        var topDiff = (item.y + item.height) - this.player.y 


        if( leftDiff < minDiff){
          minDiff = leftDiff
          collisionPlace = 'left'
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

    checkCollision = (item) =>{
        let rightCollision = this.player.x + this.player.width > item.x
        let leftCollision = this.player.x < item.x + item.width
        let topCollision = this.player.y + this.player.height > item.y
        let bottomCollision = this.player.y <  item.y + item.height
        
        if(rightCollision && leftCollision && topCollision && bottomCollision){
            switch(this.getCollidedPlace(item)){
                case 'top':
                    this.player.y = item.y + item.height
                    break;
                case 'right':
                    this.player.x = item.x -this.player.width
                    break;
                case 'bottom':
                    this.player.y = item.y - this.player.height
                    break;
                case 'left':
                    this.player.x = item.x + item.width
                    break;
            }
            return true
        }
        return false;

    }

    hasCollided = () =>{
        let collided = false
        Object.keys(this.content).map(key =>{
            this.content[key].map(item =>{
                if(key ==='building' || key == 'fence'){
                    if(this.checkCollision(item)){
                        collided = true
                    }
                }
            })
        })
        return collided
    }

    

    move = () =>{
        if(this.player.x + this.left > SCREEN_WIDTH/2 && -this.left < this.canvas.width - SCREEN_WIDTH){
            this.left -= this.player.friction * this.player.velocity
        }
        if(this.player.y + this.top> SCREEN_HEIGHT/2 && -this.top < this.canvas.height - SCREEN_HEIGHT){
            this.top  -= this.player.friction * this.player.velocity
        }

        if(this.player.y + this.top < SCREEN_HEIGHT/2 && -this.top > 0){
            this.top  += this.player.friction * this.player.velocity   
        }

        if(this.player.x + this.left < SCREEN_HEIGHT/2 && - this.left > 0){
            this.left  += this.player.friction * this.player.velocity   
        }
            
        
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
                    item.floorList.map(flat => flat.changePrespective(this.player))
                }
                item.draw(color[key])
                })
        })
    }

    addPlayer = () =>{
        let xPos = 160
        let yPos = 0
        let playerHeight = 30
        let playerWidth = 30
        
        this.player = new Person(this.context, xPos, yPos, playerWidth, playerHeight, this.playerVelocity)   
        this.player.draw('red')     
    }

    initiateEventListener = () =>{    
        window.addEventListener('keydown', (e)=>{            
            let keyCode = e.keyCode;
            if(this.player.buffer && !this.player.buffer.includes(keyCode)){
                this.player.buffer.push(keyCode)
            }            
        })

        window.addEventListener('keyup', (e) =>{
            let keyCode = e.keyCode
            let index = this.player.buffer.indexOf(keyCode)
            
            if(index !== -1){
                this.player.buffer.splice(index, 1)
            }
            if(!this.player.buffer.length){
                this.player.friction = 0.80
            }
        })
    }

    onSideQuadrants = (index) =>{
        let sideQuadrants = {}
        let condition1 = this.currentIndex[index] > 1;
        // check if index is a col or a row
        let condition2 = index ? this.currentIndex[index] < enviromentData.colCount-1 : this.currentIndex[index] < enviromentData.rowCount-1;
        
        if(!condition1){
            index? sideQuadrants['left'] = false : sideQuadrants['top'] = false;
        }
        if(!condition2){
            index? sideQuadrants['right'] = false : sideQuadrants['bottom'] = false;
        }
        return sideQuadrants;
    }


    createEnviroment = () =>{
        let quadrantCount = (enviromentData.quadrantrenderRange * 2) + 1;
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

    updateContent = (content, i, j) =>{
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

    update = () =>{
        this.context.clearRect(0, 0, SCREEN_WIDTH * this.rowCount, SCREEN_HEIGHT * this.colCount)
        let index = this.getQuadrantIndex()
        let quadrant = this.quadrantList[index.row][index.col]
        if(!this.hasCollided()){
            this.player.move()
            this.move()
        }

        // this.createQuadrant()
        this.draw()
        this.player.draw()
    }    

}