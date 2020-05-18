const Realm = require("realm");
const ObjectId = require("bson").ObjectID;
(async function () {
  // const appId = "rntut-hefbl";
  // const appConfig = {
  //   id: appId,
  //   url: "https://cloud.mongodb.com",
  //   timeout: 1000,
  //   app: {
  //     name: "default",
  //     version: "0",
  //   },
  // };
  // let app = new Realm.App(appConfig);
  // let credentials = Realm.Credentials.anonymous();
  // let user = await app.logIn(credentials);
  // console.log("HEST 0 - logged in");
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
  // Realm.deleteFile(realmConfig);
  // try {
  let realm = await Realm.open(realmConfig);
  // } catch (error) {
  //   console.trace(error);
  // }
  // realm.write(() => {
  //   realm.deleteAll();
  // });
  realm.write(() => {
    const dog = realm.create("Dog", {
      _id: new ObjectId(),
      name: "King",
    });
    console.log("dog ->", dog.name);
  });
  // console.log(`HEST 1: ${realm.objects("Dog").length}`);
  // await realm.syncSession.uploadAllLocalChanges();
  // console.log(`HEST 2: ${realm.objects("Dog").length}`);
  // realm.close();
  // Realm.deleteFile(realmConfig);
  // console.log("HEST 3");
  // let realm2 = await Realm.open(realmConfig);
  // await realm2.syncSession.downloadAllServerChanges();
  // console.log("HEST 4", realm2.objects("Dog").length);
  // realm2.close();
  // user.logOut();
})();
