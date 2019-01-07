import { Connection } from 'typeorm'
import { Cat } from './entity'

export const CatsProvider = [
  {
    provide: 'CatToken',
    useFactory: (connection: Connection) => connection.getRepository(Cat),
    inject: ['DbConnectionToken'],
  },
];