import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class FinanceService {
  constructor(private prisma: PrismaService) {}

  async getAccounts(tenantId: string) {
    return this.prisma.account.findMany({
      where: { tenantId }
    });
  }
}