import { spawn } from 'child_process';
import { ROOT_DIR_PATH } from '../utils/path';

function runShell(cmd: string, cwd: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, {
      cwd,
      shell: true,
      stdio: 'inherit',
    });
    child.on('data', (data) => {
      // eslint-disable-next-line no-console
      console.log(data.toString());
    });
    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`command failed: ${cmd}`));
        return;
      }
      resolve();
    });
  });
}

export async function buildClient() {
  // 构建 PC 端代码
  return Promise.all([runShell('pnpm build:client', ROOT_DIR_PATH)]);
}
