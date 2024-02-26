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

export function copyToClipboard(text: string) {
  const input = document.createElement('input');
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
}
