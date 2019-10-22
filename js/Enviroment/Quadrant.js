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

    rotate = (angle, drawImage) =>{
        this.context.save()
        this.context.translate(this.canvas.width/ 2, this.canvas.height/2)
        this.context.rotate((Math.PI /180) *angle)
        drawImage()
        this.context.restore()
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
                    model.draw('blue')
                    model.createFloor(this.player)

                    this.content[key].push(model)
                })
                break;

            case 'fence':
                objects.map(data =>{
                    var model = new Fence()
                    this.setParams(model,data)
                    model.context = this.context;
                    model.draw('grey')
                    this.content[key].push(model)
                })
                break;
            case 'path':
                objects.map(data =>{
                    var model = new Path()
                    this.setParams(model,data)
                    model.context = this.context;
                    model.draw('yellow')
                    this.content[key].push(model)
                })
                break;
        }        
    }
        
    create = () =>{
        Object.keys(this.data).map(key =>{
            this.drawObjects(key)
        })
    }

}