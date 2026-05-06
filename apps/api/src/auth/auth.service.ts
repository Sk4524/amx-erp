import { Injectable, UnauthorizedException, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  // ✅ REGISTER USER + TENANT
  async register(data: any) {
    try {
      // 🔐 VALIDATION
      if (!data?.email || !data?.password || !data?.tenantName) {
        throw new BadRequestException("All fields are required");
      }

      // 🔍 CHECK IF USER EXISTS
      const existingUser = await this.prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser) {
        throw new BadRequestException("User already exists with this email");
      }

      // 🔐 HASH PASSWORD
      const hashedPassword = await bcrypt.hash(data.password, 10);

      // 🏢 CREATE TENANT
      const tenant = await this.prisma.tenant.create({
        data: { name: data.tenantName },
      });

      // 👤 CREATE USER
      const user = await this.prisma.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
          role: "ADMIN",
          tenantId: tenant.id,
        },
      });

      return {
        message: "User registered successfully",
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        tenant,
      };
    } catch (error) {
      throw error;
    }
  }

  // ✅ LOGIN USER
  async login(data: any) {
    try {
      // 🔐 VALIDATION
      if (!data?.email || !data?.password) {
        throw new BadRequestException("Email and password are required");
      }

      // 🔍 FIND USER
      const user = await this.prisma.user.findUnique({
        where: { email: data.email },
      });

      if (!user) {
        throw new UnauthorizedException("User not found");
      }

      // 🔐 CHECK PASSWORD
      const isMatch = await bcrypt.compare(data.password, user.password);

      if (!isMatch) {
        throw new UnauthorizedException("Invalid password");
      }

      // 🔑 GENERATE TOKEN
      const token = this.jwtService.sign({
        userId: user.id,
        role: user.role,
        tenantId: user.tenantId,
      });

      return {
        message: "Login successful",
        access_token: token,
      };
    } catch (error) {
      throw error;
    }
  }
}