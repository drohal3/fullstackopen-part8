require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI // not in use atm
  : process.env.MONGODB_URI

const JWT_SECRET = process.env.JWT_SECRET

module.exports = {
  MONGODB_URI,
  JWT_SECRET,
  PORT
}