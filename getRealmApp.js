import Realm from "realm";

let app;

// Returns the shared instance of the Realm app.
export function getRealmApp() {
  if (app === undefined) {

    const appId = "blueleopards-fmfnh";
    const appConfig = {
      id: appId,
      timeout: 10000,
      app: {
        name: "default",
        version: "0",
      },
    };
    console.log(Realm.App);
    app = new Realm.App(appConfig);
  }
  return app;
}
