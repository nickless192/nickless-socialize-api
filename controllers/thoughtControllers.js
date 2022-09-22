const {Thought, User} = require('../models');

const thoughtControllers = {
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.status(500).json(err));
    },
    getThoughtById({params}, res) {
        Thought.findOne({_id: params.thoughtId})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'No thought found with this id'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(500).json(err));
    },
    createThought({body}, res) {
        Thought.create(body)
        .then(({_id}) => {
           return User.findOneAndUpdate({username: body.username}, {
            $push: {thoughts: _id}
           },
            {new: true, runValidators: true}
           )
           .populate({
            path: 'friends',
            select: '-__v'
            })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v');
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
    updateThought({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.thoughtId}, body, {new:true, runValidators: true})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({message: 'No thought found with this id'});
                    return;
                }
                return User.findOneAndUpdate({username: dbThoughtData.username}, {
                    $push: {thought: params.thoughtId}
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
                .select('-__v');
            })
            .then (dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({message: 'No user found with this id'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(500).json(err));
    },
    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id: params.thoughtId})
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({message: 'No thought found with this id'});
                    return;
                }
                return User.findOneAndUpdate({username: dbThoughtData.username}, {
                    $pull: {thought: params.thoughtId}
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
    addReaction({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.thoughtId}, {
            $push: {reactions: body}
        },
        {
            new: true,
            runValidators: true
        })
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'No thought found with this id'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(500).json(err));
    },
    removeReaction({params}, res) {
        Thought.findOneAndUpdate({
            _id: params.thoughtId
        }, {
            $pull: {reactions: {reactionId: params.reactionId}}
        }, {
            new: true,
            runValidators: true
        })
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'No thought found with this id'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(500).json(err));
    }
}

module.exports = thoughtControllers;