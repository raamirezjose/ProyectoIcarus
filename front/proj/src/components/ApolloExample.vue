<template>  
<div>
  <canvas id="Lienzo"></canvas>
 
<dl
                      v-for="(dir, id) in getRouteMap"
                      :key="id"
                    >
                       {{ chageDirection(dir.direction) }}
                    </dl>
</div>
</template>


<style>
#Lienzo {
  height: 750px;
  width: 1200px;
  border: 1px solid gray;
  float:left;
}
</style>
<script>
import { ROUTE_QUERY, SUBSCRIPTION_ROUTE_MAP } from '../graphql';

    export default {
      name: 'app',
      data() {
        return {
          lastDirection:0,
          date: "",
          vueCanvas: null,
          spaceShip: null,
          circle: null,
          actualDirection:0,
          pos_x:140,
          pos_y:60,
          historyPosition:[]
        };
      }, 
      mounted() {
      var imgSpaceShip = require("../assets/spaceship.png" )
      var imgCircle = require("../assets/circle.png" )

       this.spacehip  = new Image();
       this.spacehip.src = imgSpaceShip;

       this.circle  = new Image();
       this.circle.src = imgCircle;


       var canvas = document.getElementById("Lienzo");
       var ctx = canvas.getContext("2d");    
       this.vueCanvas = ctx;
       this.animation();
      },
      methods: {
       chageDirection(direction){
         this.actualDirection = direction;
         /*  let mensaje =""
          if(direction==4)
              mensaje = "izquierda"
          if(direction==1)
              mensaje = "derecha"
          if(direction==2)
              mensaje = "arriba"
          if(direction==3)
              mensaje = "abajo" */
        },
        animation(){
          if(this.lastDirection !== this.actualDirection)
          {
            let postition = {
                              direction:this.actualDirection,
                              pos_x:this.pos_x,
                              pos_y:this.pos_y
                              }
            this.historyPosition.push(postition);
            this.lastDirection = this.actualDirection;
          }
         switch(this.actualDirection){
          case 1:
             this.pos_x += 1;
             var imgSpaceShip = require("../assets/spaceship.png");
             this.spacehip.src = imgSpaceShip;
             break;
          case 2:
             var imgSpaceShipUP = require("../assets/spaceshipUp.png");
             this.spacehip.src = imgSpaceShipUP;
             this.pos_y -= 1;
             break;
          case 3:
             var imgSpaceShipDown = require("../assets/spaceshipDown.png");
             this.spacehip.src = imgSpaceShipDown;
             this.pos_y += 1;
             break;
          case 4:
             var imgSpaceShipLeft = require("../assets/spaceshipLeft.png");
             this.spacehip.src = imgSpaceShipLeft;
             this.pos_x -= 1;
             break;
        }
          this.vueCanvas.clearRect(0,0,800,500);
          //this.drawHistoryPositon();
          this.vueCanvas.drawImage(this.spacehip,this.pos_x,this.pos_y,15,15);
          this.vueCanvas.lineTo(this.pos_x+9,this.pos_y+8);
          this.vueCanvas.stroke();
          setTimeout(this.animation,100); 
        },
        drawHistoryPositon(){
          this.vueCanvas.drawImage(this.circle,130,65,10,7);

          for (var i = 1; i < this.historyPosition.length; i++) {
          this.vueCanvas.drawImage(this.circle,this.historyPosition[i].pos_x,
          this.historyPosition[i].pos_y+5,10,7);
          this.vueCanvas.lineTo(this.historyPosition[i].pos_x+9,this.historyPosition[i].pos_y+8);
          this.vueCanvas.stroke();
        }
      }
      },
      apollo: {
      getRouteMap: {
        query: ROUTE_QUERY,
        subscribeToMore: {
          document: SUBSCRIPTION_ROUTE_MAP,
          updateQuery: (previousData, { subscriptionData }) => {
                 return {
                   getRouteMap: [...previousData.getRouteMap, subscriptionData.data.routeAdd], 
                };
          },
        },
      },
    },
    };
</script>

<style>
</style>