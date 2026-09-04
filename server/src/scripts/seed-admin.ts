import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { AuthService } from '../auth/auth.service';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const authService = app.get(AuthService);

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME;

  if (!email || !password || !name) {
    console.error('ADMIN_EMAIL, ADMIN_PASSWORD, and ADMIN_NAME environment variables are required.');
    process.exit(1);
  }

  try {
    const admin = await authService.createAdmin(email, password, name);
    console.log(`Admin user created: ${admin.email}`);
  } catch (err: any) {
    if (err.message?.includes('already exists')) {
      console.log('Admin user with this email already exists. Skipping.');
    } else {
      console.error('Failed to create admin user:', err.message);
      process.exit(1);
    }
  } finally {
    await app.close();
  }
}

seed();
