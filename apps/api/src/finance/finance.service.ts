import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class FinanceService {

  constructor(
    private prisma: PrismaService
  ) {}

  // GET ALL TRANSACTIONS
  async getTransactions(
    tenantId: string,
    search = ""
  ) {

    return this.prisma.transaction.findMany({

      where: {

        tenantId,

        type: {
          contains: search,
          mode: "insensitive",
        },
      },

      include: {
        account: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }

  // CREATE TRANSACTION
  async createTransaction(
    data: any,
    tenantId: string
  ) {

    return this.prisma.transaction.create({

      data: {
        ...data,
        tenantId,
      },
    });
  }

  // DELETE TRANSACTION
  async deleteTransaction(id: string) {

    return this.prisma.transaction.delete({

      where: { id },
    });
  }

  // GET ACCOUNTS
  async getAccounts(
    tenantId: string
  ) {

    return this.prisma.account.findMany({

      where: {
        tenantId,
      },

      orderBy: {
        name: "asc",
      },
    });
  }

  // CREATE ACCOUNT
  async createAccount(
    data: any,
    tenantId: string
  ) {

    return this.prisma.account.create({

      data: {
        ...data,
        tenantId,
      },
    });
  }
}