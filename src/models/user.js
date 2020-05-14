const mongoose = require('mongoose');
const crypto = require('crypto');
const {v4: uuidv4} = require('uuid');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: {
        type: String
    }
}, {
    timestamps: true
});

userSchema.virtual('password')
    .set(
        function(password) {
            this._password = password;
            this.salt = uuidv4();
            this.hashed_password = this.encryptPassword(password);
        }
    )
    .get(
        function() {
            return this._password;
        }
    );

userSchema.methods = {
    encryptPassword:
        function(password) {
            if (!password) {
                return '';
            } else {
                try {
                    return crypto.createHmac('sha1', this.salt)
                            .update(password)
                            .digest('hex');
                } catch (error) {
                    return '';
                }
            }
        },
    authenticate: 
        function(plainText) {
            return this.encryptPassword(plainText) === this.hashed_password;
        }
}

module.exports = mongoose.model('User', userSchema);