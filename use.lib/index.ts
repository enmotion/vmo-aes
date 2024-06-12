import { utils, Counter, ModeOfOperation } from "aes-js";

export default class VmoAES {
  private code:number[]|null;
  private key:string;
  private KEYREG:RegExp = /^[a-z_A-Z0-9-\.!@#\$%\\\^&\*\)\(\+=\{\}\[\]\/",'<>~\·`\?:;|]{16,16}$/;
  constructor(keyString:string){
    this.key = keyString
    this.code = this.createAesKEY(keyString);
    !this.code && console.warn(`VmoAES ERROR: Encryption key setting error, Expected value is a 16-character string, but the actual value is [${keyString}]`);
  }
  private createAesKEY(key:string):null|number[]{
    return (key && key.constructor == String && key.match(this.KEYREG)) ? key.split('').map((k,index)=>k.charCodeAt(0)+index) : null;
  };
  //加密 对象入参字符出参
  public enCryptoString(str: string) {
    if (this.code) {
      var textBytes = utils.utf8.toBytes(str);
      var aesCtr = new ModeOfOperation.ctr(this.code, new Counter(5));
      var encryptedBytes = aesCtr.encrypt(textBytes);
      var encryptedHex = utils.hex.fromBytes(encryptedBytes);
      return encryptedHex;
    } else {
      return str;
    }
  }
  public deCryptoString(str: string) {
    if (this.code) {
      try {
        var encryptedBytes = utils.hex.toBytes(str);
        var aesCtr = new ModeOfOperation.ctr(this.code, new Counter(5));
        var decryptedBytes = aesCtr.decrypt(encryptedBytes);
        var decryptedText = utils.utf8.fromBytes(decryptedBytes);
        return decryptedText;
      } catch (error) {
        return str;
      }
    } else {
      return str;
    }
  }
  public enCryptoObjectToString(data:Record<string, any>) {
    var str = JSON.stringify(data);
    return this.deCryptoString(str);
  }
  //解密 字符入参对象出参
  public deCryptoStringToObject(str: string) {
    try {
      var objStr = this.deCryptoString(str);
      var r = JSON.parse(objStr);
      return r.constructor != String ? r : null;
    } catch (err) {
      return null;
    }
  }
  public getCode(){
    return this.code;
  };
  public getKey(){
    return this.key;
  }; 
}