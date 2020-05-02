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
          direction: 0,
          date: "",
          vueCanvas: null,
          spaceShip: null,
          circle: null,
          actualDirection:0,
          pos_x:0
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
       this.animation(this.pos_x);
      },
      methods: {
       chageDirection(direction){
         /*  let mensaje =""
          if(direction==4)
              mensaje = "izquierda"
          if(direction==1)
              mensaje = "derecha"
          if(direction==2)
              mensaje = "arriba"
          if(direction==3)
              mensaje = "abajo" */
              console.log(direction)
        },
        animation(){
          this.vueCanvas.clearRect(0,0,800,500);
          this.vueCanvas.drawImage(this.spacehip,this.pos_x,0,15,15);
          this.vueCanvas.drawImage(this.circle,0,5,10,7);
          this.vueCanvas.lineTo(this.pos_x+8,8 );
          this.vueCanvas.stroke();
          this.pos_x += 1;
          setTimeout(this.animation,50); 

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