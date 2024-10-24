import { JwtModuleOptions } from '@nestjs/jwt';

export default (): JwtModuleOptions => ({
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: '30d' },
});