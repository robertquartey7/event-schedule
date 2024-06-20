export function env(key: string, defaultVaue: string) {
  return process.env[key] ?? defaultVaue;
}
