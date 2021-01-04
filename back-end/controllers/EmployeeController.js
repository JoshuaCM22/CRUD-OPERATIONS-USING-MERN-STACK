const express = require("express");

let router = express.Router();

let ObjectID = require("mongoose").Types.ObjectId;

let { Employee } = require("../models/Employee");

// GET: http://localhost:4000/CRUD_OPERATIONS_USING_MERN_STACK_DB
router.get("/", (request, response) => {
  Employee.find((error, docs) => {
    if (!error) {
      response.send(docs);
    } else {
      console.log(
        "Error while retrieving all records : " +
          JSON.stringify(error, undefined, 2)
      );
    }
  });
});

// GET: http://localhost:4000/CRUD_OPERATIONS_USING_MERN_STACK_DB/_id
router.get("/:id", (request, response) => {
  if (!ObjectID.isValid(request.params.id)) {
    return response
      .status(400)
      .send("No record with given id : " + request.params.id);
  }

  Employee.findById(request.params.id, (error, docs) => {
    if (!error) {
      return response.send(docs);
    } else {
      console.log(
        "Error while getting this record : " +
          JSON.stringify(error, undefined, 2)
      );
    }
  });
});

// POST: http://localhost:4000/CRUD_OPERATIONS_USING_MERN_STACK_DB
router.post("/", (request, response) => {
  let newRecord = new Employee({
    Full_Name: request.body.Full_Name,
    Position: request.body.Position,
    Mobile_No: request.body.Mobile_No,
  });

  newRecord.save((error, docs) => {
    if (!error) {
      response.send(docs);
    } else {
      console.log(
        "Error while creating new record : " +
          JSON.stringify(error, undefined, 2)
      );
    }
  });
});

// PUT: http://localhost:4000/CRUD_OPERATIONS_USING_MERN_STACK_DB/_id
router.put("/:id", (request, response) => {
  if (!ObjectID.isValid(request.params.id)) {
    return response
      .status(400)
      .send("No record with given id : " + request.params.id);
  }
  let updatedRecord = {
    Full_Name: request.body.Full_Name,
    Position: request.body.Position,
    Mobile_No: request.body.Mobile_No,
  };

  Employee.findByIdAndUpdate(
    request.params.id,
    { $set: updatedRecord },
    { new: true },
    (error, docs) => {
      if (!error) {
        return response.send(docs);
      } else {
        console.log(
          "Error while updating new record : " +
            JSON.stringify(error, undefined, 2)
        );
      }
    }
  );
});

// DELETE: http://localhost:4000/CRUD_OPERATIONS_USING_MERN_STACK_DB/_id
router.delete("/:id", (request, response) => {
  if (!ObjectID.isValid(request.params.id)) {
    return response
      .status(400)
      .send("No record with given id : " + request.params.id);
  }

  Employee.findByIdAndRemove(request.params.id, (error, docs) => {
    if (!error) {
      response.send(docs);
    } else {
      console.log(
        "Error while deleting this record : " +
          JSON.stringify(error, undefined, 2)
      );
    }
  });
});

module.exports = router;
