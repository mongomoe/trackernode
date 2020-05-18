const Realm = require("realm");
const ObjectId = require("bson").ObjectID;
const {
  Stitch,
  AnonymousCredential,
  UserPasswordCredential,
  UserPasswordAuthProviderClient,
} = require("mongodb-stitch-server-sdk");

// MOCK LOGIN FUNCTION
async function login() {
  const app = Stitch.initializeDefaultAppClient("rntut-hefbl");

  /* REGISTER
  // const emailPasswordClient = Stitch.defaultAppClient.auth.getProviderClient(
  //   UserPasswordAuthProviderClient.factory
  // );

  // emailPasswordClient
  //   .registerWithEmail("moechug@mailinator.com", "Moechug123!")
  //   .then(() => console.log("Successfully sent account confirmation email!"))
  //   .catch((err) => console.error("Error registering new user:", err));
  */

  const credential = new UserPasswordCredential(
    "moechug@mailinator.com",
    "Moechug123!"
  );

  return await app.auth
    .loginWithCredential(credential)
    // Returns a promise that resolves to the authenticated user
    .then(async (authedUser) => {
      console.log(`successfully logged in with id: ${authedUser.id}`);
      console.log(authedUser.id);
      return authedUser.id;
    })
    .catch((err) => console.error(`login failed with error: ${err}`));
}

async function run() {
  // CREATE SCHEMAS

  const UserSchema = {
    name: "User",
    primaryKey: "_id",
    properties: {
      _id: "object id?",
      name: "string",
      project: { type: "Project" },
    },
  };
  const ProjectSchema = {
    name: "Project",
    primaryKey: "_id",
    properties: {
      _id: "object id?",
      name: "string",
      tasks: { type: "list", objectType: "Task" },
    },
  };
  const TaskSchema = {
    name: "Task",
    primaryKey: "_id",
    properties: {
      _id: "object id?",
      title: "string",
      status: "string",
      description: "string",
      comments: "string",
    },
  };
  const realmConfig = {
    schema: [UserSchema, ProjectSchema, TaskSchema],
    // sync: { // stitch stuff needs to be working for user to work with stitch?
    //   user: user,
    //   partitionValue: "MyProject",
    // },
  };
  let realm = await Realm.open(realmConfig);
  const userID = await login();

  // CREATE USER, PROJECT, AND MULTIPLE TASKS
  realm.write(() => {
    const MoeUser = realm.create("User", {
      _id: new ObjectId(userID),
      name: "Moe",
    });
    const MoeProject = realm.create("Project", {
      _id: new ObjectId(),
      name: "Tracker",
    });
    MoeUser.project = MoeProject;
    const taskList = MoeProject.tasks;
    const GroceryTask = realm.create("Task", {
      _id: new ObjectId(),
      title: "Buy Groceries",
      status: "open",
      description: "go to the store to buy milk, eggs, and bread",
      comments: "check expiration date",
    });
    const ExerciseTask = realm.create("Task", {
      _id: new ObjectId(),
      title: "Exercise",
      status: "open",
      description: "go to the gym",
      comments: "leg day",
    });
    taskList.push(GroceryTask);
    taskList.push(ExerciseTask);
    console.log("original exercise task status", ExerciseTask.status);
    // console.log("project including all tasks", MoeUser.project);
  });

  // UPDATE TASK
  realm.write(() => {
    let tasks = realm.objects("Task");
    let ExerciseTask = tasks.filtered('title = "Exercise"');
    ExerciseTask.status = "In Progress";
    console.log("updated exercise task status", ExerciseTask.status);
  });

  // DELETE TASK
  realm.write(() => {
    let tasks = realm.objects("Task");
    let ExerciseTask = tasks.filtered('title = "Exercise"');
    ExerciseTask.status = "Done";
    // console.log("completed exercise task", ExerciseTask);
  });

  realm.write(() => {
    let tasks = realm.objects("Task");
    let ExerciseTask = tasks.filtered('title = "Exercise"');
    realm.delete(ExerciseTask);
    // console.log("remaining tasks", tasks);
  });
}

run();
