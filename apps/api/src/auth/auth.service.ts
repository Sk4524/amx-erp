import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";

import { JwtService } from "@nestjs/jwt";

import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  // REGISTER
  async register(data: any) {

    try {

      // VALIDATION
      if (
        !data?.email ||
        !data?.password ||
        !data?.tenantName
      ) {
        throw new BadRequestException(
          "All fields are required"
        );
      }

      // CHECK EXISTING USER
      const existingUser =
        await this.prisma.user.findUnique({
          where: {
            email: data.email,
          },
        });

      if (existingUser) {
        throw new BadRequestException(
          "User already exists"
        );
      }

      // HASH PASSWORD
      const hashedPassword =
        await bcrypt.hash(data.password, 10);

      // CREATE TENANT
      const tenant =
        await this.prisma.tenant.create({
          data: {
            name: data.tenantName,
          },
        });

      // CREATE USER
      const user =
        await this.prisma.user.create({
          data: {
            email: data.email,
            password: hashedPassword,

            // IMPORTANT
            role: data.role || "USER",

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

  // LOGIN
  async login(data: any) {

    try {

      // VALIDATION
      if (
        !data?.email ||
        !data?.password
      ) {
        throw new BadRequestException(
          "Email and password are required"
        );
      }

      // FIND USER
      const user =
        await this.prisma.user.findUnique({
          where: {
            email: data.email,
          },
        });

      if (!user) {
        throw new UnauthorizedException(
          "User not found"
        );
      }

      // PASSWORD CHECK
      const isMatch =
        await bcrypt.compare(
          data.password,
          user.password
        );

      if (!isMatch) {
        throw new UnauthorizedException(
          "Invalid password"
        );
      }

      // TOKEN
      const token =
        this.jwtService.sign({
          userId: user.id,
          role: user.role,
          tenantId: user.tenantId,
        });

      // IMPORTANT RESPONSE
      return {

        access_token: token,

        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      };

    } catch (error) {

      throw error;
    }
  }
}