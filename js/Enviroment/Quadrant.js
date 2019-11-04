class Quadrant{
    constructor(context, data, player, quadrantIndex){
        this.data = data;
        this.context = context;
        this.player = player
        this.quadrantIndex = quadrantIndex
        this.content = {
            building : [],
            fence : [],
            path : [],
            car : [],
            parking : []
        }
    }

    setParams = (model, data) =>{
        Object.keys(data).map(key =>{
            model[key] = data[key]
        })
    }

    drawObjects = (key) => {
        var objects = this.data[key]
        switch(key){
            case 'building':
                objects.map(data =>{
                    var building = new Building()
                    this.setParams(building,data)
                    building.context = this.context;
                    building.createFloor(this.player)
                    this.content[key].push(building)
                })
                break;

            case 'fence':
                objects.map(data =>{
                    var fence = new Fence()
                    this.setParams(fence,data)
                    fence.context = this.context;
                    this.content[key].push(fence)
                })
                break;

            case 'parking':
                objects.map(data =>{
                    var parking = new Parking()
                    this.setParams(parking, data)
                    parking.context = this.context
                    this.content[key].push(parking)
                })
                break
            case 'path':
                objects.map(data =>{
                    var path = new Path()
                    this.setParams(path,data)
                    path.context = this.context;
                    this.content[key].push(path)
                    path.id = this.pathCount
                    this.pathCount++
                })
                break;
            case 'car':
                objects.map(data =>{
                    var car = new Car()
                    this.setParams(car, data)
                    // car.x = car.x + car.height * Math.sin(90)                    
                    car.context = this.context
                    this.content[key].push(car)
                })
        }        
    }
        
    create = () =>{
        this.pathCount = 0
        Object.keys(this.data).map(key =>{
            this.drawObjects(key)
        })
        return this.content
    }

}