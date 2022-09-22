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
        // run email validation, return message if validation fails
        validate: [isEmail, 'Wrong email format']
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
        // virtual to return the number of friends associated to the user
        virtuals: true,
        getters: true
    },
    id: false
}
);

UserSchema.virtual('friendsCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;