import { ObjectId } from "bson";

class Project {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    name,
    partition = "public",
    homePage,
    picture,
    description,
    id = new ObjectId().toString(),
  }) {
    this._partition = partition;
    this._id = id;
    this.name = name;
    this.homePage = homePage;
    this.picture = picture;
    this.description = description;
  }

  static schema = {
    name: "Task",
    properties: {
      _id: "string",
      _partition: "string",
      name: "string",
      homePage: "string",
      picture: "string",
      description: "string"
    },
    primaryKey: "_id",
  };
}

export { Project };