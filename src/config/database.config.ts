import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import { IEnvVars } from './config';

export default (
  configService: ConfigService<IEnvVars>,
): MongooseModuleOptions => {
  const database = configService.get('mongodb', { infer: true });

  if (!database) {
    throw new Error('Database configuration is not defined');
  }

  return {
    ...database,
    retryAttempts: 5,
  };
};
