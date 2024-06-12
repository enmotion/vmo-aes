import { utils, Counter, ModeOfOperation } from "aes-js";

export default class VmoAES {
  private code:number[]|null;
  private key:string;
  private KEYREG:RegExp = /^[a-z_A-Z0-9-\.!@#\$%\\\^&\*\)\(\+=\{\}\[\]\/",'<>~\·`\?:;|]{16,16}$/;

  /**
   * constructor 私有方法，创建KEY
   * @param {string} keyString 
   * @returns
   */
  constructor(keyString:string){
    this.key = keyString
    this.code = this.createAesKEY(keyString);
    !this.code && console.warn(`VmoAES ERROR: Encryption key setting error, Expected value is a 16-character string, but the actual value is [${keyString}]`);
  }

  /**
   * createAesKEY 私有方法，创建KEY
   * @param {string} key 
   * @returns {null|number[]}
   */
  private createAesKEY(key:string):null|number[]{
    return (key && key.constructor == String && key.match(this.KEYREG)) ? key.split('').map((k,index)=>k.charCodeAt(0)+index) : null;
  };

  /**
   * enCryptoString 加密字符串
   * @param {string} str 
   * @returns 
   */
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

  /**
   * deCryptoString 解密字符串
   * @param {string} str
   * @returns 
   */
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
  /**
   * deCryptoString 加密对象
   * @param {Record<string, any>|any[]} data
   * @returns {string|null}
   */
  public enCryptoObjectToString(data:Record<string, any>|any[]):string|null{
    try{
      return this.deCryptoString(JSON.stringify(data));
    }catch(err){
      return null
    }
  }
  /**
   * deCryptoString 解密对象
   * @param str string
   * @returns {Record<string, any>|any[]|null}
   */
  public deCryptoStringToObject(str: string):Record<string, any>|any[]|null{
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