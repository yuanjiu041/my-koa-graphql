import {
  GraphQLSchema,
  GraphQLObjectType
} from 'graphql'

import Info from './info'
import Student from './student'

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Queries',
    fields: {
      ...Info.initQuery(),
      ...Student.initQuery()
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutations',
    fields: {
      ...Info.initMutation(),
      ...Student.initMutation()
    }
  })
})
