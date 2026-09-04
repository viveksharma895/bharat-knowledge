import { Controller, Post, Get, Body, Res, Req, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { ApiTags, ApiOkResponse, ApiUnauthorizedResponse, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentAdmin } from './decorators/current-admin.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Admin login' })
  @ApiOkResponse({ description: 'Login successful' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(loginDto.email, loginDto.password);
    const cookieOptions = await this.authService.getCookieOptions();

    res.cookie('bk_admin_token', result.token, cookieOptions);

    return {
      success: true,
      data: {
        admin: result.admin,
      },
    };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get current authenticated admin' })
  @ApiOkResponse({ description: 'Current admin info' })
  @ApiUnauthorizedResponse({ description: 'Not authenticated' })
  async getMe(@CurrentAdmin() user: { id: string; email: string; name: string }) {
    return {
      success: true,
      data: {
        admin: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
    };
  }

  @Post('logout')
  @ApiOperation({ summary: 'Admin logout' })
  @ApiOkResponse({ description: 'Logged out successfully' })
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('bk_admin_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return {
      success: true,
      message: 'Logged out successfully.',
    };
  }
}
