import { Test, TestingModule } from '@nestjs/testing';
import { FinanceController } from './finance.controller';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("Finance")
@ApiBearerAuth()

describe('FinanceController', () => {
  let controller: FinanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FinanceController],
    }).compile();

    controller = module.get<FinanceController>(FinanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
