const { validationResult } = require("express-validator");
const BucketList = require("../models/BucketList");
const User = require("../models/User");

const insertBucketList = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = User.findById(req.user.id).select("-password");
    const newBucketList = {
      created_by: user.id,
      name: req.body.name
    };

    const bucketList = new BucketList(newBucketList);
    await bucketList.save();

    res.status(200).json(bucketList);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "user not were found" });
    }
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const getAllBucketLists = async (req, res) => {
  res.send("here");
};

const getBucketListById = async (req, res) => {
  res.send("here");
};

const updateBucketListWithId = async (req, res) => {
  res.send("here");
};

const deleteBucketListWithId = async (req, res) => {
  res.send("here");
};

const insertItemIntoBucketList = async (req, res) => {
  res.send("here");
};

const getAllItemInBucketList = async (req, res) => {
  res.send("here");
};

const getItemFromBucketListById = async (req, res) => {
  res.send("here");
};

const updateItemFromBucketListWithId = async (req, res) => {
  res.send("here");
};

const deleteItemFromBucketListWithId = async (req, res) => {
  res.send("here");
};

module.exports = {
  insertBucketList,
  getAllBucketLists,
  getBucketListById,
  updateBucketListWithId,
  deleteBucketListWithId,
  insertItemIntoBucketList,
  getAllItemInBucketList,
  getItemFromBucketListById,
  updateItemFromBucketListWithId,
  deleteItemFromBucketListWithId
};
