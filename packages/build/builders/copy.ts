import path from 'path';
import glob from 'fast-glob';
import { dest, src } from 'gulp';
import jsonEditor from 'gulp-json-editor';
import { MONOREPO_PKG_WORK_SPACE } from '../config';
import {
  BUILD_DIR_PATH,
  CLIENT_DIR_PATH,
  DB_MIGRATION_DIR_PATH,
  DIST_DIR_PATH,
  PKG_DIR_PATH,
  ROOT_DIR_PATH,
  SERVER_DIR_PATH,
} from '../utils/path';
import { getPackageDependencies } from '../utils/rollup';

export async function copyToDist() {
  const pkgsDep = (
    await glob(path.join(PKG_DIR_PATH, './*'), {
      onlyDirectories: true,
    })
  ).map((pkgPath) =>
    getPackageDependencies(path.join(pkgPath, 'package.json'))
  );

  // 拷贝 package.json
  src(path.join(SERVER_DIR_PATH, 'package.json'))
    .pipe(
      jsonEditor((json: Record<string, any>) => {
        // 删除 dev 依赖
        delete json.devDependencies;
        // 删除 workspace 依赖
        Object.keys(json.dependencies).forEach((pkg) => {
          if (pkg.startsWith(MONOREPO_PKG_WORK_SPACE)) {
            delete json.dependencies[pkg];
          }
        });
        // 添加依赖包的依赖
        pkgsDep.map((pkgDep) => {
          Object.entries(pkgDep.dependencies_obj).map(
            ([pkgName, pkgVersion]) => {
              if (
                !Object.keys(json.dependencies).includes(pkgName) &&
                !pkgName.startsWith(MONOREPO_PKG_WORK_SPACE)
              ) {
                json.dependencies[pkgName] = pkgVersion;
              }
            }
          );
        });
        // 覆写 scripts
        json.scripts = require(path.join(
          ROOT_DIR_PATH,
          'package.json'
        )).productScripts;
        return json;
      })
    )
    .pipe(dest(path.join(DIST_DIR_PATH)));

  // 拷贝客户端产出
  src(path.join(CLIENT_DIR_PATH, 'dist/**/*')).pipe(
    dest(path.join(DIST_DIR_PATH, './server/static'))
  );

  // 拷贝 db_migration
  src([
    path.join(DB_MIGRATION_DIR_PATH, './**'),
    `!${path.join(DB_MIGRATION_DIR_PATH, './node_modules/**')}`,
  ]).pipe(dest(path.join(DIST_DIR_PATH, 'db_migration')));

  // 拷贝 assets 下的所有文件
  src(path.join(BUILD_DIR_PATH, 'assets/**/*'), { dot: true }).pipe(
    dest(path.join(DIST_DIR_PATH))
  );
}
