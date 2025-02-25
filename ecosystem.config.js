module.exports = {
  apps: [
    {
      name: 'backend-bot',
      script: 'dist/main.js',
      instances: 1,
      exec_mode: 'fork',
      log_date_format: 'DD-MM-YYYY HH:mm:ss.SSS',
      autorestart: true,
      watch: false,
      restart_delay: 5000,
      env_dev: {
        NODE_ENV: 'dev',
      },
      env_sit: {
        NODE_ENV: 'sit',
      },
      env_uat: {
        NODE_ENV: 'uat',
      },
      env_prod: {
        NODE_ENV: 'prod',
      },
    },
  ],
};
