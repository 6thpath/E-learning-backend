import { Injectable, Inject } from '@nestjs/common'
import { v4 as uuid } from 'uuid'
import { ApolloError } from 'apollo-server-express'

import { Repository } from 'typeorm'
import { Cat, CreateCatInput, UpdateCatInput } from '../../schema/cats.schema'

@Injectable()
export class CatsService {
  constructor(
    @Inject('CatToken')
    private readonly catRepository: Repository<Cat>
  ) {}

  async create(cat: CreateCatInput): Promise<Cat|ApolloError> {
    try {
      const newCat = new Cat(cat)
      newCat._id = uuid()
      return await this.catRepository.save(newCat)
    } catch {
      return new ApolloError('An error occurred!', '400')
    }
  }

  async update(cat: UpdateCatInput): Promise<Cat|ApolloError> {
    try {
      await this.catRepository.update({ _id: cat._id }, cat)
      return await this.catRepository.findOne({ _id: cat._id })
    } catch {
      return new ApolloError('An error occurred!', '400')
    }
  }

  async delete(_id: string): Promise<Cat|ApolloError> {
    try {
      const deletedCat = await this.catRepository.findOne(_id)
      this.catRepository.delete({ _id })
      return deletedCat
    } catch {
      return new ApolloError('An error occurred!', '400')
    }
  }

  async findAll(): Promise<Cat[]|ApolloError> {
    try {
      return await this.catRepository.find()
    } catch {
      return new ApolloError('An error occurred!', '400')
    }
  }

  async findOneOnly(_id: string): Promise<Cat|ApolloError> {
    try {
      return await this.catRepository.findOne(_id)
    } catch {
      return new ApolloError('An error occurred!', '400')
    }
  }
}
