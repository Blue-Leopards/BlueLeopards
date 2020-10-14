import { ObjectId } from "bson";

class ProfileInterest {
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
    interestId,
    interestName,
    id = new ObjectId().toString(),
  }) {
    this._partition = partition;
    this._id = id;
    this.profileId = profileId;
    this.profileEmail = profileEmail;
    this.interestId = interestId;
    this.interestName = interestName;
  }

  static schema = {
    name: "ProfileInterest",
    properties: {
      _id: "string",
      _partition: "string",
      profileId: "string",
      profileEmail: "string",
      interestId: "string",
      interestName: "string"
    },
    primaryKey: "_id",
  };
}

export { ProfileInterest };