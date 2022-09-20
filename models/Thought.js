const {Schema, model} = require('mongoose');

const ThoughtSchema = new Schema({
        thoughtText: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now()
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Reactions'
            }
        ]
}, {
    toJSON: {
        virtuals: true
    }
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;