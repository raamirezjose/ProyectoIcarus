
import Vue from 'vue'
import App from './App.vue'
import ApolloClient from "apollo-client";
import VueApollo from "vue-apollo";
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
/* import { SubscriptionClient} from 'subscriptions-transport-ws' 

const wsClient = new SubscriptionClient('http://localhost:3000/graphql',{
  reconnect:true
});
 */
/* import { createProvider } from './vue-apollo' */

const httpLink = new HttpLink({
  uri: 'http://159.89.33.196:3000/graphql'
})

const wsLink = new WebSocketLink({
  uri: 'ws://159.89.33.196:3000/graphql',
  options: {
    reconnect: true
  }
})

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
  },
  wsLink,
  httpLink
)


const apolloClient = new ApolloClient({
  link,
  uri: "http://159.89.33.196:3000/graphql",
  cache: new InMemoryCache(),
  connectToDevTools: true
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

Vue.use(VueApollo)

new Vue({
  provide: apolloProvider.provide(),
  render: h => h(App)
}).$mount('#app')
