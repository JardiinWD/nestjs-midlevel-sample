import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
    port: parseInt(process.env.NEST_PORT, 10) || 5575,
    nodenv: process.env.NODE_ENV,
}));