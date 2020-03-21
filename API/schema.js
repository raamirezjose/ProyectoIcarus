export default `
  type RouteMap {
    _id: String!
    direction: Int
    time : Int
  }
  type Query {
    getRouteMap: [RouteMap!]!
  }
  type Mutation {
    createRouteMap(direction: Int! time: Int!): RouteMap!
  }
  type Subscription {
    routeAdd: RouteMap
  }
`;