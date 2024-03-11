const { buildSchema } = require("graphql");

const roomSchema = buildSchema(`
  type Room {
    id: ID!
    hotel: Hotel!
    type: String!
    name: String!
    price: Float!
    noOfPeople: Int!
    roomNo: [Int!]!
    unAvailability: [Unavailability]!
    amenities: [String]!
    details: RoomDetails
    images: [String]!
    createdAt: String!
    updatedAt: String!
  }

  type Unavailability {
    roomNo: String!
    date: [String!]!
  }

  type RoomDetails {
    sqfeet: Float
    noOfBeds: Int
    balcony: Boolean
    gardenView: Boolean
    landmarkView: Boolean
    riverView: Boolean
    bathroom: Boolean
    tv: Boolean
    wifi: Boolean
  }

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

  type Query {
    hotels: [Hotel]!
    hotel(id: ID!): Hotel
    rooms: [Room]!
    room(id: ID!): Room
  }
`);

module.exports = roomSchema;
