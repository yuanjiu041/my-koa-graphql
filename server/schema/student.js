import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from 'graphql'
import mongoose from 'mongoose'

import MetaType from './meta'
import { InfoType } from './info'

const StudentModel = mongoose.model('Student')

const StudentType = new GraphQLObjectType({
  name: 'Student',
  fields: {
    _id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    sex: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    },
    meta: {
      type: MetaType
    },
    info: {
      type: InfoType
    }
  }
})

function initQuery () {
  const students = {
    type: new GraphQLList(StudentType),
    args: {},
    resolve (root, params, ops) {
      return StudentModel.find().populate({
        path: 'info',
        select: 'hobby height weight'
      }).exec()
    }
  }

  return {
    students
  }
}

function initMutation () {
  const student = {
    type: StudentType,
    args: {
      name: {
        type: GraphQLString
      },
      sex: {
        type: GraphQLString
      },
      age: {
        type: GraphQLInt
      },
      info: {
        type: GraphQLID
      }
    },
    resolve: async (root, args, ops) => {
      const data = await new StudentModel(args).save()

      return StudentModel.findOne({_id: data._id}).populate({
        path: 'info',
        select: 'hobby height weight'
      }).exec()
    }
  }
  return {
    student
  }
}

export default {
  initQuery,
  initMutation
}
