import { Test, TestingModule } from '@nestjs/testing';
import { BugTicketController } from './bug-ticket.controller';

describe('BugTicketController', () => {
  let controller: BugTicketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BugTicketController],
    }).compile();

    controller = module.get<BugTicketController>(BugTicketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
