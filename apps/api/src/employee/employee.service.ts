import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  async getAll(tenantId: string) {
    return this.prisma.employee.findMany({
      where: { tenantId }
    });
  }

  async create(data: any, tenantId: string) {
    return this.prisma.employee.create({
      data: { ...data, tenantId }
    });
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