rotateImage = (context, x, y, width, height, degree, dividingFactor, draw) =>{
    let rotatePointX = x + (width)/dividingFactor.x
    let rotatePointY = y + ((height)/dividingFactor.y - 1)

    context.save()
    context.translate(rotatePointX, rotatePointY)
    context.rotate(degree * (Math.PI/180))
    draw()
    context.rotate(-degree * (Math.PI/180))
    context.translate(-x - this.width / dividingFactor.x, -y - this.height / dividingFactor.y);
    context.restore()

}

paintImage = (drawInfo) =>{

    let { context, x, y, width, height, requireRotate, image, sprite, degree , dividingFactor} = drawInfo;
    if(requireRotate){
        rotateImage(context, x, y, width, height, degree, dividingFactor, () =>{
            context.drawImage(image, sprite.sx, sprite.sy, sprite.sw, sprite.sh, -width/dividingFactor.x, -height/dividingFactor.y, sprite.dw, sprite.dh)
        })
    }else{
        context.drawImage(image, sprite.sx, sprite.sy, sprite.sw, sprite.sh, sprite.dx, sprite.dy, sprite.dw, sprite.dh)
    }
}

getMoveDirection = (buffer) =>{
    let degree;
    // up
    if(buffer.includes(38)){
        if(degree){
            degree += 270
            degree /= 2
        }
        else{
            degree = 270
        }
    }
    // down
    if(buffer.includes(40)){
        if(degree){
            degree += 90
        }
        else{
            degree = 90
        }
        degree = 90

    }

    // left
    if(buffer.includes(37)){
        if(degree){
            degree += 180
            degree /= 2
        }
        else{
            degree = 180
        }
        
    }

    // right
    if(buffer.includes(39)){
        if(degree){
            if(degree === 270){
                degree = (270 + 360)/2
            }else{
                degree += 0
                degree /= 2
            }
            
        }
        else{
            degree = 0
        }
    }
    
    return degree
}
// [0 ,25, 55,88, 125, 155, 188, 225, 255, 288],
getSprite=(x, y, width, height, item)=>{
    let spriteData = {
        'car_1' : {sx : 0, sy : 115, sw : 200, sh: 80, dx : x, dy: y, dw : 100, dh : 50},
        'car_2' : {sx : 185, sy : 115, sw : 200, sh: 80, dx : x, dy: y, dw : 100, dh : 50},
        'car_3' : {sx : 185, sy : 210, sw : 200, sh: 80, dx : x, dy: y, dw : 100, dh : 50},
        
        'car_police' :  {sx : 185, sy : 115, sw : 200, sh: 80, dx : x, dy: y, dw : 100, dh : 50},

        'player' : {sx : 10, sy : 10, sw : 90, sh: 90, dx : x, dy:y, dw : width, dh : height},

        'player_punch' : {sx : 10, sy : 10, sw : 100, sh: 100, dx : x, dy:y, dw : width, dh : height},
        // 'player' : {sx : 30, sy : 60, sw : 100, sh: 100, dx : x, dy:y, dw : width, dh : height},

        'pedesterian' : {sx : 0, sy : 0, sw : 25, sh: 35, dx : x, dy:y, dw : width, dh : height},
        
        'pedesterian_down' : {sx : 0, sy : 0, sw : 25, sh: 35, dx : x, dy:y, dw : width, dh : height},

        'police' : {sx : 0, sy : 0, sw : 25, sh: 35, dx : x, dy:y, dw : width, dh : height},

        

        'police_down' : {sx : 0, sy : 0, sw : 25, sh: 35, dx : x, dy:y, dw : width, dh : height},

        'police_punch' : {sx : 10, sy : 10, sw : 30, sh: 30, dx : x, dy:y, dw : width, dh : height},
        
        'mob' : {sx : 0, sy : 0, sw : 30, sh: 45, dx : x, dy:y, dw : width, dh : height},
        
        'mob_down' : {sx : 0, sy : 0, sw : 30, sh: 45, dx : x, dy:y, dw : width, dh : height},

        'fenceVR' : {sx : 60 * 23 - 12, sy : 60*32, sw : 60, sh:60, dx : x, dy:y, dw : width, dh : height},
        
        'fenceVL_LC' : {sx : 60 * 16, sy : 60*2, sw : 60, sh:60, dx : x, dy:y, dw : width, dh : height},
        
        'fenceVR_LC' : {sx : 60 * 22 + 20, sy : 60*32, sw : 60, sh:60, dx : x, dy:y, dw : width, dh : height},

        'fenceVL_RC' : {sx : 60 * 16, sy : 60*2, sw : 60, sh:60, dx : x, dy:y, dw : width, dh : height},
        
        'fenceVR_RC' : {sx : 60 * 16, sy : 60*2, sw : 60, sh:60, dx : x, dy:y, dw : width, dh : height},

        'parkingFV' : {sx : 60 * 19 + 20, sy : 60*32, sw : 60, sh:60, dx : x, dy:y, dw : width, dh : height},

        'parkingV' : {sx : 60 * 20 + 8, sy : 60*32, sw : 60, sh:60, dx : x, dy:y, dw : width, dh : height},
        
        'road' : {sx : 0, sy : 0, sw : 60, sh:60, dx : x, dy:y, dw : width, dh : height},

        'roadVR' : {sx : 60 * 4, sy :60 * 22 + 20, sw : 60, sh:60, dx : x, dy:y, dw : width, dh : height},

        'roadHL' : {sx : 60 * 4, sy :60 * 22 + 20, sw : 60, sh:60, dx : x, dy:y, dw : width, dh : height},
        'roadHR' : {sx : 60 * 4, sy :60 * 22 + 20, sw : 60, sh:60, dx : x, dy:y, dw : width, dh : height},

        'roadVL' : {sx : 60 * 4, sy :60 * 22 + 20, sw : 60, sh:60, dx : x, dy:y, dw : width, dh : height},
        
        'roadVL_CX' : {sx : 60 * 9 - 22, sy :60 * 27 - 20, sw : 50, sh:50, dx : x, dy:y, dw : height, dh : width},
        'roadHL_CX' : {sx : 60 * 9, sy : 60 * 26, sw : 60, sh:60, dx : x, dy:y, dw : width, dh : height},

        'roadVR_CX' : {sx : 60 * 9 - 22, sy :60 * 27 - 20, sw : 50, sh:50, dx : x, dy:y, dw : height, dh : width},
        'roadHR_CX' : {sx : 60 * 9, sy : 60 * 26, sw : 60, sh:60, dx : x, dy:y, dw : width, dh : height},

        'roadVL_RJ' : {sx : 60 * 4, sy :60 * 22 + 20, sw : 60, sh:60, dx : x, dy:y, dw : width, dh : height},
        'roadHL_LJ' : {sx : 60 *1 + 10 , sy :60 * 27 - 5, sw : 58, sh:48, dx : x, dy:y, dw : width, dh : height},

        'roadVR_RJ' : {sx : 60 *1 + 10 , sy :60 * 27 - 5, sw : 58, sh:48, dx : x, dy:y, dw : width, dh : height},
        'roadHR_LJ' : {sx : 60 *1 + 10 , sy :60 * 27 - 5, sw : 58, sh:48, dx : x, dy:y, dw : width, dh : height},

        'footPathVL' : {sx : 60 * 15 - 10, sy : 60 * 31, sw : 55, sh:60, dx : x, dy:y, dw : width, dh : height},
        'footPathVR' : {sx : 60 * 14 + 2, sy : 60 * 31, sw : 55, sh:60, dx : x, dy:y, dw : width, dh : height},
        
        'footPathVL_RJ' : {sx : 60 * 13 - 12, sy : 60 * 31, sw : 55, sh:60, dx : x, dy:y, dw : width, dh : height},
        'footPathVL_LJ' : {sx : 60 * 15 - 10, sy : 60 * 31, sw : 55, sh:60, dx : x, dy:y, dw : width, dh : height},
        'footPathVR_RJ' : {sx : 60 * 6 -38 , sy : 60 * 31 - 4, sw : 60, sh:60, dx : x, dy:y, dw : width, dh : height},
        'footPathVR_LJ' : {sx : 60 * 4, sy : 60 * 31, sw : 60, sh:60, dx : x, dy:y, dw : width, dh : height},

        'footPathHL' : {sx : 60 * 3 + 13, sy : 60 * 31 + 2, sw : 60, sh:58, dx : x, dy:y, dw : width, dh : height},
        'footPathHR' : {sx : 60 * 6 -38 , sy : 60 * 31 - 4, sw : 60, sh:60, dx : x, dy:y, dw : width, dh : height},
        
        'footPathHL_LJ' : {sx : 60 * 4, sy : 60 * 31, sw : 60, sh:60, dx : x, dy:y, dw : width, dh : height},
        'footPathHL_RJ' : {sx : 60 * 4, sy : 60 * 31, sw : 60, sh:60, dx : x, dy:y, dw : width, dh : height},
        'footPathHR_LJ' : {sx : 60 * 4, sy : 60 * 31, sw : 60, sh:60, dx : x, dy:y, dw : width, dh : height},
        'footPathHR_RJ' : {sx : 60 * 6 -38 , sy : 60 * 31 - 4, sw : 60, sh:60, dx : x, dy:y, dw : width, dh : height},
}
    return spriteData[item]
}