import { Request } from 'express'
import * as graphqlHTTP from 'express-graphql'
import { GraphQLSchema, GraphQLObjectType  } from 'graphql'
import { IResponse } from './types'
import { 
    posts,
    addPost,
    editPost,
    deletePost
 } from './graphql/posts'


const schema = new GraphQLSchema({
    query: new GraphQLObjectType({ name: 'Query', fields: {
        posts
    } }),
    mutation: new GraphQLObjectType({ name: 'Mutation', fields: {
        addPost,
        editPost,
        deletePost
    } }),
})

export function getGraphqlMiddleware() {
    return graphqlHTTP((req: Request, res: IResponse) => {
        return {
            schema,
            context: res.locals,
            graphiql: true,
            customFormatErrorFn: err => {
                console.log('error', err.message, 'bootstrap/graphql.formatError')
                return {
                    message: err.message,
                    locations: err.locations,
                    stack: err.stack ? err.stack.split('\n') : [],
                    path: err.path,
                }
            },
        }
    })
}