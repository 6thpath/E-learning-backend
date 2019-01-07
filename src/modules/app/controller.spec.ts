import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './controller'
import { AppService } from './service'

describe('AppController', () => {
  let app: TestingModule

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService]
    }).compile()
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get<AppController>(AppController)
      expect(appController.root()).toBe('Hello World!')
    })
  })
})
