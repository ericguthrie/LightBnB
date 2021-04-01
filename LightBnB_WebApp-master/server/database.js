const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  host: 'localhost',
  password: '123',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
// const getUserWithEmail = function (email) {
//   let user;
//   for (const userId in users) {
//     user = users[userId];
//     if (user.email.toLowerCase() === email.toLowerCase()) {
//       break;
//     } else {
//       user = null;
//     }
//   }
//   return Promise.resolve(user);
// }
// exports.getUserWithEmail = getUserWithEmail;

const getUserWithEmail = function (email) {
  return Promise.resolve(pool.query(`
  SELECT * FROM users
  WHERE email = $1
  `, [email.toLowerCase()])
    .then(res => res.rows[0])
  )
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  return Promise.resolve(pool.query(
      `SELECT * FROM users
    WHERE id = $1
    `, [id])
    .then(res => res.rows[0])
  )
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
// const addUser = function (user) {
//   const userId = Object.keys(users).length + 1;
//   user.id = userId;
//   users[userId] = user;
//   return Promise.resolve(user);
// }
// exports.addUser = addUser;

const addUser = function (user) {
  return (pool.query(
    `INSERT INTO users (name, email, password)
    VALUES ($1,$2,$3)
    RETURNING *
    `, [user.name, user.email, user.password]).then(res => res.rows[0])
  )
}
exports.addUser = addUser;

// addUser
// Accepts a user object that will have a name, email, and hashed password property.
// This function should insert the new user into the database.
// It will return a promise that resolves with the new user object. 
// This object should contain the user's id after it's been added to the database.
// Add RETURNING *; to the end of an INSERT query to return the objects that were inserted. 
// This is handy when you need the auto generated id of an object you've just added to the database.

/// Reservations!

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
    return (pool.query(
      `SELECT *, avg(rating) as average_rating
      FROM reservations INNER JOIN properties ON reservations.property_id = properties.id INNER JOIN property_reviews ON property_reviews.property_id = properties.id 
      WHERE reservations.guest_id = $1
      GROUP BY reservations.id, properties.id, property_reviews.id
      LIMIT $2
      `, [guest_id, limit]).then(res => res.rows)
    )
}
exports.getAllReservations = getAllReservations;

// CREATE TABLE property_reviews (
//   id SERIAL PRIMARY KEY NOT NULL,
//   guest_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
//   property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
//   reservation_id INTEGER REFERENCES reservations(id) ON DELETE CASCADE,
//   rating SMALLINT NOT NULL DEFAULT 0,
//   message TEXT
// );

// CREATE TABLE properties (
//   id SERIAL PRIMARY KEY NOT NULL,
//   owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,

//   title VARCHAR(255) NOT NULL,
//   description TEXT,
//   thumbnail_photo_url VARCHAR(255) NOT NULL,
//   cover_photo_url VARCHAR(255) NOT NULL,
//   cost_per_night INTEGER  NOT NULL DEFAULT 0,
//   parking_spaces INTEGER  NOT NULL DEFAULT 0,
//   number_of_bathrooms INTEGER  NOT NULL DEFAULT 0,
//   number_of_bedrooms INTEGER  NOT NULL DEFAULT 0,

//   country VARCHAR(255) NOT NULL,
//   street VARCHAR(255) NOT NULL,
//   city VARCHAR(255) NOT NULL,
//   province VARCHAR(255) NOT NULL,
//   post_code VARCHAR(255) NOT NULL,

//   active BOOLEAN NOT NULL DEFAULT TRUE
// );

// CREATE TABLE reservations (
//   id SERIAL PRIMARY KEY NOT NULL,asdfsd
//   start_date DATE NOT NULL,
//   end_date DATE NOT NULL,
//   property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
//   guest_id INTEGER REFERENCES users(id) ON DELETE CASCADE
// );

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
// const getAllProperties = function(options, limit = 10) {
//   const limitedProperties = {};
//   for (let i = 1; i <= limit; i++) {
//     limitedProperties[i] = properties[i];
//   }
const getAllProperties = function(options, limit = 10) {
  const queryString = `SELECT *
    FROM properties
    LIMIT $1`;
  return pool.query(queryString, [limit])
  .then(res => res.rows)
  .catch(err => console.error(err));
}

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;