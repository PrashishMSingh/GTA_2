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
        
        this.hasPoliceCar = false

        if(!currentIndex){
            this.currentIndex = environmentData.initialQuadrant
        }        
        this.quadrantDataList = []
        this.quadrantList = []
        
        
        this.playerVelocity = 1.5
        this.playersCar;
        this.pursuitDuration = 500
        this.tempPath = {
            isRightJunction : false,
            isLeftJunction : false
        }
        this.init()
    }   

    init = () =>{
        this.playerDir;
        this.initiateEventListener()
        
        this.top = 0
        this.left = 0
    }

    addPlayer = (player) =>{
        this.player = player
        this.player.state.health = 10
        this.instantiateEnviroment()
    }

    instantiateEnviroment = () =>{
        this.generateQuadrants()
        this.instantiateUIController()
        this.collisionController = new CollisionController(this.player, this.uiController, this.quadrantController)        
        this.movingObjController = new MovingObjController(this.context, this.player, this.left, this.top, this.quadrantController, this.collisionController)
        this.quadrantController.content.player.push(this.player)
        
    }

    generateQuadrants = () =>{
        this.quadrantController = new QuadrantController(this.context, this.player)
        this.quadrantController.renderQuadrants(this.setCanvasSize)
    }

    setCanvasSize = (width, height) =>{
        this.canvas.setAttribute('width', width)
        this.canvas.setAttribute('height', height)
    }

    instantiateUIController = () =>{
        this.uiController = new UIController(this.player, this.healthBar, this.sprintBar, this.pursuitBar, this.moneyBar)
        this.uiController.showPlayersHeart()
        this.uiController.showPlayerBalance()
        this.uiController.showPlayerStamina()
        this.uiController.showPursuitStar()
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
                    this.playersCar = this.player.getInCar(this.movingObjController.checkCars)  
                }else{
                    this.player.isActive = true
                    this.player.updateCollisionPosition = true
                    this.playersCar.updateCollisionPosition = true
                    this.playersCar.isPlayerCar = false
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

    

    /*
    * @param car : this car the player has currently entered
    * Sets the reference to the car the user is currently in for the enviroment
    */
    setActiveCar = (car) =>{
        this.activeCar = car
    }

    update = () =>{
        this.context.clearRect(0, 0, SCREEN_WIDTH * this.rowCount, SCREEN_HEIGHT * this.colCount)
        if(this.playersCar) {
            if(!this.collisionController.hasCollided(this.playersCar, this.quadrantController.content)){ 
                this.playersCar.move()  
                this.player.x = this.playersCar.x
                this.player.y = this.playersCar.y
                this.player.velocity = this.playersCar.velocity  
                this.player.friction = this.playersCar.friction      
            }
        }else{
            if(!this.collisionController.hasCollided(this.player, this.quadrantController.content)){ 
                this.player.move(this.movingObjController.updateObjPath)
            }
        }
        this.updateObjAction()
        this.updateEnviroment()                

        this.move()
        this.draw()

        if(this.player.isActive){
            this.player.draw()
        }
        
    }  

    updateObjAction = () =>{
        let shiftKeyCode = 16
        let punchKeyCode = 88
        if(this.player.buffer.includes(shiftKeyCode)){
            this.player.sprint(this.uiController.showPlayerStamina)
        }else{
            this.player.resetVelocity(this.uiController.showPlayerStamina)
        }
        if(this.player.buffer.includes(punchKeyCode)){
            this.player.punch(this.movingObjController.checkPeople)
            this.player.updatePursuit(this.uiController.showPursuitStar)
        }
        this.movingObjController.checkPursuit()
        this.movingObjController.updatePedesterianMove(this.top, this.left)
        this.movingObjController.updateCarMove(this.top, this.left)
        this.player.updatePursuit(this.uiController.showPursuitStar)
    }


    updateEnviroment = () =>{
        let requireUpdate = this.quadrantController.hasQuadrantChanged()
        if(requireUpdate){
            this.quadrantController.renderQuadrants(this.setCanvasSize)
        }
    }  

    // Move player environment
    move = () =>{
        let obj = this.player
        let screenShiftSpeed = Math.abs(obj.velocity * (1 - obj.friction))
        if(this.playersCar){
            obj = this.playersCar
            screenShiftSpeed = Math.abs(obj.velocity * (1 - obj.friction))* 2
        }

        if(obj.x + this.left > SCREEN_WIDTH/2 && -this.left < this.canvas.width - SCREEN_WIDTH){
            this.left -= screenShiftSpeed
        }
        if(obj.y + this.top> SCREEN_HEIGHT/2 && -this.top < this.canvas.height - SCREEN_HEIGHT){
            this.top  -= screenShiftSpeed
        }

        if(obj.y + this.top < SCREEN_HEIGHT/2 && -this.top > 0){
            this.top  += screenShiftSpeed  
        }

        if(obj.x + this.left < SCREEN_HEIGHT/2 && - this.left > 0){
            this.left  += screenShiftSpeed
        }    
        this.movingObjController.generatePedesterian(this.top, this.left, this.getItemCount, this.addToContent)
        this.movingObjController.generatePedesterianCar(this.top, this.left, this.getItemCount, this.addToContent)
    }

    draw = () =>{
        this.canvas.style.top = this.top + 'px'
        this.canvas.style.left = this.left + 'px'
        this.quadrantController.draw()
    }
}