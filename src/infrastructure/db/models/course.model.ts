import mongoose, { Schema, Document } from "mongoose"
import { ICourse } from "../../../domain/models/course.interface"

// Subschema for Syllabus.RequiredMaterials
const materialSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 200,
        },
        author: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 100,
        },
        publisher: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 100,
        },
        year: {
            type: String,
            required: true,
            match: /^\d{4}$/,
            message: "Year must be a 4-digit number",
        },
        required: { type: Boolean, required: true },
    },
    { _id: false }
)

// Subschema for Syllabus.GradingPolicy (dynamic key-value pairs)
const gradingPolicySchema = new Schema(
    {
        percentage: { type: Number, required: true, min: 0, max: 100 },
        description: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 200,
        },
    },
    { _id: false }
)

// Subschema for Syllabus.WeeklySchedule
const weeklyScheduleSchema = new Schema(
    {
        week: { type: Number, required: true, min: 1 },
        topic: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 200,
        },
        readings: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 500,
        },
        assignments: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 500,
        },
    },
    { _id: false }
)

// Syllabus subschema
const syllabusSchema = new Schema(
    {
        courseTitle: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 200,
        },
        instructor: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 100,
        },
        term: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 50,
        },
        courseDescription: {
            type: String,
            required: true,
            trim: true,
            minlength: 10,
            maxlength: 1000,
        },
        learningObjectives: {
            type: [String],
            required: true,
            validate: {
                validator: (arr: string[]) => arr.length > 0,
                message: "At least one learning objective is required",
            },
        },
        requiredMaterials: {
            type: [materialSchema],
            required: true,
            default: [],
        },
        gradingPolicy: {
            type: Map,
            of: gradingPolicySchema,
            required: true,
            validate: {
                validator: (map: Map<string, any>) => map.size > 0,
                message: "At least one grading policy component is required",
            },
        },
        weeklySchedule: {
            type: [weeklyScheduleSchema],
            required: true,
            default: [],
        },
        policies: { type: Map, of: String, required: true, default: new Map() },
    },
    { _id: false }
)

// Course schema
const courseSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 200,
        },
        description: {
            type: String,
            required: true,
            trim: true,
            minlength: 10,
            maxlength: 1000,
        },
        subject: {
            type: String,
            required: true,
            trim: true,
            enum: {
                values: [
                    "english",
                    "math",
                    "science",
                    "history",
                    "art",
                    "music",
                    "computerScience",
                    "foreignLanguage",
                    "physicalEducation",
                    "other",
                ],
                message: "{VALUE} is not a valid subject",
            },
        },
        gradeLevel: {
            type: String,
            required: true,
            trim: true,
            enum: {
                values: [
                    "elementary",
                    "middleSchool",
                    "highSchool",
                    "undergraduate",
                    "graduate",
                    "professional",
                ],
                message: "{VALUE} is not a valid grade level",
            },
        },
        students: { type: Number, default: 0, min: 0 },
        assignments: { type: Number, default: 0, min: 0 },
        syllabus: { type: syllabusSchema, required: false },
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        createdAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        strict: "throw", // Reject unknown fields
    }
)

// Virtual for id (maps _id to id for frontend compatibility)
courseSchema.virtual("id").get(function () {
    return this._id.toHexString()
})

// Ensure indexes for efficient queries
courseSchema.index({ userId: 1 })
courseSchema.index({ subject: 1, gradeLevel: 1 })

// Create and export the model
const Course = mongoose.model<ICourse & Document>("Course", courseSchema)

export default Course
