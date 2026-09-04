import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { AdminUser, AdminUserDocument } from './schemas/admin-user.schema';
import { JwtPayload } from './strategies/jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AdminUser.name)
    private readonly adminUserModel: Model<AdminUserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const normalizedEmail = email.toLowerCase().trim();
    const user = await this.adminUserModel.findOne({ email: normalizedEmail }).exec();

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const passwordValid = await bcrypt.compare(password, user.passwordHash);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    await this.adminUserModel.findByIdAndUpdate(user._id, {
      lastLoginAt: new Date(),
    });

    const payload: JwtPayload = {
      sub: user._id.toString(),
      email: user.email,
    };

    const token = this.jwtService.sign(payload);

    return {
      token,
      admin: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
      },
    };
  }

  async getCookieOptions() {
    const isProduction = process.env.NODE_ENV === 'production';
    return {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax' as const,
      path: '/',
      maxAge: 24 * 60 * 60 * 1000,
    };
  }

  async findById(id: string) {
    return this.adminUserModel.findById(id).select('-passwordHash').exec();
  }

  async createAdmin(email: string, password: string, name: string) {
    const normalizedEmail = email.toLowerCase().trim();
    const existing = await this.adminUserModel.findOne({ email: normalizedEmail }).exec();
    if (existing) {
      throw new ConflictException('Admin user with this email already exists.');
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const admin = new this.adminUserModel({
      email: normalizedEmail,
      passwordHash,
      name: name.trim(),
      isActive: true,
    });

    await admin.save();
    return {
      id: admin._id.toString(),
      email: admin.email,
      name: admin.name,
    };
  }
}
