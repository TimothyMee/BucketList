const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BucketListSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  items: [
    {
      name: {
        type: String,
        required: true
      },
      date_created: {
        type: Date,
        default: Date.now
      },
      date_modified: {
        type: Date
      },
      done: {
        type: Boolean,
        default: false
      }
    }
  ],
  date_created: {
    type: Date,
    default: Date.now
  },
  date_modified: {
    type: Date
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: "users"
  }
});

module.exports = BucketList = mongoose.model("bucketlist", BucketListSchema);
