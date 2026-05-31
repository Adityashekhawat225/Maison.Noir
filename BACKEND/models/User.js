import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        match: [/^[A-Za-z ]+$/, "Username should contain only letters"]
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
    },

    mobile: {
        type: String,
        required: true,
        match: [/^[0-9]{10}$/, "Mobile number must be 10 digits"]
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    }

});

const User = mongoose.model("User", userSchema);

export default User;