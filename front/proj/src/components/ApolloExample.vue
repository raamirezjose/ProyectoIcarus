<template>
<div>
<dl
                      v-for="(dir, id) in getRouteMap"
                      :key="id"
                    >
                      <dt>{{ getDirection(dir.direction) }}</dt>
                    </dl>
</div>
</template>
<script>
import { ROUTE_QUERY, SUBSCRIPTION_ROUTE_MAP } from '../graphql';

    export default {
      name: 'app',
      data() {
        return {
          direction: 0,
          time: 0,
        };
      },
      methods: {
       getDirection(direction){
          let mensaje =""
          if(direction==0)
              mensaje = "izquierda"
          if(direction==1)
              mensaje = "derecha"
          if(direction==2)
              mensaje = "arriba"
          if(direction==3)
              mensaje = "abajo"
          return mensaje
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