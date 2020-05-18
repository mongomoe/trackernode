const Realm = require("realm");
const ObjectId = require("bson").ObjectID;

const realmConfig = {
  schema: [
    {
      name: "Dog",
      primaryKey: "_id",
      properties: {
        _id: "object id?",
        breed: "string?",
        name: "string",
        realm_id: "string?",
      },
    },
  ],
  // sync: {
  //   user: user,
  //   partitionValue: '"LoLo"',
  // },
};

// tasks = "schema": { partitioned on users object id
// "title": "Task",
// "bsonType": "object",
// "required": [
//     "_id",
//     "_partition",
//     "title",
//     "status",
//     "description",
//     "comments"
// ],
//project = partitioned on users object id
// "schema": {
//   "title": "Project",
//   "bsonType": "object",
//   "required": [
//       "_id",
//       "_partition",
//       "name"
//   ],

// user = partitioned on users objectid
// "schema": {
//   "title": "User",
//   "bsonType": "object",
//   "required": [
//       "_id",
//       "_partition",
//       "name",
//       "projects"
//   ],

// User has many projects, projects has many tasks

// const PersonSchema = {
//   name: 'Person',
//   properties: {
//     // The following property definitions are equivalent
//     car: {type: 'Car'},
//     van: 'Car',
//   }
// };
