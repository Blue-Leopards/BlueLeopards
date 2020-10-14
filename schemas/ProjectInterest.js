import { ObjectId } from "bson";

class ProjectInterest {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    partition = "public",
    interestId,
    interestName,
    projectId,
    projectName,
    id = new ObjectId().toString(),
  }) {
    this._partition = partition;
    this._id = id;
    this.interestId = interestId;
    this.interestName = interestName;
    this.projectId = projectId;
    this.projectName = projectName;
  }

  static schema = {
    name: "ProjectInterest",
    properties: {
      _id: "string",
      _partition: "string",
      interestId: "string",
      interestName: "string",
      projectId: "string",
      projectName: "string"
    },
    primaryKey: "_id",
  };
}

export { ProjectInterest };