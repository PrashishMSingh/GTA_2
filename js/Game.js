class Game{
    constructor(mainContainer){
        this.mainContainer = mainContainer;
        this.createGameHeader()
        this.createScreen()
    }

    

    createGameHeader = () =>{
        this.gameContainer = document.getElementsByClassName('game-container')[0]
        this.gameHeader = document.getElementsByClassName('game-info-wrapper')[0]
        this.playerInfo = this.gameHeader.getElementsByClassName('player-info')[0]
        this.playerImage = this.playerInfo.getElementsByClassName('player-image')[0]
        this.healthSprintDiv = this.playerInfo.getElementsByClassName('health-sprint-bar')[0]
        this.healthBar = this.healthSprintDiv.getElementsByClassName('health-bar')[0]
        this.sprintBar = this.healthSprintDiv.getElementsByClassName('sprint-bar')[0]        
        this.pursuitBar = this.gameHeader.getElementsByClassName('pursuit-bar')[0]
        this.moneyBar = this.gameHeader.getElementsByClassName('money-bar')[0]
        this.startMenu = document.getElementsByClassName('start-menu')[0]
        this.startBtn = document.getElementsByClassName('startBtn')[0]
    }


    createScreen = () =>{
        this.canvas = document.createElement('canvas')
        this.context = this.canvas.getContext('2d')
        this.canvas.setAttribute('class', 'game-canvas')
        this.mainContainer.appendChild(this.canvas)
        this.createEnvironment()
    }
    
    createEnvironment = () =>{
        this.environment = new Environment(this.context, this.healthBar, this.sprintBar, this.moneyBar, this.pursuitBar, this.canvas)
    }

    addPlayer = (player) =>{
        this.player = player
        this.player.context = this.context
        this.environment.addPlayer(this.player)
    }

    run = () =>{
        if(this.player ){
            if(this.player.isDead){
                this.stop()
            }else{
                this.environment.update()
                this.gameHeader.style.display = 'block'
                this.gameContainer.style.display = 'block'
                this.startMenu.style.display = 'none'
                window.requestAnimationFrame(this.run)
            }
            
        }
        
    }

    stop = () =>{
        this.gameHeader.style.display = 'none'
        this.gameContainer.style.display = 'none'
        this.startMenu.style.display = 'block'
    }

    startGame = () =>{
        if(this.player){
            if(this.player.isDead){
                this.environment.top = 0
                this.environment.left = 0
                let xPos = 160
                let yPos = 80
                this.player.initState()
                this.player.x = xPos
                this.player.y = yPos

                this.player.state.health = 10
                this.player.hasFalled = false
                this.player.isDead = false;
                this.environment.showPlayersHeart()
            }
        }
        this.run()
    }

}

let mainElement = document.getElementsByClassName('game-container')[0]
let game = new Game(mainElement)

let xPos = 160
let yPos = 80
let playerHeight = 30
let playerWidth = 30
let player = new Person(this.context, xPos, yPos, playerWidth, playerHeight, this.playerVelocity, true, 180)   

game.startBtn.addEventListener('click', () =>game.startGame())
game.addPlayer(player) 
// game.run()