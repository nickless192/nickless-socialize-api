const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'thought'
    }],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'friends'
        }
    ]
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);

const User = model('User', UserSchema);

module.exports = User;