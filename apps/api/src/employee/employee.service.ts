import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

async getAll(
  tenantId: string,
  page = 1,
  limit = 10,
  search = ""
) {

  const skip = (page - 1) * limit;

  return this.prisma.employee.findMany({
    where: {
      tenantId,

      name: {
        contains: search,
        mode: "insensitive",
      },
    },

    skip,
    take: Number(limit),

    orderBy: {
      createdAt: "desc",
    },
  });
}

 async create(data: any, tenantId: string) {

  try {

    return await this.prisma.employee.create({
      data: {
        ...data,
        tenantId,
      },
    });

  } catch (error) {

    console.log("EMPLOYEE CREATE ERROR:");
    console.log(error);

    throw error;
  }
}

  async delete(id: string, tenantId: string) {
    return this.prisma.employee.delete({
      where: { id }
    });
  }

async update(id: string, data: any, tenantId: string) {
  return this.prisma.employee.update({
    where: {
      id: id
    },
    data
  });

}
}