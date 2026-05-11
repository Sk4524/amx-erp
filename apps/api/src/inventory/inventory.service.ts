import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class InventoryService {

  constructor(
    private prisma: PrismaService
  ) {}

  // GET ALL
  async getAll(
    tenantId: string,
    search = ""
  ) {

    return this.prisma.inventory.findMany({

      where: {

        tenantId,

        productName: {
          contains: search,
          mode: "insensitive",
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }

  // CREATE
  async create(
    data: any,
    tenantId: string
  ) {

    return this.prisma.inventory.create({

      data: {
        ...data,
        tenantId,
      },
    });
  }

  // DELETE
  async delete(id: string) {

    return this.prisma.inventory.delete({
      where: { id },
    });
  }

  // UPDATE
  async update(
    id: string,
    data: any
  ) {

    return this.prisma.inventory.update({

      where: { id },

      data,
    });
  }
}