import { Module } from '@nestjs/common'
import { CatsResolver } from './resolver'
import { DatabaseModule } from '../../database/module'
import { CatsProvider } from './provider'
import { CatsService } from './service'

@Module({
  imports: [DatabaseModule],
  providers: [...CatsProvider, CatsService, CatsResolver]
})

export class CatsModule {}
