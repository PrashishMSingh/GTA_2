class Game{
    constructor(mainContainer){
        this.mainContainer = mainContainer;
        this.createGameHeader()
        this.createScreen()
    }

    createGameHeader = () =>{
        this.gameHeader = document.getElementsByClassName('game-info-wrapper')[0]
        this.playerInfo = this.gameHeader.getElementsByClassName('player-info')[0]
        this.playerImage = this.playerInfo.getElementsByClassName('player-image')[0]
        this.healthSprintDiv = this.playerInfo.getElementsByClassName('health-sprint-bar')[0]
        this.healthBar = this.healthSprintDiv.getElementsByClassName('health-bar')[0]
        this.sprintBar = this.healthSprintDiv.getElementsByClassName('sprint-bar')[0]        
        this.pursuitBar = this.gameHeader.getElementsByClassName('pursuit-bar')[0]
        this.moneyBar = this.gameHeader.getElementsByClassName('money-bar')[0]
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
        player.context = this.context
        this.environment.addPlayer(player)
    }

    run = () =>{
        this.environment.update()
        window.requestAnimationFrame(this.run)
    }

}

let mainElement = document.getElementsByClassName('game-container')[0]
let game = new Game(mainElement)

let xPos = 160
let yPos = 80
let playerHeight = 30
let playerWidth = 30
let player = new Person(this.context, xPos, yPos, playerWidth, playerHeight, this.playerVelocity, true, 180)   
game.addPlayer(player) 
game.run()