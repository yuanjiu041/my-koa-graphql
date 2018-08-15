import mongoose from 'mongoose'
import router from '../libs/router-desc'

const InfoModel = mongoose.model('Info')

const saveInfo = async (ctx, next) => {
  const info = new InfoModel(ctx.request.body)
  const data = await info.save()

  if (data) {
    ctx.body = {
      data
    }
  } else {
    throw new Error('save failed')
  }
}
saveInfo.method = 'post'
saveInfo.route = '/info'

const getInfo = async (ctx, next) => {
  const data = await InfoModel.find(ctx.request.body)

  ctx.body = data
}
getInfo.method = 'post'
getInfo.route = '/info/query'

module.exports = {
  saveInfo,
  getInfo
}
