class CarController extends MovingObjController{
    constructor(context, player, left, top, quadrantController, collisionController){
        super(context, player, left, top, quadrantController, collisionController)
        this.init()
    }

    init = () =>{
        this.policeVehicleProb = 0.2
        this.policeVehicleState = {
            generationTime : 100,
            timer : 0,
            maxVehicle : 6
        }
    }

    generatePedesterianCar = (top, left) =>{
        this.policeVehicleState.timer++
        if(this.policeVehicleState.timer > this.policeVehicleState.generationTime){
            this.policeVehicleState.timer = 0
            if(this.quadrantController.content.car.length < this.policeVehicleState.maxVehicle){
                let {spawnPath, side} = this.getObjectsSpawnPath('car', top, left)
                if(spawnPath){
                    let direction = this.getMoveDir(side)
                    let carWidth = 80;
                    let carHeight = 40;
                    let car = new Car(this.context, spawnPath.x, spawnPath.y + 20, carWidth, carHeight, direction, true, true, 1)
                    let isPoliceCar = Math.random()<this.policeVehicleProb? true : false
                    car.isPoliceVehicle = isPoliceCar
                    this.quadrantController.content.car.push(car)
                    // return car
                }
            }
        }
    }

    updateCarMove = (top, left) =>{
        this.quadrantController.content.car.map( (car, index ) =>{
            if(car.onMove){
                if(!this.isInsideRenderZone(car, top, left)){
                    if(car.isPoliceCar){
                        this.hasPoliceCar = false
                    }
                    this.quadrantController.content.car.splice(index, 1)
                }
                else if(!this.isPlayerCar){
                    let checkRange = 10
                    if(car.isPoliceVehicle && this.player.state.pursuit > 0 && this.isPlayerNearby(car, checkRange)){
                        if(!this.player.isActive){
                            car.pursuitPlayer(this.player, this.updateObjPath)
                        }                        
                    }
                    car.move(this.updateObjPath)
                }
                this.collisionController.hasCollided(car, this.quadrantController.content)
            }
        })
    }

    checkCars = () =>{
        let isCloseToCar = false
        let closeCar;
        this.quadrantController.content['car'].map(car =>{
            let searchRange = 1.5
            if(this.isNearBy(this.player, car, this.player.width * searchRange)){
                isCloseToCar = true;
                closeCar = car
            }
        })

        return {
            isCloseToCar,
            closeCar
        }
    }
}