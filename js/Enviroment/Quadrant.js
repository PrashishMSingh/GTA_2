class Quadrant{
    constructor(canvas, context, data, player){
        this.data = data;
        this.canvas = canvas;
        this.context = context;
        this.player = player
        this.content = {
            building : [],
            fence : [],
            path : []
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
                    var model = new Building()
                    this.setParams(model,data)
                    model.context = this.context;
                    model.createFloor(this.player)
                    this.content[key].push(model)
                })
                break;

            case 'fence':
                objects.map(data =>{
                    var model = new Fence()
                    this.setParams(model,data)
                    model.context = this.context;
                    this.content[key].push(model)
                })
                break;
            case 'path':
                objects.map(data =>{
                    var model = new Path()
                    this.setParams(model,data)
                    model.context = this.context;
                    this.content[key].push(model)
                })
                break;
        }        
    }
        
    create = () =>{
        Object.keys(this.data).map(key =>{
            this.drawObjects(key)
        })
        return this.content
    }

}