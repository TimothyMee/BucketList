const {
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
} = require("../../controllers/BucketController");
const { registerUser, login } = require("../../controllers/AuthController");
const express = require("express");
const { check } = require("express-validator");
const auth = require("../../middleware/auth");
var router = express.Router();

router.post(
  "/auth/register",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please use a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  registerUser
);

router.post(
  "/auth/login",
  [
    check("email", "Please use a valid email").isEmail(),
    check("password", "Please enter a password").exists()
  ],
  login
);

router.post(
  "/bucketlist",
  [
    auth,
    check("name", "Name is required")
      .not()
      .isEmpty()
  ],
  insertBucketList
);
router.get("/bucketlist", auth, getAllBucketLists);
router.get("/bucketlist/:id", auth, getBucketListById);
router.put(
  "/bucketlist/:id",
  [
    auth,
    check("name", "Name is required")
      .not()
      .isEmpty()
  ],
  updateBucketListWithId
);
router.delete("/bucketlist/:id", auth, deleteBucketListWithId);

router.post(
  "/bucketlist/:id/items",
  [
    auth,
    check("name", "Name is required")
      .not()
      .isEmpty()
  ],
  insertItemIntoBucketList
);
router.get("/bucketlist/:id/items", auth, getAllItemInBucketList);
router.get("/bucketlist/:id/items/:item_id", auth, getItemFromBucketListById);
router.put(
  "/bucketlist/:id/items/:item_id",
  [
    auth,
    check("name", "Name is required")
      .not()
      .isEmpty()
  ],
  updateItemFromBucketListWithId
);
router.delete(
  "/bucketlist/:id/items/:item_id",
  auth,
  deleteItemFromBucketListWithId
);

module.exports = router;
