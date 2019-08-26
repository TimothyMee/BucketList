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

/**
 * @api {post} /api/v1.0/auth/register Create a user
 * @apiVersion 1.0.0
 * @apiName Create User
 * @apiGroup Auth
 * @apiPermission no permission
 *
 * @apiParam (Request body) {String} name The user's name
 * @apiParam (Request body) {Email} email The user's email
 * @apiParam (Request body) {Password} password The user's password
 *
 * @apiExample {js} Example usage:
 * const data = {
 *   "name": "Timothy"
 *   "email": "Timothy@gmail.com"
 *   "password": "password"
 * }
 *
 * $http.post(url, data)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 200) {String} token User token!
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     {
 *      "token": "57e903941ca43a5f0805ba5a57e903941ca43a5f0805ba5a57e903941ca43a5f0805ba5a",
 *     }
 *
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Server Error
 *    HTTP/1.1 400 User already exists
 */
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

/**
 * @api {post} /api/v1.0/auth/login Logs user in
 * @apiVersion 1.0.0
 * @apiName Login
 * @apiGroup Auth
 * @apiPermission no permission
 *
 * @apiParam (Request body) {Email} email The user's email
 * @apiParam (Request body) {Password} password The user's password
 *
 * @apiExample {js} Example usage:
 * const data = {
 *   "email": "Timothy@gmail.com"
 *   "password": "password"
 * }
 *
 * $http.post(url, data)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 200) {String} token User token!
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     {
 *      "token": "57e903941ca43a5f0805ba5a57e903941ca43a5f0805ba5a57e903941ca43a5f0805ba5a",
 *     }
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Server Error
 *    HTTP/1.1 400 User already exists
 *
 *
 */
router.post(
  "/auth/login",
  [
    check("email", "Please use a valid email").isEmail(),
    check("password", "Please enter a password").exists()
  ],
  login
);

/**
 * @api {post} /api/v1.0/bucketlist Create a BucketList
 * @apiVersion 1.0.0
 * @apiName Create BucketList
 * @apiGroup bucketlist
 * @apiPermission authenticated user
 *
 * @apiParam (Request body) {String} name The bucketlist's name
 *
 * @apiExample {js} Example usage:
 * const data = {
 *   "name": "Example BucketList"
 * }
 *
 * const config = {
 *  "x-auth-token" : "authenticated user token"
 * }
 *
 * $http.post(url, data, config)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 200) {Object} bucketList Newly Created bucketList!
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     {
 *      "data": {
 *        "_id" : "50805ba5a57e900805ba5a57e90"
 *        "name": "Example BucketList",
 *        "items": [],
 *        "date_created": "2019-08-22T17:32:07.172+00:00",
 *        "date_modified":""
 *        "created_by": "57e903941ca43a5f0805ba5a57e90"
 *        },
 *     }
 *
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Server Error
 *    HTTP/1.1 400 User not found
 */
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

/**
 * @api {get} /api/v1.0/bucketlist Get all User's BucketLists
 * @apiVersion 1.0.0
 * @apiName Fetch BucketLists
 * @apiGroup bucketlist
 * @apiPermission authenticated user
 *
 *
 * @apiExample {js} Example usage:
 *
 * const config = {
 *  "x-auth-token" : "authenticated user token"
 * }
 *
 * $http.get(url, config)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 200) {Array} bucketLists Array of user's BucketLists!
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     {
 *      "data": [{
 *        "_id" : "50805ba5a57e900805ba5a57e90"
 *        "name": "Example BucketList",
 *        "items": [],
 *        "date_created": "2019-08-22T17:32:07.172+00:00",
 *        "date_modified":""
 *        "created_by": "57e903941ca43a5f0805ba5a57e90"
 *        }],
 *     }
 *
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Server Error
 *    HTTP/1.1 401 unauthorized user token
 *    HTTP/1.1 400 no bucketlist found
 */
router.get("/bucketlist", auth, getAllBucketLists);

/**
 * @api {get} /api/v1.0/bucketlist/{:id} Fetch a BucketList
 * @apiVersion 1.0.0
 * @apiName Fetch BucketList
 * @apiGroup bucketlist
 * @apiPermission authenticated user
 *
 * @apiParam {id} id The bucketlist's id
 *
 * @apiExample {js} Example usage:
 * const config = {
 *  "x-auth-token" : "authenticated user token"
 * }
 *
 * const url = /api/v1.0/bucketlist/50805ba5a57e900805ba5a57e90
 * $http.get(url, config)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 200) {Object} bucketList Fetch bucketList!
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     {
 *      "data": {
 *        "_id" : "50805ba5a57e900805ba5a57e90"
 *        "name": "Example BucketList",
 *        "items": [],
 *        "date_created": "2019-08-22T17:32:07.172+00:00",
 *        "date_modified":""
 *        "created_by": "57e903941ca43a5f0805ba5a57e90"
 *        },
 *     }
 *
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Server Error
 *    HTTP/1.1 400 no bucket list found
 *    HTTP/1.1 401 unauthorized user token
 */
router.get("/bucketlist/:id", auth, getBucketListById);

/**
 * @api {put} /api/v1.0/bucketlist/{:id} Update a BucketList
 * @apiVersion 1.0.0
 * @apiName Update BucketList
 * @apiGroup bucketlist
 * @apiPermission authenticated user
 *
 * @apiParam {id} id The bucketlist's id
 *
 * @apiExample {js} Example usage:
 * const config = {
 *  "x-auth-token" : "authenticated user token"
 * }
 *
 * const url = /api/v1.0/bucketlist/50805ba5a57e900805ba5a57e90
 * const data = {
 *         name : "Example BucketList new name"
 * }
 *
 * $http.put(url, data, config)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 200) {Object} bucketList updated bucketList!
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     {
 *      "data": {
 *        "_id" : "50805ba5a57e900805ba5a57e90"
 *        "name": "Example BucketList new name",
 *        "items": [],
 *        "date_created": "2019-08-22T17:32:07.172+00:00",
 *        "date_modified":"2019-08-23T17:32:07.172+00:00"
 *        "created_by": "57e903941ca43a5f0805ba5a57e90"
 *        },
 *     }
 *
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Server Error
 *    HTTP/1.1 400 no bucket list found
 *    HTTP/1.1 401 You cannot update Items into this Bucket List!
 */
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

/**
 * @api {delete} /api/v1.0/bucketlist/{:id} Delete a BucketList
 * @apiVersion 1.0.0
 * @apiName Delete BucketList
 * @apiGroup bucketlist
 * @apiPermission authenticated user
 *
 * @apiParam {id} id The bucketlist's id
 *
 * @apiExample {js} Example usage:
 * const config = {
 *  "x-auth-token" : "authenticated user token"
 * }
 *
 * const url = /api/v1.0/bucketlist/50805ba5a57e900805ba5a57e90
 *
 * $http.delete(url, config)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 200) {String} message deleted bucketlist
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     {
 *      "data": "Deleted Successfully",
 *     }
 *
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Server Error
 *    HTTP/1.1 400 No bucketlist found
 *    HTTP/1.1 401 unauthorized user token
 *    HTTP/1.1 401 You cannot delete Items from this Bucket List!
 */
router.delete("/bucketlist/:id", auth, deleteBucketListWithId);

/**
 * @api {post} /api/v1.0/bucketlist/{:id}/items Create a BucketList Item
 * @apiVersion 1.0.0
 * @apiName Create BucketList Item
 * @apiGroup bucketlist
 * @apiPermission authenticated user
 *
 * @apiParam {id} id The bucketlist's id
 * @apiParam {item_id} id The bucketlist item's id
 *
 * @apiExample {js} Example usage:
 * const config = {
 *  "x-auth-token" : "authenticated user token"
 * }
 *
 * const url = /api/v1.0/bucketlist/50805ba5a57e900805ba5a57e90/items
 *
 * const data = {
 *    name = "Example BucketList Item name"
 * }
 * $http.post(url, data ,config)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 200) {Object} bucketlist bucketList with new item!
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     {
 *        "data": {
 *                "_id" : "50805ba5a57e900805ba5a57e90"
 *                "name": "Example BucketList new name",
 *                "items": [
 *                  {
 *                    "name": "Example BucketList Item name",
 *                    "date_created": "2019-08-22T17:32:07.172+00:00",
 *                    "date_modified":""
 *                    "done" : false
 *                  }
 *                ],
 *              "date_created": "2019-08-22T17:32:07.172+00:00",
 *              "date_modified":"2019-08-23T17:32:07.172+00:00"
 *              "created_by": "57e903941ca43a5f0805ba5a57e90"
 *          }
 *      },
 *
 *
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Server Error
 *    HTTP/1.1 400 no bucketlist found
 *    HTTP/1.1 401 unauthorized user token!
 */
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

/**
 * @api {get} /api/v1.0/bucketlist/{:id}/items/ Get BucketList Items
 * @apiVersion 1.0.0
 * @apiName Get BucketList Items
 * @apiGroup bucketlist
 * @apiPermission authenticated user
 *
 * @apiParam {id} id The bucketlist's id
 *
 * @apiExample {js} Example usage:
 * const config = {
 *  "x-auth-token" : "authenticated user token"
 * }
 *
 * const url = /api/v1.0/bucketlist/50805ba5a57e900805ba5a57e90/items/
 *
 * $http.get(url, config)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 200) {Object} item bucketList item!
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     {
 *      "data": [{
 *              "name": "Example BucketList Item name",
 *              "date_created": "2019-08-22T17:32:07.172+00:00",
 *              "date_modified":""
 *              "done" : false
 *            }]
 *
 *
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Server Error
 *    HTTP/1.1 400 no bucketlist found
 *    HTTP/1.1 401 unauthorized user token!
 */
router.get("/bucketlist/:id/items", auth, getAllItemInBucketList);

/**
 * @api {get} /api/v1.0/bucketlist/{:id}/items/{:item_id} Get a BucketList Item
 * @apiVersion 1.0.0
 * @apiName Get BucketList Item
 * @apiGroup bucketlist
 * @apiPermission authenticated user
 *
 * @apiParam {id} id The bucketlist's id
 * @apiParam {item_id} id The bucketlist item's id
 *
 * @apiExample {js} Example usage:
 * const config = {
 *  "x-auth-token" : "authenticated user token"
 * }
 *
 * const url = /api/v1.0/bucketlist/50805ba5a57e900805ba5a57e90/items/5a57e900805a57e900805a57e90080
 *
 * $http.get(url, config)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 200) {Object} item bucketList item!
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     {
 *      "data": {
 *              "name": "Example BucketList Item name",
 *              "date_created": "2019-08-22T17:32:07.172+00:00",
 *              "date_modified":""
 *              "done" : false
 *            }
 *     }
 *
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Server Error
 *    HTTP/1.1 400 no bucketlist found
 *    HTTP/1.1 400 no item with id 5a57e900805a57e900805a57e900801 found!
 *    HTTP/1.1 401 unauthorized user token!
 */
router.get("/bucketlist/:id/items/:item_id", auth, getItemFromBucketListById);

/**
 * @api {put} /api/v1.0/bucketlist/{:id}/items/{:item_id} Update a BucketList Item
 * @apiVersion 1.0.0
 * @apiName Update BucketList Item
 * @apiGroup bucketlist
 * @apiPermission authenticated user
 *
 * @apiParam {id} id The bucketlist's id
 * @apiParam {item_id} id The bucketlist item's id
 *
 * @apiExample {js} Example usage:
 * const config = {
 *  "x-auth-token" : "authenticated user token"
 * }
 *
 * const url = /api/v1.0/bucketlist/50805ba5a57e900805ba5a57e90/items/5a57e900805a57e900805a57e90080
 * const data = {
 *         name : "Example BucketList Item new name",
 *          done : true
 * }
 *
 * $http.put(url, data, config)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 200) {Object} bucketList updated bucketList!
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     {
 *      "data": {
 *              "name": "Example BucketList Item new name",
 *              "date_created": "2019-08-23T17:32:07.172+00:00",
 *              "date_modified":"2019-08-24T17:32:07.172+00:00"
 *              "done" : true
 *            }
 *     }
 *
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Server Error
 *    HTTP/1.1 400 no bucket list found
 *    HTTP/1.1 401 You cannot update Items into this Bucket List!
 */
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

/**
 * @api {delete} /api/v1.0/bucketlist/{:id}/items/{:item_id} Delete a BucketList Item
 * @apiVersion 1.0.0
 * @apiName Delete BucketList Item
 * @apiGroup bucketlist
 * @apiPermission authenticated user
 *
 * @apiParam {id} id The bucketlist's id
 * @apiParam {item_id} id The bucketlist Item's id
 *
 * @apiExample {js} Example usage:
 * const config = {
 *  "x-auth-token" : "authenticated user token"
 * }
 *
 * const url = /api/v1.0/bucketlist/50805ba5a57e900805ba5a57e90/items/5a57e900805a57e900805a57e90080
 *
 * $http.delete(url, config)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 200) {String} message deleted bucketlist item
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     {
 *      "data": "Deleted Successfully",
 *     }
 *
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Server Error
 *    HTTP/1.1 400 No bucketlist found
 *    HTTP/1.1 401 unauthorized user token
 *    HTTP/1.1 401 You cannot delete Items from this Bucket List!
 */
router.delete(
  "/bucketlist/:id/items/:item_id",
  auth,
  deleteItemFromBucketListWithId
);

module.exports = router;
