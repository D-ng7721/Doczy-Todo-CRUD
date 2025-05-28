import Joi from 'joi';

interface IEnvVars {
  env: 'development' | 'production';
  port: number;
  mongodb: {
    uri: string;
    dbName: string;
  };
}

// env validation schema for Joi
const envFileSchema = Joi.object<IEnvVars, true>({
  env: Joi.string().valid('development', 'production').default('development'),
  port: Joi.number().default(3000).required(),
  mongodb: Joi.object({
    uri: Joi.string().required(),
    dbName: Joi.string().required(),
  }),
});

// map your env vars here
const loadEnv = () => ({
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongodb: {
    uri: process.env.MONGO_URI,
    dbName: process.env.DB_NAME,
  },
});

export default (): IEnvVars => {
  const env = loadEnv();
  const valResult = envFileSchema.validate(env, { abortEarly: false });

  if (valResult.error) {
    throw new Error('env file validation error: ' + valResult.error.message);
  }

  return valResult.value;
};

export type { IEnvVars };
