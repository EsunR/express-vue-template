export const withTaskName = <T>(name: string, fn: T) =>
  Object.assign(fn as any, { displayName: name });
