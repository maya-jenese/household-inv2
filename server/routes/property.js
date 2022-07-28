const express = require("express");
const router = express.Router();
//const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

// Load Property model
const Property = require("../models/property");

// @route GET api/properties/test
// @description tests properties route
// @access Public
router.get("/test", (req, res) => res.send("property route testing!"));

// @route GET api/properties
// @description Get all properties
// @access Public
router.get("/get-properties", async (req, res) => {
  // Property.find()
  //   .then(properties => res.json(properties))
  //   .catch(err => res.status(404).json({ message: 'No Properties found' }));
  //console.log("Here");

  const userProperties = await Property.find({});
  //console.log(userProperties);
  try {
    res.status(200).json({
      status: "Success",
      data: {
        userProperties,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err,
    });
  }
});

// @route GET api/books/:id
// @description Get single book by id
// @access Public
router.get("/:id", (req, res) => {
  Property.findById(req.params.id)
    .then((property) => res.json(property))
    .catch((err) => res.status(404).json({ message: "No Property found" }));
});

// @route GET api/properties
// @description add/save property
// @access Public
router.post("/", async (req, res) => {
  const propertyToAdd = new Property({
    ...req.body,
    property_description: req.body.property_description,
    property_cost: req.body.property_cost,
    property_quantity: req.body.property_quantity,
  });

  //const tokenContents = jwt.verify(req.body.token, `${process.env.JWTPRIVATEKEY}`);

  User.findByIdAndUpdate(
    req.body.user_id,
    {
      $push: {
        properties: [propertyToAdd._id],
      },
    },
    function (err, user) {
      if (err) {
        console.log(err);
      } else {
        res.status(500).send({ message: "Property successfully added" });
      }
    }
  );

  await propertyToAdd.save();
});

// @route GET api/properties/:id
// @description Update property
// @access Public
router.put("/:id", (req, res) => {
  Property.findByIdAndUpdate(req.params.id, req.body)
    .then((property) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// @route GET api/properties/:id
// @description Delete properties by id
// @access Public
router.delete("/:id", (req, res) => {
  Book.findByIdAndRemove(req.params.id, req.body)
    .then((book) => res.json({ mgs: "Property entry deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such a book" }));
});

module.exports = router;
