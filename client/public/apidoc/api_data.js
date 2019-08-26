define({ "api": [
  {
    "type": "post",
    "url": "/api/v1.0/auth/register",
    "title": "Create a user",
    "version": "1.0.0",
    "name": "Create_User",
    "group": "Auth",
    "permission": [
      {
        "name": "no permission"
      }
    ],
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The user's name</p>"
          },
          {
            "group": "Request body",
            "type": "Email",
            "optional": false,
            "field": "email",
            "description": "<p>The user's email</p>"
          },
          {
            "group": "Request body",
            "type": "Password",
            "optional": false,
            "field": "password",
            "description": "<p>The user's password</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {\n  \"name\": \"Timothy\"\n  \"email\": \"Timothy@gmail.com\"\n  \"password\": \"password\"\n}\n\n$http.post(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>User token!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\n{\n \"token\": \"57e903941ca43a5f0805ba5a57e903941ca43a5f0805ba5a57e903941ca43a5f0805ba5a\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Server Error\nHTTP/1.1 400 User already exists",
          "type": "json"
        }
      ]
    },
    "filename": "./api/v1.0/index.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/api/v1.0/auth/login",
    "title": "Logs user in",
    "version": "1.0.0",
    "name": "Login",
    "group": "Auth",
    "permission": [
      {
        "name": "no permission"
      }
    ],
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Email",
            "optional": false,
            "field": "email",
            "description": "<p>The user's email</p>"
          },
          {
            "group": "Request body",
            "type": "Password",
            "optional": false,
            "field": "password",
            "description": "<p>The user's password</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {\n  \"email\": \"Timothy@gmail.com\"\n  \"password\": \"password\"\n}\n\n$http.post(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>User token!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\n{\n \"token\": \"57e903941ca43a5f0805ba5a57e903941ca43a5f0805ba5a57e903941ca43a5f0805ba5a\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Server Error\nHTTP/1.1 400 User already exists",
          "type": "json"
        }
      ]
    },
    "filename": "./api/v1.0/index.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/api/v1.0/bucketlist",
    "title": "Create a BucketList",
    "version": "1.0.0",
    "name": "Create_BucketList",
    "group": "bucketlist",
    "permission": [
      {
        "name": "authenticated user"
      }
    ],
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The bucketlist's name</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {\n  \"name\": \"Example BucketList\"\n}\n\nconst config = {\n \"x-auth-token\" : \"authenticated user token\"\n}\n\n$http.post(url, data, config)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "bucketList",
            "description": "<p>Newly Created bucketList!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\n{\n \"data\": {\n   \"_id\" : \"50805ba5a57e900805ba5a57e90\"\n   \"name\": \"Example BucketList\",\n   \"items\": [],\n   \"date_created\": \"2019-08-22T17:32:07.172+00:00\",\n   \"date_modified\":\"\"\n   \"created_by\": \"57e903941ca43a5f0805ba5a57e90\"\n   },\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Server Error\nHTTP/1.1 400 User not found",
          "type": "json"
        }
      ]
    },
    "filename": "./api/v1.0/index.js",
    "groupTitle": "bucketlist"
  },
  {
    "type": "post",
    "url": "/api/v1.0/bucketlist/{:id}/items",
    "title": "Create a BucketList Item",
    "version": "1.0.0",
    "name": "Create_BucketList_Item",
    "group": "bucketlist",
    "permission": [
      {
        "name": "authenticated user"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>The bucketlist's id</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "const config = {\n \"x-auth-token\" : \"authenticated user token\"\n}\n\nconst url = /api/v1.0/bucketlist/50805ba5a57e900805ba5a57e90/items\n\nconst data = {\n   name = \"Example BucketList Item name\"\n}\n$http.post(url, data ,config)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "bucketlist",
            "description": "<p>bucketList with new item!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\n{\n   \"data\": {\n           \"_id\" : \"50805ba5a57e900805ba5a57e90\"\n           \"name\": \"Example BucketList new name\",\n           \"items\": [\n             {\n               \"name\": \"Example BucketList Item name\",\n               \"date_created\": \"2019-08-22T17:32:07.172+00:00\",\n               \"date_modified\":\"\"\n               \"done\" : false\n             }\n           ],\n         \"date_created\": \"2019-08-22T17:32:07.172+00:00\",\n         \"date_modified\":\"2019-08-23T17:32:07.172+00:00\"\n         \"created_by\": \"57e903941ca43a5f0805ba5a57e90\"\n     }\n },",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Server Error\nHTTP/1.1 400 no bucketlist found\nHTTP/1.1 401 unauthorized user token!",
          "type": "json"
        }
      ]
    },
    "filename": "./api/v1.0/index.js",
    "groupTitle": "bucketlist"
  },
  {
    "type": "delete",
    "url": "/api/v1.0/bucketlist/{:id}",
    "title": "Delete a BucketList",
    "version": "1.0.0",
    "name": "Delete_BucketList",
    "group": "bucketlist",
    "permission": [
      {
        "name": "authenticated user"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>The bucketlist's id</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "const config = {\n \"x-auth-token\" : \"authenticated user token\"\n}\n\nconst url = /api/v1.0/bucketlist/50805ba5a57e900805ba5a57e90\n\n$http.delete(url, config)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>deleted bucketlist</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\n{\n \"data\": \"Deleted Successfully\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Server Error\nHTTP/1.1 400 No bucketlist found\nHTTP/1.1 401 unauthorized user token\nHTTP/1.1 401 You cannot delete Items from this Bucket List!",
          "type": "json"
        }
      ]
    },
    "filename": "./api/v1.0/index.js",
    "groupTitle": "bucketlist"
  },
  {
    "type": "delete",
    "url": "/api/v1.0/bucketlist/{:id}/items/{:item_id}",
    "title": "Delete a BucketList Item",
    "version": "1.0.0",
    "name": "Delete_BucketList_Item",
    "group": "bucketlist",
    "permission": [
      {
        "name": "authenticated user"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>The bucketlist's id</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "const config = {\n \"x-auth-token\" : \"authenticated user token\"\n}\n\nconst url = /api/v1.0/bucketlist/50805ba5a57e900805ba5a57e90/items/5a57e900805a57e900805a57e90080\n\n$http.delete(url, config)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>deleted bucketlist item</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\n{\n \"data\": \"Deleted Successfully\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Server Error\nHTTP/1.1 400 No bucketlist found\nHTTP/1.1 401 unauthorized user token\nHTTP/1.1 401 You cannot delete Items from this Bucket List!",
          "type": "json"
        }
      ]
    },
    "filename": "./api/v1.0/index.js",
    "groupTitle": "bucketlist"
  },
  {
    "type": "get",
    "url": "/api/v1.0/bucketlist/{:id}",
    "title": "Fetch a BucketList",
    "version": "1.0.0",
    "name": "Fetch_BucketList",
    "group": "bucketlist",
    "permission": [
      {
        "name": "authenticated user"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>The bucketlist's id</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "const config = {\n \"x-auth-token\" : \"authenticated user token\"\n}\n\nconst url = /api/v1.0/bucketlist/50805ba5a57e900805ba5a57e90\n$http.get(url, config)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "bucketList",
            "description": "<p>Fetch bucketList!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\n{\n \"data\": {\n   \"_id\" : \"50805ba5a57e900805ba5a57e90\"\n   \"name\": \"Example BucketList\",\n   \"items\": [],\n   \"date_created\": \"2019-08-22T17:32:07.172+00:00\",\n   \"date_modified\":\"\"\n   \"created_by\": \"57e903941ca43a5f0805ba5a57e90\"\n   },\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Server Error\nHTTP/1.1 400 no bucket list found\nHTTP/1.1 401 unauthorized user token",
          "type": "json"
        }
      ]
    },
    "filename": "./api/v1.0/index.js",
    "groupTitle": "bucketlist"
  },
  {
    "type": "get",
    "url": "/api/v1.0/bucketlist",
    "title": "Get all User's BucketLists",
    "version": "1.0.0",
    "name": "Fetch_BucketLists",
    "group": "bucketlist",
    "permission": [
      {
        "name": "authenticated user"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "\nconst config = {\n \"x-auth-token\" : \"authenticated user token\"\n}\n\n$http.get(url, config)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "bucketLists",
            "description": "<p>Array of user's BucketLists!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\n{\n \"data\": [{\n   \"_id\" : \"50805ba5a57e900805ba5a57e90\"\n   \"name\": \"Example BucketList\",\n   \"items\": [],\n   \"date_created\": \"2019-08-22T17:32:07.172+00:00\",\n   \"date_modified\":\"\"\n   \"created_by\": \"57e903941ca43a5f0805ba5a57e90\"\n   }],\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Server Error\nHTTP/1.1 401 unauthorized user token\nHTTP/1.1 400 no bucketlist found",
          "type": "json"
        }
      ]
    },
    "filename": "./api/v1.0/index.js",
    "groupTitle": "bucketlist"
  },
  {
    "type": "get",
    "url": "/api/v1.0/bucketlist/{:id}/items/{:item_id}",
    "title": "Get a BucketList Item",
    "version": "1.0.0",
    "name": "Get_BucketList_Item",
    "group": "bucketlist",
    "permission": [
      {
        "name": "authenticated user"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>The bucketlist's id</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "const config = {\n \"x-auth-token\" : \"authenticated user token\"\n}\n\nconst url = /api/v1.0/bucketlist/50805ba5a57e900805ba5a57e90/items/5a57e900805a57e900805a57e90080\n\n$http.get(url, config)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "item",
            "description": "<p>bucketList item!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\n{\n \"data\": {\n         \"name\": \"Example BucketList Item name\",\n         \"date_created\": \"2019-08-22T17:32:07.172+00:00\",\n         \"date_modified\":\"\"\n         \"done\" : false\n       }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Server Error\nHTTP/1.1 400 no bucketlist found\nHTTP/1.1 400 no item with id 5a57e900805a57e900805a57e900801 found!\nHTTP/1.1 401 unauthorized user token!",
          "type": "json"
        }
      ]
    },
    "filename": "./api/v1.0/index.js",
    "groupTitle": "bucketlist"
  },
  {
    "type": "get",
    "url": "/api/v1.0/bucketlist/{:id}/items/",
    "title": "Get BucketList Items",
    "version": "1.0.0",
    "name": "Get_BucketList_Items",
    "group": "bucketlist",
    "permission": [
      {
        "name": "authenticated user"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>The bucketlist's id</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "const config = {\n \"x-auth-token\" : \"authenticated user token\"\n}\n\nconst url = /api/v1.0/bucketlist/50805ba5a57e900805ba5a57e90/items/\n\n$http.get(url, config)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "item",
            "description": "<p>bucketList item!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\n{\n \"data\": [{\n         \"name\": \"Example BucketList Item name\",\n         \"date_created\": \"2019-08-22T17:32:07.172+00:00\",\n         \"date_modified\":\"\"\n         \"done\" : false\n       }]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Server Error\nHTTP/1.1 400 no bucketlist found\nHTTP/1.1 401 unauthorized user token!",
          "type": "json"
        }
      ]
    },
    "filename": "./api/v1.0/index.js",
    "groupTitle": "bucketlist"
  },
  {
    "type": "put",
    "url": "/api/v1.0/bucketlist/{:id}",
    "title": "Update a BucketList",
    "version": "1.0.0",
    "name": "Update_BucketList",
    "group": "bucketlist",
    "permission": [
      {
        "name": "authenticated user"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>The bucketlist's id</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "const config = {\n \"x-auth-token\" : \"authenticated user token\"\n}\n\nconst url = /api/v1.0/bucketlist/50805ba5a57e900805ba5a57e90\nconst data = {\n        name : \"Example BucketList new name\"\n}\n\n$http.put(url, data, config)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "bucketList",
            "description": "<p>updated bucketList!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\n{\n \"data\": {\n   \"_id\" : \"50805ba5a57e900805ba5a57e90\"\n   \"name\": \"Example BucketList new name\",\n   \"items\": [],\n   \"date_created\": \"2019-08-22T17:32:07.172+00:00\",\n   \"date_modified\":\"2019-08-23T17:32:07.172+00:00\"\n   \"created_by\": \"57e903941ca43a5f0805ba5a57e90\"\n   },\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Server Error\nHTTP/1.1 400 no bucket list found\nHTTP/1.1 401 You cannot update Items into this Bucket List!",
          "type": "json"
        }
      ]
    },
    "filename": "./api/v1.0/index.js",
    "groupTitle": "bucketlist"
  },
  {
    "type": "put",
    "url": "/api/v1.0/bucketlist/{:id}/items/{:item_id}",
    "title": "Update a BucketList Item",
    "version": "1.0.0",
    "name": "Update_BucketList_Item",
    "group": "bucketlist",
    "permission": [
      {
        "name": "authenticated user"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>The bucketlist's id</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "const config = {\n \"x-auth-token\" : \"authenticated user token\"\n}\n\nconst url = /api/v1.0/bucketlist/50805ba5a57e900805ba5a57e90/items/5a57e900805a57e900805a57e90080\nconst data = {\n        name : \"Example BucketList Item new name\",\n         done : true\n}\n\n$http.put(url, data, config)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "bucketList",
            "description": "<p>updated bucketList!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\n{\n \"data\": {\n         \"name\": \"Example BucketList Item new name\",\n         \"date_created\": \"2019-08-23T17:32:07.172+00:00\",\n         \"date_modified\":\"2019-08-24T17:32:07.172+00:00\"\n         \"done\" : true\n       }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Server Error\nHTTP/1.1 400 no bucket list found\nHTTP/1.1 401 You cannot update Items into this Bucket List!",
          "type": "json"
        }
      ]
    },
    "filename": "./api/v1.0/index.js",
    "groupTitle": "bucketlist"
  }
] });
