const { ObjectId } = require('bson');
const {Schema, model} = require('mongoose');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: new ObjectId
    },
    reactionBody: {
        type: String,

    },
    username: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: new Date.now()
    }
});

const Reaction = model('Reaction', ReactionSchema);

module.exports = Reaction;