const router = require('express').Router();
const {User, Reaction, Thought} = require('../../models');
const {getUsers, createUser, getUserById, deleteUser, updateUser} = require('../../controllers/userControllers');

router.route('/')
    .get(getUsers)
    .post(createUser)

router.route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;