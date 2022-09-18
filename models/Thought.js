const {Schema, model} = require('mongoose');

const ThoughtSchema = new Schema({
        thoughtTest: {
            type: String
        },
        creatAt: {
            type: Date,
            default: Date.now()
        },
        username: {
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