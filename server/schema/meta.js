import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

const MetaType = new GraphQLObjectType({
  name: 'Meta',
  fields: {
    createTime: {
      type: GraphQLString
    },
    updateTime: {
      type: GraphQLString
    }
  }
})

export default MetaType
