import mongoose, { Schema, Types } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new mongoose.Schema(
    {
        videoFile : {
            type : String,    // Cloudnary URL
            required : true,
        },
        thumbnail : {
            type : String,    // Cloudnary URL
            required : true,
        },
        title : {
            type : String,    
            required : true,
        },
        description : {
            type : String,    
            required : true,
        },
        views : {
            type : Number,    // Cloudnary URL
            required : true,
            default : 0
        },
        duration : {
            type : Number,    // Cloudnary URL
            required : true
        },
        isPublished : {
            type : Boolean,
            required : true
        },
        owner : {
            type : Schema.Types.ObjectId,
            ref : "User"
        }

    },
    {
        timestamps : true
    }
);

videoSchema.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model("Video", videoSchema)
