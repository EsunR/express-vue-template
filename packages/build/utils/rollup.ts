export function getPackageDependencies(pkgPath: string) {
  const manifest = require(pkgPath);
  const { dependencies = {}, peerDependencies = {} } = manifest;
  return {
    dependencies: Object.keys(dependencies),
    peerDependencies: Object.keys(peerDependencies),
    dependencies_obj: dependencies,
  };
}
