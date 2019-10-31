let quadrant1 = {
    fence : [
        {
            x: 0,
            y: 200,
            height : 40,
            width: 40,
            orientation: 'vertical',
            side : 'right',
            isLeftCorner : true,
            isRightCorner : false
        },
        {
            x: 0,
            y: 200 + 40,
            height : 40,
            width: 40,
            orientation: 'vertical',
            side : 'right',
            isLeftCorner : false,
            isRightCorner : false
        },
        {
            x: 0,
            y: 200 + 40 * 2,
            height : 40,
            width: 40,
            orientation: 'vertical',
            side : 'right',
            isLeftCorner : false,
            isRightCorner : false
        },
        {
            x: 0,
            y: 200 + 40 * 3,
            height : 40,
            width: 40,
            orientation: 'vertical',
            side : 'right',
            isLeftCorner : false,
            isRightCorner : false
        },
        {
            x: 0,
            y: 200 + 40 * 4,
            height : 40,
            width: 40,
            orientation: 'vertical',
            side : 'right',
            isLeftCorner : false,
            isRightCorner : false
        },
        {
            x: 0,
            y: 200 + 40 * 5,
            height : 40,
            width: 40,
            orientation: 'vertical',
            side : 'right',
            isLeftCorner : false,
            isRightCorner : false
        },
        {
            x: 0,
            y: 200 + 40 * 6,
            height : 40,
            width: 40,
            orientation: 'vertical',
            side : 'right',
            isLeftCorner : false,
            isRightCorner : false
        },
        {
            x: 0,
            y: 200 + 40 * 7,
            height : 40,
            width: 40,
            orientation: 'vertical',
            side : 'right',
            isLeftCorner : false,
            isRightCorner : false
        },
        {
            x: 0,
            y: 200 + 40 * 8,
            height : 40,
            width: 40,
            orientation: 'vertical',
            side : 'right',
            isLeftCorner : false,
            isRightCorner : false
        },
        {
            x: 0,
            y: 200 + 40 * 9,
            height : 40,
            width: 40,
            orientation: 'vertical',
            side : 'right',
            isLeftCorner : false,
            isRightCorner : true
        },

        // Top horizontal
        {
            x: 0 + 40 * 1,
            y: 200,
            height : 40,
            width: 40,
            orientation: 'horizontal',
            side : 'down',
            isLeftCorner : false,
            isRightCorner : false
        },
        {
            x: 0 + 40 * 2,
            y: 200,
            height : 40,
            width: 40,
            orientation: 'horizontal',
            side : 'down',
            isLeftCorner : false,
            isRightCorner : false
        },
        {
            x: 0 + 40 * 3,
            y: 200,
            height : 40,
            width: 40,
            orientation: 'horizontal',
            side : 'down',
            isLeftCorner : false,
            isRightCorner : false
        },

        {
            x: 0 + 40 * 1,
            y: 560,
            height : 40,
            width: 40,
            orientation: 'horizontal',
            side : 'up',
            isLeftCorner : false,
            isRightCorner : false
        },
        {
            x: 0 + 40 * 2,
            y: 560,
            height : 40,
            width: 40,
            orientation: 'horizontal',
            side : 'up',
            isLeftCorner : false,
            isRightCorner : false
        },
        {
            x: 0 + 40 * 3,
            y: 560,
            height : 40,
            width: 40,
            orientation: 'horizontal',
            side : 'up',
            isLeftCorner : false,
            isRightCorner : false
        }
    ],

    car:[
        {
            x : 30,
            y : 290,
            width : 80,
            height : 40,
            velocity : 5,
            direction : 90,
            maxSpeed : 10,
            onMove :false,
            isPoliceVehicle : false
        },

        {
            x : 30,
            y : 370,
            width : 80,
            height : 40,
            velocity : 5,
            direction : 90,
            maxSpeed : 10,
            onMove :false,
            isPoliceVehicle : false
        },

        {
            x : 30,
            y : 530,
            width : 80,
            height : 40,
            velocity : 5,
            direction : 90,
            maxSpeed : 10,
            onMove :false,
            isPoliceVehicle : false
        },
    ],

    parking:[
        {
            x : 60 ,
            y : 260,
            height : 40,
            width : 80,
            orientation: 'vertical',
        },
        {
            x : 60,
            y : 260 + 40 * 1,
            height : 40,
            width : 80,
            orientation: 'vertical'
        },
        {
            x : 60,
            y : 260 + 40 * 2,
            height : 40,
            width : 80,
            orientation: 'vertical'
        },
        {
            x : 60,
            y : 260 + 40 * 3,
            height : 40,
            width : 80,
            orientation: 'vertical'
        },
        {
            x : 60,
            y : 260 + 40 * 4,
            height : 40,
            width : 80,
            orientation: 'vertical'
        },
        {
            x : 60,
            y : 260 + 40 * 5,
            height : 40,
            width : 80,
            orientation: 'vertical'
        },
        {
            x : 60,
            y : 260 + 40 * 6,
            height : 40,
            width : 80,
            orientation: 'vertical'
        },
        {
            x : 60,
            y : 260 + 40 * 7,
            height : 40,
            width : 80,
            orientation: 'vertical'
        },
        {
            x : 120 ,
            y : 240,
            height : 40,
            width : 40,
            orientation: 'vertical',
            isFreeSpace: true
        },
        {
            x : 120 ,
            y : 240 + 40 * 1,
            height : 40,
            width : 40,
            orientation: 'vertical',
            isFreeSpace: true
        },
        {
            x : 120,
            y : 240 + 40 * 2,
            height : 40,
            width : 40,
            orientation: 'vertical',
            isFreeSpace: true
        },
        {
            x : 120,
            y : 240 + 40 * 3,
            height : 40,
            width : 40,
            orientation: 'vertical',
            isFreeSpace: true
        },
        {
            x : 120,
            y : 240 + 40 * 4,
            height : 40,
            width : 40,
            orientation: 'vertical',
            isFreeSpace: true
        },
        {
            x : 120,
            y : 240 + 40 * 5,
            height : 40,
            width : 40,
            orientation: 'vertical',
            isFreeSpace: true
        },
        {
            x : 120,
            y : 240 + 40 * 6,
            height : 40,
            width : 40,
            orientation: 'vertical',
            isFreeSpace: true
        },
        {
            x : 120,
            y : 240 + 40 * 7,
            height : 40,
            width : 40,
            orientation: 'vertical',
            isFreeSpace: true
        },
    ],

    path : [
        {
            x : 160,
            y : 0 + 60 * 0,
            height : 60,
            width : 60,
            isRoad : false,
            isRightJunction : false,
            isLeftJunction : false,
            orientation : 'vertical',
            side : 'right',
        },
        {
            x : 160,
            y : 0 + 60 * 1,
            height : 60,
            width : 60,
            isRoad : false,
            isRightJunction : false,
            isLeftJunction : false,
            orientation : 'vertical',
            side : 'right',
        },
        {
            x : 160,
            y : 0 + 60 * 2,
            height : 60,
            width : 60,
            isRoad : false,
            isRightJunction : false,
            isLeftJunction : false,
            orientation : 'vertical',
            side : 'right',

        },
        {
            x : 160,
            y : 0 + 60 * 3,
            height : 60,
            width : 60,
            isRoad : false,
            isRightJunction : false,
            isLeftJunction : false,
            orientation : 'vertical',
            side : 'right',
        },
        {
            x : 160,
            y : 0 + 60 * 4,
            height : 60,
            width : 60,
            isRoad : false,
            isRightJunction : false,
            isLeftJunction : false,
            orientation : 'vertical',
            side : 'right'
        },
        {
            x : 160,
            y : 0 + 60 * 5,
            height : 60,
            width : 60,
            isRoad : false,
            isRightJunction : false,
            isLeftJunction : false,
            orientation : 'vertical',
            side : 'right'
        },
        {
            x : 160,
            y : 0 + 60 * 6,
            height : 60,
            width : 60,
            isRoad : false,
            isRightJunction : false,
            isLeftJunction : false,
            orientation : 'vertical',
            side : 'right'
        },
        {
            x : 160,
            y : 0 + 60 * 7,
            height : 60,
            width : 60,
            isRoad : false,
            isRightJunction : false,
            isLeftJunction : false,
            orientation : 'vertical',
            side : 'right'
        },
        {
            x : 160,
            y : 0 + 60 * 8,
            height : 60,
            width : 60,
            isRoad : false,
            isRightJunction : false,
            isLeftJunction : false,
            orientation : 'vertical',
            side : 'right'
        },
        {
            x : 160,
            y : 0 + 60 * 9,
            height : 60,
            width : 60,
            isRoad : false,
            isRightJunction : false,
            isLeftJunction : false,
            orientation : 'vertical',
            side : 'right'
        },
        {
            x : 160,
            y : 0 + 60 * 10,
            height : 60,
            width : 60,
            isRoad : false,
            isRightJunction : false,
            isLeftJunction : false,
            orientation : 'vertical',
            side : 'right'
        },
        
        // top road
        {
            x : 220 + 80 * 0,
            y : 0 + 80 * 0,
            height : 80,
            width : 80,
            isRoad : true,
            isRightJunction : false,
            isLeftJunction : false,
            orientation: 'vertical',
            side : 'left',
            isCrossPath : false
        },

        {
            x : 220 + 80 * 0,
            y : 0 + 80 * 1,
            height : 80,
            width : 80,
            isRoad : true,
            isRightJunction : false,
            isLeftJunction : false,
            orientation: 'vertical',
            side : 'left',
            isCrossPath : false
        },

        {
            x : 220 + 80 * 1,
            y : 0 + 80 * 0,
            height : 80,
            width : 80,
            isRoad : true,
            isRightJunction : false,
            isLeftJunction : false,
            orientation: 'vertical',
            side : 'right',
            isCrossPath : false
        },

        {
            x : 220 + 80 * 1,
            y : 0 + 80 * 1,
            height : 80,
            width : 80,
            isRoad : true,
            isRightJunction : false,
            isLeftJunction : false,
            orientation: 'vertical',
            side : 'right',
            isCrossPath : false
        },

        {
            x : 220 + 80 * 0,
            y : 0 + 80 * 2,
            height : 80,
            width : 80,
            isRoad : true,
            isRightJunction : false,
            isLeftJunction : false,
            orientation: 'vertical',
            side : 'left',
            isCrossPath : true
        },

        {
            x : 220 + 80 * 1,
            y : 0 + 80 * 2,
            height : 80,
            width : 80,
            isRoad : true,
            isRightJunction : false,
            isLeftJunction : false,
            orientation: 'vertical',
            side : 'left',
            isCrossPath : true
        },

        {
            x : 220 + 80 * 0,
            y : 220 + 80 * 0,
            height : 80,
            width : 80,
            isRoad : true,
            isRightJunction : true,
            isLeftJunction : false,
            orientation: 'vertical',
            side : 'left'
        },

        {
            x : 220 + 80 * 0,
            y : 220 + 80 * 1,
            height : 80,
            width : 80,
            isRoad : true,
            isRightJunction : true,
            isLeftJunction : false,
            orientation: 'vertical',
            side : 'left'
        },

        {
            x : 220 + 80 * 1,
            y : 220 + 80 * 0,
            height : 80,
            width : 80,
            isRoad : true,
            isRightJunction : true,
            isLeftJunction : false,
            orientation: 'vertical',
            side : 'right'
        },

        {
            x : 220 + 80 * 1,
            y : 220 + 80 * 1,
            height : 80,
            width : 80,
            isRoad : true,
            isRightJunction : true,
            isLeftJunction : false,
            orientation: 'vertical',
            side : 'right'
        },

        {
            x : 220,
            y : 380,
            height : 80,
            width : 80,
            isRoad : true,
            isRightJunction : false,
            isLeftJunction : false,
            orientation: 'vertical',
            side : 'left'
        },

        {
            x : 220 + 80 * 0,
            y : 380 + 80 * 1,
            height : 80,
            width : 80,
            isRoad : true,
            isRightJunction : false,
            isLeftJunction : false,
            orientation: 'vertical',
            side : 'left'
        },

        {
            x : 220 + 80 * 0,
            y : 380 + 80 * 2,
            height : 80,
            width : 80,
            isRoad : true,
            isRightJunction : false,
            isLeftJunction : false,
            orientation: 'vertical',
            side : 'left'
        },

        {
            x : 220 + 80 * 0,
            y : 380 + 80 * 3,
            height : 80,
            width : 80,
            isRoad : true,
            isRightJunction : false,
            isLeftJunction : false,
            orientation: 'vertical',
            side : 'left'
        },

        {
            x : 220 + 80 * 1,
            y : 380 ,
            height : 80,
            width : 80,
            isRoad : true,
            isRightJunction : false,
            isLeftJunction : false,
            orientation: 'vertical',
            side : 'right'
        },

        {
            x : 220 + 80 * 1,
            y : 380 + 80 * 1,
            height : 80,
            width : 80,
            isRoad : true,
            isRightJunction : false,
            isLeftJunction : false,
            orientation: 'vertical',
            side : 'right'
        },

        {
            x : 220 + 80 * 1,
            y : 380 + 80 * 2,
            height : 80,
            width : 80,
            isRoad : true,
            isRightJunction : false,
            isLeftJunction : false,
            orientation: 'vertical',
            side : 'right'
        },

        {
            x : 220 + 80 * 1,
            y : 380 + 80 * 3,
            height : 80,
            width : 80,
            isRoad : true,
            isRightJunction : false,
            isLeftJunction : false,
            orientation: 'vertical',
            side : 'right'
        },


        {
            x : 380,
            y : 0,
            height : 60,
            width : 40,
            isRoad : false,
            isRightJunction : false,
            isLeftJunction : false,
            orientation: 'vertical',
            side : 'left'
        },
        {
            x : 380,
            y : 0+ 40,
            height : 60,
            width : 60,
            isRoad : false,
            isRightJunction : false,
            isLeftJunction : false,
            orientation: 'vertical',
            side : 'left'
        },
        {
            x : 380,
            y : 0+ 60 + 40,
            height : 60,
            width : 60,
            isRoad : false,
            isRightJunction : false,
            isLeftJunction : false,
            orientation: 'vertical',
            side : 'left'
        },

        {
            x : 380,
            y : 160,
            height : 60,
            width : 60,
            isRoad : false,
            isRightJunction : true,
            isLeftJunction : false,
            orientation: 'vertical',
            side : 'left'
        },
        
        {
            x : 440,
            y : 160,
            height : 60,
            width : 60,
            isRoad : false,
            isRightJunction : false,
            isLeftJunction : false,
            orientation: 'horizontal',
            side: 'left'
        },

        {
            x : 440 + 60,
            y : 160,
            height : 60,
            width : 60,
            isRoad : false,
            isRightJunction : false,
            isLeftJunction : false,
            orientation: 'horizontal',
            side: 'left'
        },

        {
            x : 440 + 60 * 2,
            y : 160,
            height : 60,
            width : 60,
            isRoad : false,
            isRightJunction : false,
            isLeftJunction : false,
            orientation: 'horizontal',
            side: 'left'
        },


        {
            x : 380 + 80 * 0,
            y : 220 + 80 * 0,
            height : 80,
            width : 80,
            isRoad : true,
            isRightJunction : false,
            isLeftJunction : false,
            orientation : 'horizontal',
            side: 'left'

        },

        {
            x : 380 + 80 * 1,
            y : 220 + 80 * 0,
            height : 80,
            width : 80,
            isRoad : true,
            isRightJunction : false,
            isLeftJunction : false,
            orientation : 'horizontal',
            side: 'left'

        },

        {
            x : 380 + 80 * 2,
            y : 220 + 80 * 0,
            height : 80,
            width : 80,
            isRoad : true,
            isRightJunction : false,
            isLeftJunction : false,
            orientation : 'horizontal',
            side: 'left'

        },

        {
            x : 380 + 80 * 0,
            y : 220 + 80 * 1,
            height : 80,
            width : 80,
            isRoad : true,
            isRightJunction : false,
            isLeftJunction : false,
            orientation : 'horizontal',
            side: 'right'

        },

        {
            x : 380 + 80 * 2,
            y : 220 + 80 * 1,
            height : 80,
            width : 80,
            isRoad : true,
            isRightJunction : false,
            isLeftJunction : false,
            orientation : 'horizontal',
            side: 'right'

        },

        {
            x : 380 + 80 * 1,
            y : 220 + 80 * 1,
            height : 80,
            width : 80,
            isRoad : true,
            isRightJunction : false,
            isLeftJunction : false,
            orientation : 'horizontal',
            side: 'right'

        },
        
        {
            x : 380,
            y : 380,
            height : 60,
            width : 60,
            isRoad : false,
            isRightJunction : false,
            isLeftJunction : true,
            orientation: 'vertical',
            side: 'right'
        },

        {
            x : 440 + 60,
            y : 380,
            height : 60,
            width : 60,
            isRoad : false,
            isRightJunction : false,
            isLeftJunction : false,
            orientation: 'horizontal',
            side: 'right'
        },

        {
            x : 440 + 60 * 2,
            y : 380,
            height : 60,
            width : 60,
            isRoad : false,
            isRightJunction : false,
            isLeftJunction : false,
            orientation: 'horizontal',
            side: 'right'
        },

        {
            x : 440,
            y : 380,
            height : 60,
            width : 60,
            isRoad : false,
            isRightJunction : false,
            isLeftJunction : false,
            orientation: 'horizontal',
            side: 'right'
        },

        {
            x : 380,
            y : 440,
            height : 60,
            width : 60,
            isRoad : false,
            isRightJunction : false,
            isLeftJunction : false,
            orientation: 'vertical',
            side: 'left'
        },
        {
            x : 380,
            y : 440 + 60,
            height : 60,
            width : 60,
            isRoad : false,
            isRightJunction : false,
            isLeftJunction : false,
            orientation: 'vertical',
            side: 'left'
        },
        {
            x : 380,
            y : 440 + 60*2,
            height : 60,
            width : 60,
            isRoad : false,
            isRightJunction : false,
            isLeftJunction : false,
            orientation: 'vertical',
            side: 'left'
        },
    ],
    building :[
        {
            x : 0,
            y: 0,
            height: 200,
            width : 160,
            floors: 3,
            side : 'right'
        },

        {
            x : 440,
            y : 0,
            height : 160,
            width : 640,
            floors: 2,
            side : 'down'
        },
        {
            x : 440,
            y : 440,
            height : 800,
            width : 320,
            floors: 3,
            side : 'left'
        }
    ]
    
}