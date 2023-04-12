import path from 'path';

export const PACKAGE_ROOT_PATH = path.resolve(__dirname, '../../');
export const SRC_DIR_PATH = path.join(PACKAGE_ROOT_PATH, 'src');
export const STATIC_DIR_PATH = path.join(PACKAGE_ROOT_PATH, 'static');
export const PUBLIC_DIR_PATH = path.join(PACKAGE_ROOT_PATH, 'public');
export const DB_DIR_PATH = path.join(PUBLIC_DIR_PATH, 'database');
export const REPORTS_DIR_PATH = path.join(PUBLIC_DIR_PATH, 'reports');
export const LOG_DIR_PATH = path.join(PUBLIC_DIR_PATH, 'log');
