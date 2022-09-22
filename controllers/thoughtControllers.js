const { Thought, User } = require('../models');

const thoughtControllers = {
    // get all thoughts
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
    // get thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(500).json(err));
    },
    // creates thought then adds it to the user
    createThought({ body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate({ username: body.username }, {
                    $push: { thoughts: _id }
                },
                    { new: true, runValidators: true }
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
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(500).json(err));
    },
    // update thought then replace it in the user
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true, runValidators: true })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id' });
                    return;
                }
                return User.findOneAndUpdate({ username: dbThoughtData.username }, {
                    $push: { thought: params.thoughtId }
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
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(500).json(err));
    },
    // deletes thought then removes it from the user
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id' });
                    return;
                }
                return User.findOneAndUpdate({ username: dbThoughtData.username }, {
                    $pull: { thought: params.thoughtId }
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
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(500).json(err));
    },
    // add a reaction to a thought
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, {
            $push: { reactions: body }
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
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(500).json(err));
    },
    // removes reaction from the thought
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate({
            _id: params.thoughtId
        }, {
            $pull: { reactions: { reactionId: params.reactionId } }
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
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(500).json(err));
    }
}

module.exports = thoughtControllers;