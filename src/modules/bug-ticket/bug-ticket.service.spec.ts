import { Test, TestingModule } from '@nestjs/testing';
import { BugTicketService } from './bug-ticket.service';

describe('BugTicketService', () => {
  let service: BugTicketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BugTicketService],
    }).compile();

    service = module.get<BugTicketService>(BugTicketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
