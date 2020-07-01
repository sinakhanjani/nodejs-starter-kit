module.exports = {
    apps: [
      {
        name: process.env.APP_NAME,
        script: './src/server.js',
        instances: 0,
        autorestart: true,
        watch: false,
        max_memory_restart: '2G',
        env_production: {
          PORT: process.env.PORT,
          NODE_ENV: 'production',
        },
        env_development: {
          PORT: process.env.PORT,
          NODE_ENV: 'development',
        },
      },
    ],
  };

// mongodb://admin:admin@127.0.0.1:27017/master
// mongodb://127.0.0.1:27017/mongodb
