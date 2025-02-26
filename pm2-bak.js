module.exports = {
  apps: [
    {
      name: 'backend-api',
      script: 'api.js',
      instances: 4,
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      restart_delay: 5000,
      log_date_format: 'DD-MM-YYYY HH:mm:ss.SSS',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
