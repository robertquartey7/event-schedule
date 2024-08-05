import { instances } from "../config/instance";

class Helpers {

  public static env(key: string, defaultVaue: string) {
    return process.env[key] ?? defaultVaue;
  }
  
  public static app(key: string){
    if (instances[key]) {
      return instances[key]
    }
  
  }
}
