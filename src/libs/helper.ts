
export class Helpers {

  public static env(key: string, defaultVaue: string) {
    return process.env[key] ?? defaultVaue;
  }

  
 
}
