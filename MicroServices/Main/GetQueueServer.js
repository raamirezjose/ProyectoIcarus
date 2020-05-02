const amqp = require('amqplib/callback_api');
const gql = require("graphql-tag");
const ApolloClient = require("apollo-client").ApolloClient;
const fetch = require("node-fetch");
const createHttpLink = require("apollo-link-http").createHttpLink;
const setContext = require("apollo-link-context").setContext;
const InMemoryCache = require("apollo-cache-inmemory").InMemoryCache;
 
const httpLink = createHttpLink({
  uri: "http://localhost:3000/graphql",
  fetch: fetch
});
 
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});


const sendServerData =  (msg) =>{
  console.log(msg);
  const routeAdd = gql`
  mutation createRouteMap {
    createRouteMap(direction:${msg.direction},date:"2020-05-18T07:56:38.219Z") {
        _id
        direction
        date
      }
    }
  `;
   client.mutate({mutation:routeAdd});
}; 

amqp.connect('amqp://localhost',  function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(  function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = 'directions_queue';

    channel.assertQueue(queue, {
      durable: true
    });
    channel.prefetch(1);

    console.log("esperando por direcciones in %s", queue);
    channel.consume(queue, function(msg) {

      console.log("direccion recibida: '%s'", msg.content.toString());
      sendServerData(JSON.parse(msg.content.toString()));
      setTimeout( function() {
        channel.ack(msg);
      }, 1000);
    });
  });
}); 