import { ObjectId } from "bson";

class ProfileProject {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    partition = "public",
    profileId,
    profileEmail,
    projectId,
    projectName,
    id = new ObjectId().toString(),
  }) {
    this._partition = partition;
    this._id = id;
    this.profileId = profileId;
    this.profileEmail = profileEmail;
    this.projectId = projectId;
    this.projectName = projectName;
  }

  static schema = {
    name: "ProjectInterest",
    properties: {
      _id: "string",
      _partition: "string",
      profileId: "string",
      profileEmail: "string",
      projectId: "string",
      projectName: "string"
    },
    primaryKey: "_id",
  };
}

export { ProfileProject };