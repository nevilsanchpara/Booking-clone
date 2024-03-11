const { buildSchema } = require("graphql");

const hotelSchema = buildSchema(`
  type Hotel {
    id: ID!
    name: String!
    type: String!
    address: String!
    city: String!
    description: String!
    price: Float!
    checkIn: Float
    checkOut: Float
    rating: Float!
    distance: Float!
    images: [String]!
    petAllowed: Boolean!
    freeWifi: Boolean!
    breakfast: Boolean!
    freeParking: Boolean!
    dailyHousekeeping: Boolean!
    elevator: Boolean!
    bar: Boolean!
    swimmingPool: Boolean!
    garden: Boolean!
    acRooms: Boolean!
    createdAt: String!
    freeCancelation: Boolean!
    updatedAt: String!
    features: [String]!
    rooms: [Room]!
  }

  type Room {
    id: ID!
    name: String!
    type: String!
    price: Float!
    hotel: Hotel!
  }

  type Query {
    hotels: [Hotel]!
    hotel(id: ID!): Hotel
    rooms: [Room]!
    room(id: ID!): Room
  }
`);

module.exports = hotelSchema;
