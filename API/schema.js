export default `
  type RouteMap {
    _id: String!
    direction: Int
    date : String
  }
  type Query {
    getRouteMap: [RouteMap!]!
  }
  type Mutation {
    createRouteMap(direction: Int! date: String!): RouteMap!
  }
  type Subscription {
    routeAdd: RouteMap
  }
`;