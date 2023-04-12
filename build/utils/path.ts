import path from 'path';

export const ROOT_DIR_PATH = path.resolve(__dirname, '../../');
export const PKG_DIR_PATH = path.resolve(__dirname, '../../packages');
export const SERVER_DIR_PATH = path.resolve(__dirname, '../../server');
export const CLIENT_DIR_PATH = path.resolve(__dirname, '../../client');
export const DB_MIGRATION_DIR_PATH = path.resolve(
  __dirname,
  '../../packages/db_migration'
);
export const BUILD_DIR_PATH = path.resolve(__dirname, '../');
export const DIST_DIR_PATH = path.resolve(__dirname, '../../output');
