const {User} = require('../models');

const userControllers = {
    // get all users
    getUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .sort({_id: -1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },
    // get user by id
    getUserById({params}, res) {
        User.findById({_id: params.userId})
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(500).json(err));
    },
    // create new user
    createUser({body}, res) {
        User.create(body).
        then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },
    // add a friend
    addFriend({params}, res) {
        User.findOneAndUpdate({
            _id: params.userId
        }, {
            $push: {
                friends: params.friendId
            }
        }, {
            new: true,
            runValidators: true
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(500).json(err));
    },
    // remove friend
    removeFriend({params}, res) {
        User.findOneAndUpdate({
            _id: params.userId
        }, {
            $pull: {
                friends: params.friendId
            }
        }, {
            new: true,
            runValidators: true
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(500).json(err));
    },
    // update user's information
    updateUser({params, body}, res) {
        User.findByIdAndUpdate({_id: params.userId}, body, {new: true})
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(500).json(err));
    },
    deleteUser({params}, res) {
        User.findByIdAndDelete({_id: params.userId})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(500).json(err));
    }
};

module.exports = userControllers;