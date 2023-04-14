import path from 'path';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import glob from 'fast-glob';
import { OutputOptions, rollup, RollupOptions } from 'rollup';
import esbuild from 'rollup-plugin-esbuild';
import { MONOREPO_PKG_WORK_SPACE } from '../config';
import { DIST_DIR_PATH, PKG_DIR_PATH, SERVER_DIR_PATH } from '../utils/path';
import { getPackageDependencies } from '../utils/rollup';

export async function buildServer() {
  // 获取 server 的依赖
  const serverDep = getPackageDependencies(
    path.join(SERVER_DIR_PATH, 'package.json')
  );

  // 获取子包的依赖
  const pkgsDep = (
    await glob(path.join(PKG_DIR_PATH, './*'), {
      onlyDirectories: true,
    })
  ).map((pkgPath) =>
    getPackageDependencies(path.join(pkgPath, 'package.json'))
  );

  const rollupOption: RollupOptions = {
    input: [
      path.join(SERVER_DIR_PATH, 'src/index.ts'),
      path.join(SERVER_DIR_PATH, 'src/init_db.ts'),
    ],
    plugins: [
      alias({
        entries: [
          {
            find: '@server',
            replacement: path.join(SERVER_DIR_PATH, 'src'),
          },
        ],
      }),
      json(),
      nodeResolve({ extensions: ['.mjs', '.js', '.json', '.ts'] }),
      commonjs(),
      esbuild({
        tsconfig: path.join(SERVER_DIR_PATH, 'tsconfig.json'),
      }),
    ],
    // 将 server/package.json 中的引用以及 packages/**/package.json 中的引都作为外部引用忽略（否则会打包 node_modules 文件）
    external: (id: string) => {
      const packages: string[] = [
        ...serverDep.dependencies,
        ...pkgsDep.map((item) => item.dependencies).flat(),
      ].filter((item) => !item.startsWith(MONOREPO_PKG_WORK_SPACE));
      return [...new Set(packages)].some(
        (pkg) =>
          id === pkg ||
          id.startsWith(`${pkg}/`) ||
          id.includes(`node_modules/${pkg}`)
      );
    },
  };

  const outputOption: OutputOptions = {
    format: 'cjs',
    exports: 'named',
    preserveModules: true,
    dir: DIST_DIR_PATH,
  };

  const bundle = await rollup(rollupOption);
  return bundle.write(outputOption);
}
