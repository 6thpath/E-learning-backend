import { createConnection, getConnectionOptions } from 'typeorm'

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async () => {
      const connectionOptions = await getConnectionOptions()
      Object.assign(connectionOptions, {
        synchronize: false,
        logging: true,
        entities: [__dirname + '/../**/entity{.ts,.js}'],
        subscribers: [__dirname + '/../**/subscriber{.ts,.js}'],
        cli: {
          entitiesDir: 'src/modules/**/entity{.ts,.js}',
          subscribersDir: 'src/modules/**/subscriber{.ts,.js}'
        }
      })
      return await createConnection(connectionOptions)
    }
  }
]
