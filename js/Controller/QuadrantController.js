class QuadrantController{
    constructor(context, player){
        this.currentIndex = environmentData.initialQuadrant
        this.quadrantDataBuffer = []
        this.quadrantList = []
        this.player = player,
        this.context = context,
        this.currentRenderIndex = []
        this.initContent()
        
    }

    initContent = () => {
        this.content = {
            fence : [],
            parking: [],
            path : [],
            pedesterian : [],
            car : [],
            building : [],
            player : []
        }
    }

    resetContent = () =>{
        Object.keys(this.content).map(key =>{
            if(key !== 'player' && key !== 'pedesterian' ){
                if(key === 'car'){
                    if(!this.content[key].isPlayerCar){
                        this.content[key] = this.content[key].filter(car => car.onMove)
                    }
                }else{
                    this.content[key] = []
                }                
            }
        })
    }

    onSideQuadrants = (index) =>{
        let sideQuadrants = {}
        let condition1 = this.currentIndex[index] === 0;
        
        // check if index is a col or a row
        // if false it is a column else it is a row
        let condition2 = index ? this.currentIndex[index] === environmentData.colCount - 1 : this.currentIndex[index] === environmentData.rowCount - 1;
        
        // check if the user is at the initial index
        if(condition1){
            return index ? 'left' : 'top' 
        }
        else if (condition2){
            return index ? 'right' : 'bottom'
        }
        return sideQuadrants;
    }

    getRenderParams = () =>{
        let rowInd = 0;
        let colInd = 1;
        let rowAdder = 3
        let colAdder = 3

        let startRowIndex = this.currentIndex[0] - 1
        let startColIndex = this.currentIndex[1] - 1

        let isVerSide = this.onSideQuadrants(rowInd)
        let isHorSide = this.onSideQuadrants(colInd)

        if(isVerSide === 'top' || isHorSide === 'left'){
            if(isVerSide === 'top' && isHorSide === 'left'){
                rowAdder = 2 
                colAdder = 2
                startRowIndex = this.currentIndex[0]
                startColIndex = this.currentIndex[1]
            }
            else if(isVerSide === 'top'){
                rowAdder = 2 
                startRowIndex = this.currentIndex[0]
            }else if( isHorSide === 'left'){
                colAdder = 2
                startColIndex = this.currentIndex[1]
            }
        }

        else if(isVerSide === 'bottom' || isHorSide === 'right'){
            if(isVerSide === 'bottom' && isHorSide === 'right'){
                rowAdder = 2
                colAdder = 2
            }
            else if(isVerSide === 'bottom'){
                rowAdder = 2
            }else if(isHorSide === 'right'){
                colAdder = 2
            }
        }
        
        return {startRowIndex, startColIndex, rowAdder, colAdder}
    }

    renderQuadrants = (setCanvasSize) =>{
        this.quadrantDataBuffer = []
        this.currentRenderIndex = []
        let {startRowIndex, startColIndex, rowAdder, colAdder} = this.getRenderParams()
        let widthMultiplyer = this.currentIndex[1] ? this.currentIndex[1] * SCREEN_WIDTH : SCREEN_WIDTH
        let heightMultiplyer = this.currentIndex[0] ? this.currentIndex[0] * SCREEN_HEIGHT : SCREEN_HEIGHT
        let canvasWidth = widthMultiplyer * colAdder
        let canvasHeight = heightMultiplyer * rowAdder
        
        setCanvasSize(canvasWidth, canvasHeight)
        for(let row = startRowIndex; row < startRowIndex + rowAdder; row++){
            for(let col = startColIndex; col < startColIndex + colAdder; col ++){
                this.currentRenderIndex.push([row, col])  
            }   
        }
        
        this.createQuadrants()
    }

    getQuadrant = (index) =>{
        return quadrantData.filter(quadrantItem =>quadrantItem.index[0] === index[0] && quadrantItem.index[1] === index[1])[0]

    }

    checkArrayItem = (mainArray, indArray) =>{
        let containsElement = false
        mainArray.map((item) =>{
            if(item[0] === indArray[0] && item[1] === indArray[1]){
                containsElement = true
            }
        })
        return containsElement            
    }

    // add content from all the quadrants in a single list for collision
    updateContent = (content) =>{
        Object.keys(content).map(key =>{
            this.content[key] = this.content[key].concat(content[key])
        })
    }

    createQuadrants = () =>{
        this.resetContent()
        this.quadrantList = []    
        let quadrantRenderBuffer = quadrantData.filter(quadrantItem => this.checkArrayItem(this.currentRenderIndex, quadrantItem.index))
        quadrantRenderBuffer.map((quadrantData) =>{
            let quadrant = new Quadrant(this.context, quadrantData.content, this.player, quadrantData.index)
            this.updateContent(quadrant.create())
            this.quadrantList.push(quadrant)
        })
    }

    getCurrentQuadrant = () =>{
        
        let currentQuadrant =  this.quadrantList.filter(quadrant =>{
            let condition1 = this.player.x + this.player.width >= (SCREEN_WIDTH * quadrant.quadrantIndex[1]) && 
                            this.player.x <= (SCREEN_WIDTH * quadrant.quadrantIndex[1]) + SCREEN_WIDTH  
                            
            let condition2 = this.player.y + this.player.height  >= SCREEN_HEIGHT * quadrant.quadrantIndex[0] && 
                            this.player.y <= (SCREEN_HEIGHT * quadrant.quadrantIndex[0]) + SCREEN_HEIGHT
            return condition1 && condition2
        })[0]
        if(!currentQuadrant){
            currentQuadrant = this.quadrantList.filter(quadrant => quadrant.quadrantIndex[0] === this.currentIndex[0] && quadrant.quadrantIndex[1] === this.currentIndex[1])[0]
        }
        return currentQuadrant
    }

    hasQuadrantChanged = () =>{
        let condition1 = (this.player.x > (SCREEN_WIDTH * this.currentIndex[1]) + SCREEN_WIDTH + this.player.width) || (this.player.x < (SCREEN_WIDTH * this.currentIndex[1]))
        let condition2 = (this.player.y > (SCREEN_HEIGHT * this.currentIndex[0]) + SCREEN_HEIGHT + this.player.height) || (this.player.y < (SCREEN_HEIGHT * this.currentIndex[0]))
        
        if( condition1 || condition2){
            let currentQuadrant = this.getCurrentQuadrant()
            this.currentIndex = currentQuadrant.quadrantIndex
            return true
        }
        return false
    }

    draw = () =>{
        Object.keys(this.content).map(key =>{
            this.content[key].map(item =>{
                if(key === 'building'){
                    item.floorList.map(flat => flat.changePerspective(this.player))
                }
                if(key === 'player'){
                    if(this.content[key].isActive){
                        item.draw()
                    }
                }
                else{
                    item.draw()
                }
                
            })
        })
    }

    
}