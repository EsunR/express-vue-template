/* eslint-disable */
const path = require("path");

module.exports = {
  apps: [
    {
      name: "express-vue-template",
      script: "npm run db:init && npm run db:migrate && npm run start",
      env: {
        NODE_ENV: "production",
        NODE_PORT: "8093",
      },
      cwd: path.resolve(__dirname, "./"),
    },
  ],
};
