import { PubSub } from 'apollo-server-express';
import { withFilter } from 'graphql-subscriptions';
import {conectionmqtt} from './prueba';
const ROUTE_ADDED = 'ROUTE_ADDED';
const pubsub = new PubSub();
export default {
  
    Query: {
        getRouteMap: async (parent, args, { RouteMap }) => {
        const route = await RouteMap.find();
        return route.map(x => {
          x._id = x._id.toString();
          return x;
        })
      }
    },
    Mutation: {
        createRouteMap: async (parent, args, { RouteMap }) => {
        const route = await new RouteMap(args).save();
        route._id = route._id.toString();
        pubsub.publish(ROUTE_ADDED, { routeAdd: route});
        conectionmqtt(route.direction.toString());
        return route;
      }
    },
    Subscription :{
      routeAdd:{
        subscribe:()=> pubsub.asyncIterator([ROUTE_ADDED]),
      }
    }
  }
