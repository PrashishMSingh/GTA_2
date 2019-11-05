class QuadrantController{
    constructor(context, player){
        this.currentIndex = environmentData.initialQuadrant
        this.quadrantDataList = []
        this.quadrantList = []
        this.player = player,
        this.context = context,
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
            return index ? 'top' : 'left'
        }
        else if (condition2){
            return index ? 'bottom' : 'right'
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
            else if(isVerSide === 'top' && isHorSide !== 'left'){
                rowAdder = 2 
                startRowIndex = this.currentIndex[0]
            }else if(isVerSide !== 'top' && isVarSide === 'left'){
                colAdder = 2
                startColIndex = this.currentIndex[1]
            }
        }

        else if(isVerSide === 'bottom' || isHorSide === 'right'){
            if(isVerSide === 'bottom' && isHorSide === 'right'){
                rowAdder = 0
                colAdder = 0
            }
            else if(isVerSide === 'bottom'){
                rowAdder = 0
            }else if(isHorSide === 'right'){
                colAdder = 0
            }
        }
        return {startRowIndex, startColIndex, rowAdder, colAdder}
    }

    renderQuadrants = (setCanvasSize) =>{
        this.quadrantDataList = []        
        let {startRowIndex, startColIndex, rowAdder, colAdder} = this.getRenderParams()
        let widthMultiplyer = this.currentIndex[1] ? this.currentIndex[1] * SCREEN_WIDTH : SCREEN_WIDTH
        let heightMultiplyer = this.currentIndex[0] ? this.currentIndex[0] * SCREEN_HEIGHT : SCREEN_HEIGHT
        let canvasWidth = widthMultiplyer * colAdder
        let canvasHeight = heightMultiplyer * rowAdder
        setCanvasSize(canvasWidth, canvasHeight)
        
        for(let row = startRowIndex; row < startRowIndex + rowAdder; row++){
            if(quadrantData[row]){
                let vQuadrant = []
                for(let col = startColIndex; col < startColIndex + colAdder; col ++){
                    if(quadrantData[row][col]){
                        vQuadrant.push(quadrantData[row][col])      
                    }               
                }
                this.quadrantDataList.push(vQuadrant) 
            }   
        }
        this.createQuadrant()
    }

    // add content from all the quadrants in a single list for collision
    updateContent = (content) =>{
        Object.keys(content).map(key =>{
            this.content[key] = this.content[key].concat(content[key])
        })
        
    }

    createQuadrant = () =>{
        this.resetContent()
        this.quadrantList = []        
        this.quadrantDataList.map((quadrantData, i) =>{
            quadrantData.map((data, j) =>{
                let quadrantIndex = [i, j]
                let quadrant = new Quadrant(this.context, data, this.player, quadrantIndex)
                this.updateContent(quadrant.create())
                this.quadrantList.push(quadrant)
            })  
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
            currentQuadrant = this.quadrantList.filter(quadrant => quadrant.index === this.currentIndex)
        }
        return currentQuadrant
    }


    hasQuadrantChanged = () =>{
        
        let condition1 = this.player.x > (SCREEN_WIDTH * this.currentIndex[1]) + SCREEN_WIDTH + this.player.width
        let condition2 = this.player.y > (SCREEN_HEIGHT * this.currentIndex[0]) + SCREEN_HEIGHT + this.player.height
        
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