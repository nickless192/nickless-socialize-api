const {Schema, model} = require('mongoose');
const {isEmail} = require('../utils/validators');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: isEmail
    },
    thoughts: [
            {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
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

UserSchema.virtual('friendsCount', function() {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;