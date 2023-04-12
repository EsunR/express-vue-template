export function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, time);
  });
}

export function jsonParseSafely<T>(jsonString: any): undefined | T {
  let result = undefined;
  try {
    result = JSON.parse(jsonString);
  } catch (e) {
    console.log(e);
  }
  return result;
}
