const router = require('express').Router();
const {getAllThoughts, getThoughtById, createThought, updateThought, deleteThought} = require('../../controllers/thoughtControllers')

router.route('/')
    .get(getAllThoughts)
    .post(createThought);

router.route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

module.exports = router;