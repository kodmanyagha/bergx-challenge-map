function appConfig() {
  return {
    APP_NAME: process.env.APP_NAME || 'APP',
    APP_ENV: process.env.APP_ENV || 'production',
    APP_DEBUG: process.env.APP_DEBUG === 'true',

    HTTP_HOST: process.env.HTTP_HOST || '0.0.0.0',
    HTTP_PORT: parseInt(process.env.HTTP_PORT, 10) || 3000,

    WS_HOST: process.env.WS_HOST || '0.0.0.0',
    WS_PORT: parseInt(process.env.WS_PORT, 10) || 5000,

    LOG_LEVEL: process.env.LOG_LEVEL || 'debug',

    SWAGGER_PATH: process.env.SWAGGER_PATH || 'docs',
    SWAGGER_TITLE: process.env.SWAGGER_TITLE || 'App',
    SWAGGER_DESCRIPTION: process.env.SWAGGER_DESCRIPTION || 'App Docs',
    SWAGGER_VERSION: process.env.SWAGGER_VERSION || '1.0',
  };
}

export type AppConfig = ReturnType<typeof appConfig>;
export default appConfig;
