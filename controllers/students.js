import mongoose from 'mongoose'
import router from '../libs/router-desc'

const StudentModel = mongoose.model('Student')

const saveStudent = async (ctx, next) => {
  const student = new StudentModel(ctx.request.body)
  const data = await student.save()

  if (data) {
    ctx.body = {
      data
    }
  } else {
    throw new Error('save failed')
  }
}
saveStudent.method = 'post'
saveStudent.route = '/student'

const getStudent = async (ctx, next) => {
  const data = await StudentModel.find(ctx.request.body).populate({
    path: 'info',
    select: 'hobby height weight'
  }).exec()

  ctx.body = data
}
getStudent.method = 'post'
getStudent.route = '/student/query'

module.exports = {
  saveStudent,
  getStudent
}
