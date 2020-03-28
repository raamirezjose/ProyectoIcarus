export default `
  type RouteMap {
    _id: String!
    direction: Int
    date : Date
  }
  type Query {
    getRouteMap: [RouteMap!]!
  }
  type Mutation {
    createRouteMap(direction: Int! date: Date!): RouteMap!
  }
  type Subscription {
    routeAdd: RouteMap
  }
`;