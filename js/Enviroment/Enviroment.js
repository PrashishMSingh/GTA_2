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
        this.quadrantList = []
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
            this.quadrantList.push(vQuadrant)            
        }
        
    }

    createQuadrant = () =>{

        // let quadrant = new Quadrant(this.canvas, this.context, quadrantData[0][0], this.player)
        //         quadrant.create()
        this.quadrantList.map(quadrantData =>{
            quadrantData.map(data =>{
                let quadrant = new Quadrant(this.canvas, this.context, data, this.player)
                quadrant.create()
                
            })
        })
    }

    update = () =>{
        this.context.clearRect(0, 0, SCREEN_WIDTH * this.rowCount, SCREEN_HEIGHT * this.colCount)
        this.createQuadrant()
        
        this.player.move()
        this.player.draw()
        
        this.move()
        this.draw()
    }    
}