import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
  isOutputType
} from 'graphql'

import mongoose from 'mongoose'
import MetaType from './meta'

const InfoModel = mongoose.model('Info')

export const InfoType = new GraphQLObjectType({
  name: 'Info',
  fields: {
    _id: {
      type: GraphQLID
    },
    height: {
      type: GraphQLInt
    },
    weight: {
      type: GraphQLInt
    },
    hobby: {
      type: new GraphQLList(GraphQLString)
    },
    meta: {
      type: MetaType
    }
  }
})

function initQuery () {
  const infos = {
    type: new GraphQLList(InfoType),
    args: {},
    resolve (root, params, ops) {
      return InfoModel.find().exec()
    } 
  }

  const info = {
    type: InfoType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve (root, params, ops) {
      return InfoModel.findOne({_id: params.id}).exec()
    }
  }

  return {
    infos,
    info
  }
}

function initMutation () {
  const info = {
    type: InfoType,
    args: {
      height: {
        type: GraphQLInt
      },
      weight: {
        type: GraphQLInt
      },
      hobby: {
        type: new GraphQLList(GraphQLString)
      }
    },
    resolve: async (root, params, ops) => {
      return await new InfoModel(params).save()
    }
  }

  return {
    info
  }
}

export default {
  initMutation,
  initQuery
}
