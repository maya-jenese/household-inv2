const express = require('express');
const router = express.Router();

// Load Property model
const Property = require('../../models/property');

// @route GET api/properties/test
// @description tests properties route
// @access Public
router.get('/test', (req, res) => res.send('property route testing!'));

// @route GET api/properties
// @description Get all properties
// @access Public
router.get('/', (req, res) => {
  Property.find()
    .then(properties => res.json(properties))
    .catch(err => res.status(404).json({ message: 'No Properties found' }));
});

// @route GET api/properties/:id
// @description Get single book by id
// @access Public
router.get('/:id', (req, res) => {
  Property.findById(req.params.id)
    .then(property => res.json(property))
    .catch(err => res.status(404).json({ message: 'No Property found' }));
});

// @route GET api/properties
// @description add/save property
// @access Public
router.post('/', (req, res) => {
  Property.create(req.body)
    .then(property => res.json({ msg: 'Property added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this property' }));
});

// @route GET api/properties/:id
// @description Update property
// @access Public
router.put('/:id', (req, res) => {
  Property.findByIdAndUpdate(req.params.id, req.body)
    .then(property => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET api/properties/:id
// @description Delete property by id
// @access Public
router.delete('/:id', (req, res) => {
  Property.findByIdAndRemove(req.params.id, req.body)
    .then(book => res.json({ mgs: 'Property entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a property' }));
});

module.exports = router;