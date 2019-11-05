class PedesterianController extends MovingObjController{
    constructor(context, player, left, top, quadrantController, collisionController){
        super(context, player, left, top, quadrantController, collisionController)
        this.init()
    }

    init = () =>{
        this.createMobProb = 0.2
        this.createPedesterianProb = 0.4        
        this.pedesterianState = {
            generationTime : 100,
            timer : 0,
            maxPedesterian : 20
        }
        this.coolDownState = {
            tick : 0,
            tickPerFrame : 300
        }
    }

    checkPursuit = () =>{
        if(this.player.state.pursuit){
            this.coolDownState.tick ++
            if(this.coolDownState.tick > this.coolDownState.tickPerFrame){
                this.coolDownState.tick = 0
                let policeOnPursuite = this.quadrantController.content.pedesterian.filter(people => people.onPursuite)[0]
                if(!policeOnPursuite){
                    this.player.state.pursuit -=1
                }
            }
        }
    }

    generatePedesterian = (top, left) =>{
        this.pedesterianState.timer+=1
        if(this.pedesterianState.timer > this.pedesterianState.generationTime){
            this.pedesterianState.timer = 0
            if(this.quadrantController.content.pedesterian.length < this.pedesterianState.maxPedesterian){
                let {spawnPath, side} = this.getObjectsSpawnPath('pedesterian', top, left)
                if(spawnPath){
                    let direction = this.getMoveDir(side)
                    let pedesterian = new Person(this.context, spawnPath.x, spawnPath.y, 30, 30, 0.5, false, direction)
                    pedesterian.onMove = true
                    pedesterian.isMob = Math.random() < this.createMobProb ? true : false
                    if(!pedesterian.isMob){
                        pedesterian.isPolice = Math.random() < this.createPedesterianProb ? false : true
                    }
                    this.quadrantController.content.pedesterian.push(pedesterian)
                }               
            }
        }
    }

    checkPeople = (player, range = 1) =>{
        let playerCords = this.getMidPoint(player)
        let person = this.quadrantController.content['pedesterian'].filter(person=>{
           let personCords = this.getMidPoint(person)
           return this.isNearBy(playerCords, personCords, this.player.width * range)
            
        })[0]
        return person
    }
    
    isPlayerNearby = (police, range) =>{
        let playerCords = this.getMidPoint(this.player)
        let policeCords = this.getMidPoint(police)
        let nearBy = this.isNearBy(playerCords, policeCords, police.width * range)
        police.onPursuite = nearBy
        if(nearBy){
            return true
        }
        return false
    }

    updatePedesterianMove = (top, left) =>{
        this.quadrantController.content.pedesterian.map((pedesterian, index) =>{
            if(!this.isInsideRenderZone(pedesterian, top, left)|| pedesterian.isDead){
                this.quadrantController.content.pedesterian.splice(index, 1)
            }else{
                if(!pedesterian.pedesterianState.hasFallen && pedesterian.state.health > 0){
                    pedesterian.move(this.updateObjPath)
                    let checkRange = 10
                    
                    if(pedesterian.isPolice ){

                        if(this.player.state.pursuit > 0 && this.isPlayerNearby(pedesterian, checkRange)){
                            pedesterian.pursuitPlayer(this.player, this.updateObjPath)
                        }                        
                    }
                }
                this.collisionController.hasCollided(pedesterian, this.quadrantController.content)
            }
        })        
    }
}