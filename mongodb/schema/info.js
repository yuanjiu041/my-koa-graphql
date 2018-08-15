import mongoose from 'mongoose'

const { Schema } = mongoose

const InfoSchema = new Schema({
  hobby: [String],
  height: Number,
  weight: Number,
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

InfoSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createTime = this.meta.updateTime = Date.now()
  } else {
    this.meta.updateTime = Date.now()
  }

  next()
})

mongoose.model('Info', InfoSchema)
