const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/CRUD_OPERATIONS_USING_MERN_STACK_DB",
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  (error) => {
    if (!error) {
      console.log("MongoDB Connected Successfully");
    } else {
      console.log(
        "MongoDB Not Connected Successfully. Error Message is: " +
          JSON.stringify(error, undefined, 2)
      );
    }
  }
);
