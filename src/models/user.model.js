import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true, 
        index : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true
    },
    fullname : {
        type : String,
        required : true,
        lowercase : true,
        trim : true, 
        index : true
    },
    avatar : {
        type : String,    // Cloudnary URL
        required : true,
    },
    coverImage : {
        type : String   // Cloudnary URL  
    },
    watchHistory : [
        {
            type : Schema.Types.ObjectId,
            ref : "Video"
        }
    ],
    password : {
        type : String,
        required : [true, "Password Is Required"]
    },
    refreshToken : {
        type : String
    }
    
}, 
{
    timestamps: true
})


userSchema.pre("save", async function(next){    // Here we cant write arrow fn, bcoz we need this          (reference), but arrow fn dont support this keyword

    if(!this.isModified("password")) return next()

    this.password = bcrypt.hash(this.password, 10)
    next()

})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}


userSchema.methods.generateAccessToken = function(){
    // sign method generates the access token
    return jwt.sign(
        {
            _id : this._id,   // From Mongo Database
            email : this.email,
            username : this.username,
            fullname : this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : ACCESS_TOKEN_EXPIRY
        }
    )
}


userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id : this._id  // Form Database
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : REFRESH_TOKEN_EXPITY
        }
    )
}

export const User = mongoose.model("User", userSchema)