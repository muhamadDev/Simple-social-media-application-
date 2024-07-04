import mongoose from "mongoose";

const Posts = mongoose.Schema({
    title: {
        type: String,
        required: true,
        max: 60,
    },
    desc: {
        type: String,
    },
    userId: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    }
},{
    timestamps: true,
});


const Users = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    img: {
        type: String,
    },
    userId: {
        type: String,
        required: true,
        unique: true
    }
},{
    timestamps: true,
});

const Likes = mongoose.Schema({
    postId: {
        type: String,
        required: true,
    },
    ownerId: {
        type: String,
        required: true
    },
});


const posts = mongoose.models.Posts || mongoose.model("Posts", Posts);
const users = mongoose.models.Users || mongoose.model("Users", Users);
const likes = mongoose.models.Likes || mongoose.model("Likes", Likes);
export {
    users,
    posts,
    likes
} 