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
    const user = await User.findById(req.user.id).select("-password");
    console.log(user.id);
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
  try {
    //verify user
    const user = await User.findById(req.user.id);
    if (!user) return res.status(401).json({ msg: "unauthorized user token" });

    const bucketlist = await BucketList.find()
      .sort({ date: -1 })
      .populate("user", ["name"]);

    if (!bucketlist)
      return res.status(400).json({ msg: "no bBucketlist found" });

    res.status(200).json(bucketlist);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const getBucketListById = async (req, res) => {
  try {
    //verify user
    const user = await User.findById(req.user.id);
    if (!user) return res.status(401).json({ msg: "unauthorized user token" });

    const bucketList = await BucketList.findById(req.params.id).populate(
      "user",
      ["name"]
    );

    if (!bucketList)
      return res.status(400).json({ msg: "No bucketlist found" });

    res.status(200).json(bucketList);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
};

const updateBucketListWithId = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    //verify user
    const user = await User.findById(req.user.id);
    if (!user) return res.status(401).json({ msg: "unauthorized user token" });

    //verify the bucketlist
    const bucketList = await BucketList.findById(req.params.id);
    if (!bucketList)
      return res.status(400).json({ msg: "No bucketlist found" });

    if (bucketList.created_by.toString() !== user.id)
      return res.status(401).json({ msg: "You cannot edit this Bucket List!" });

    bucketList.name = req.body.name;
    bucketList.date_modified = Date.now();
    await bucketList.save();

    res.status(200).json(bucketList);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
};

const deleteBucketListWithId = async (req, res) => {
  try {
    //verify user
    const user = await User.findById(req.user.id);
    if (!user) return res.status(401).json({ msg: "unauthorized user token" });

    //verify the bucketlist
    const bucketList = await BucketList.findById(req.params.id);
    if (!bucketList)
      return res.status(400).json({ msg: "No bucketlist found" });

    //check if it this users bucketlist
    if (bucketList.created_by.toString() !== user.id)
      return res
        .status(401)
        .json({ msg: "You cannot delete this Bucket List!" });

    await bucketList.remove();
    res.status(200).send("Bucket List deleted successfully");
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
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
