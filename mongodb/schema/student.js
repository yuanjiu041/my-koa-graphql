import mongoose from 'mongoose'

const { Schema } = mongoose
const { Types: { ObjectId } } = Schema

const StudentSchema = new Schema({
  name: String,
  sex: String,
  age: Number,
  info: {
    type: ObjectId,
    ref: 'Info'
  },
  meta: {
    createTime: {
      type: Date,
      default: Date.now()
    },
    updateTime: {
      type: Date,
      default: Date.now()
    }
  }
})

StudentSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createTime = this.meta.updateTime = Date.now()
  } else {
    this.meta.updateTime = Date.now()
  }

  next()
})

mongoose.model('Student', StudentSchema)
