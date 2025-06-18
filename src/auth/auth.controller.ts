import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpOwnerDto } from './dto/signup-owner.dto';
import { SignInDto } from './dto/signin.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // === SIGN UP ===
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Register new owner (learning center + branch + user)',
  })
  @ApiBody({ type: SignUpOwnerDto })
  @ApiResponse({
    status: 201,
    description: 'Owner successfully registered',
    schema: {
      example: {
        message: 'Owner successfully registered',
        centerId: 1,
        branchId: 1,
        userId: 1,
      },
    },
  })
  @ApiResponse({ status: 409, description: 'Username or phone already in use' })
  async signUpOwner(@Body() dto: SignUpOwnerDto) {
    return this.authService.signUpOwner(dto);
  }

  // === SIGN IN ===
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sign in with username and password' })
  @ApiBody({ type: SignInDto })
  @ApiResponse({
    status: 200,
    description: 'Successful login',
    schema: {
      example: {
        access_token: 'ACCESS_TOKEN_JWT',
        refresh_token: 'REFRESH_TOKEN_JWT',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  async signIn(@Body() dto: SignInDto) {
    return this.authService.signIn(dto);
  }
}
