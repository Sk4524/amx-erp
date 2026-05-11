import { Module } from "@nestjs/common";

import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { EmployeeModule } from "./employee/employee.module";
import { InventoryModule } from "./inventory/inventory.module";
import { FinanceModule } from "./finance/finance.module";

import { HealthModule } from "./health/health.module";

@Module({
  imports: [

    PrismaModule,

    AuthModule,

    EmployeeModule,

    InventoryModule,

    FinanceModule,

    HealthModule,
  ],
})
export class AppModule {}