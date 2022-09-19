const {User, Thought, Reaction} = require('../models');

const userControllers = {
    getUsers(req, res) {
        User.find({})
        .then(dbUserData => {
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    getUserById({params}, res) {
        User.findById({_id: params.userId})
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
    createUser({body}, res) {
        User.create(body).
        then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },
    updateUser({params, body}, res) {
        User.findByIdAndUpdate({_id: params.userId}, body, {new: true})
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