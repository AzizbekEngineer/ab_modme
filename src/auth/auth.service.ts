import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { SignUpOwnerDto } from './dto/signup-owner.dto';
import { SignInDto } from './dto/signin.dto';
import {
  LearningCenter,
  CenterStatus,
} from '../learning_centers/entities/learning_center.entity';
import { Branch, BranchStatus } from '../branches/entities/branch.entity';
import { User, UserRole, UserStatus } from '../users/entities/user.entity';
import { JwtPayload } from '../common/types/jwt-payload.type';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(LearningCenter)
    private learningCenterRepo: Repository<LearningCenter>,

    @InjectRepository(Branch)
    private branchRepo: Repository<Branch>,

    @InjectRepository(User)
    private userRepo: Repository<User>,

    private readonly jwtService: JwtService,
  ) {}

  async generateTokens(user: User) {
    const payload: JwtPayload = {
      role: user.role,
      id: user.id,
      branch_id: user.branch_id,
      full_name: user.full_name,
      username: user.username,
      status: user.status,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return { access_token, refresh_token };
  }

  async signUpOwner(dto: SignUpOwnerDto) {
    const {
      learningCenterName,
      learningCenterPhone,
      branchName,
      branchAddress,
      branchPhone,
      fullName,
      username,
      password,
      userPhone,
    } = dto;
    const now = new Date();
    let demo_expiry_date: Date | null = null;

    const existingUser = await this.userRepo.findOne({
      where: [{ username }, { phone: userPhone }],
    });
    if (existingUser) {
      throw new ConflictException('Username or phone already in use');
    }

    demo_expiry_date = new Date(now);
    demo_expiry_date.setDate(now.getDate() + 15);

    const learningCenter = this.learningCenterRepo.create({
      name: learningCenterName,
      phone_number: learningCenterPhone,
      subscription_status: CenterStatus.INACTIVE,
      demo_expiry_date
    });
    await this.learningCenterRepo.save(learningCenter);

    const branch = this.branchRepo.create({
      center: learningCenter,
      center_id: learningCenter.id,
      name: branchName,
      address: branchAddress,
      phone: branchPhone,
      status: BranchStatus.ACTIVE,
    });
    await this.branchRepo.save(branch);

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepo.create({
      full_name: fullName,
      username,
      password_hash: hashedPassword,
      phone: userPhone,
      role: UserRole.SUPERADMIN,
      status: UserStatus.ACTIVE,
      branch: branch,
      branch_id: branch.id,
    });
    await this.userRepo.save(user);

    const tokens = await this.generateTokens(user);

    return {
      message: 'Owner successfully registered',
      centerId: learningCenter.id,
      branchId: branch.id,
      userId: user.id,
      ...tokens,
    };
  }

  async signIn(dto: SignInDto) {
    const { username, password } = dto;

    const user = await this.userRepo.findOne({
      where: { username },
    });

    if (!user) {
      throw new NotFoundException('Invalid password or username');
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid password or username');
    }

    if (user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException('User is inactive');
    }

    const tokens = await this.generateTokens(user);

    return {
      message: 'Sign in successful',
      user: {
        id: user.id,
        full_name: user.full_name,
        role: user.role,
        username: user.username,
      },
      ...tokens,
    };
  }
}
