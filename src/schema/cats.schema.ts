import { ApolloError } from 'apollo-server-express'

export class CreateCatInput {
  name?: string
  age?: number
}

export class UpdateCatInput {
  _id: string
  name?: string
  age?: number
}

export class Cat {
  _id?: string
  name?: string
  age?: number

  constructor(args: any) {
    this._id = args._id
    this.name = args.name
    this.age = args.age
  }
}

export abstract class IQuery {
  abstract getCats(): Cat[] | Promise<Cat[]|ApolloError> | ApolloError
  abstract getCat(_id: string): Cat | Promise<Cat|ApolloError> | ApolloError
}

export abstract class IMutation {
  abstract createCat(createCatInput?: CreateCatInput): Cat | Promise<Cat|ApolloError> | ApolloError
  abstract updateCat(updateCatInput: UpdateCatInput): Cat | Promise<Cat|ApolloError> | ApolloError
  abstract deleteCat(_id: string): Cat | Promise<Cat|ApolloError> | ApolloError
}

export abstract class ISubscription {
  abstract catEvent(): Cat | Promise<Cat|ApolloError> | ApolloError
}
