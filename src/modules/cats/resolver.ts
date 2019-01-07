import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import { CatsGuard } from './guard'
import { CreateCatInput, UpdateCatInput } from '../../schema/cats.schema'
import { CatsService } from './service'

const pubSub = new PubSub()

@Resolver('Cat')
export class CatsResolver {
  constructor(
    private readonly catsService: CatsService
  ) {}

  @Query('getCats')
  @UseGuards(CatsGuard)
  async getCats() {
    return await this.catsService.findAll()
  }

  @Query('getCat')
  async getCat(@Args('_id') _id: string) {
    return await this.catsService.findOneOnly(_id)
  }

  @Mutation('createCat')
  async create(@Args('createCatInput') args: CreateCatInput) {
    const createdCat = await this.catsService.create(args)
    pubSub.publish('catCreated', { catEvent: createdCat })
    return createdCat
  }

  @Mutation('updateCat')
  async update(@Args('updateCatInput') args: UpdateCatInput) {
    const updatedCat = await this.catsService.update(args)
    pubSub.publish('catUpdated', { catEvent: updatedCat })
    return updatedCat
  }

  @Mutation('deleteCat')
  async delete(@Args('_id') _id: string) {
    const deletedCat = await this.catsService.delete(_id)
    pubSub.publish('catDeleted', { catEvent: deletedCat })
    return deletedCat
  }

  @Subscription('catEvent')
  catEvent() {
    return {
      subscribe: () => pubSub.asyncIterator(['catCreated', 'catUpdated', 'catDeleted'])
    }
  }
}
