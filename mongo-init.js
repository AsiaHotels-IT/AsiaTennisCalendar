const { Collection } = require("mongoose");

db = db.getSiblingDB('tennis');

// สร้าง user admin (readWrite)
db.createUser({
  user: "dev",
  pwd: "AsiadevBkk",
  roles: [
    { role: "readWrite", db: "tennis" }
  ]
});

