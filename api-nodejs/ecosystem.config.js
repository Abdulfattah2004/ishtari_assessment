module.exports = {
  apps: [
    {
      name: "ishtari-api",
      script: "./dist/server.js",
      cwd: __dirname,

      instances: 1,
      autorestart: true,
      watch: false,
      time: true,

      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },

      out_file: "./logs/api-out.log",
      error_file: "./logs/api-error.log",
      merge_logs: true,
    },
  ],
};