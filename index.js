const Realm = require("realm");
const ObjectId = require("bson").ObjectID;
async function run() {
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
    // sync: {
    //   user: user,
    //   partitionValue: '"LoLo"',
    // },
  };

  let realm = await Realm.open(realmConfig);

  console.log("realm exist", realm);

  realm.write(() => {
    const MoeUser = realm.create("User", {
      _id: new ObjectId(),
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

  realm.write(() => {
    let tasks = realm.objects("Task");
    let ExerciseTask = tasks.filtered('title = "Exercise"');
    ExerciseTask.status = "In Progress";
    console.log("updated exercise task status", ExerciseTask.status);
  });

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

  realm.close();
}

run();
