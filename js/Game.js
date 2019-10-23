class Game{
    constructor(mainContainer){
        this.mainContainer = mainContainer;
        this.createScreen()
    }

    createScreen = () =>{
        // this.mainContainer.style.width = SCREEN_WIDTH + 'px'
        // this.mainContainer.style.height = SCREEN_HEIGHT + 'px'
        this.canvas = document.createElement('canvas')
        this.context = this.canvas.getContext('2d')
        this.canvas.setAttribute('class', 'game-canvas')
        this.mainContainer.appendChild(this.canvas)
        this.createEnviroment()
    }
    
    createEnviroment = () =>{
        this.enviroment = new Enviroment(this.context, this.canvas)
        
    }

    
    run = () =>{
        this.enviroment.update()
        window.requestAnimationFrame(this.run)
    }

}
let mainElement = document.getElementsByClassName('game-container')[0]
let game = new Game(mainElement)
game.run()