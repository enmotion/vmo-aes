import { expect } from 'chai';
import VmoAES from '../use.lib/index';

describe('VmoAES getKey', () => {
  it('should eq asd!qwertyuighjk', () => {
    const cropty = new VmoAES('asd!qwertyuighjk');
    expect(cropty.getKey()).eq('asd!qwertyuighjk')
  });
});

describe('VmoAES enCryptoString & deCryptoString', () => {
  it('should eq enmotion', () => {
    const cropty = new VmoAES('asd!qwertyuighjk');
    const str = cropty.enCryptoString('enmotion');
    expect(cropty.deCryptoString(str)).eq('enmotion')
  });
});

describe('VmoAES enCryptoObjectToString & deCryptoStringToObject', () => {
  it('should eq enmotion', () => {
    const cropty = new VmoAES('asd!qwertyuighjk');
    const str = cropty.enCryptoObjectToString(['enmotion']);
    expect(JSON.stringify(cropty.deCryptoStringToObject(str||''))).eq(JSON.stringify(['enmotion']))
  });
});

describe('VmoAES enCryptoObjectToString & deCryptoStringToObject', () => {
  it('should eq enmotion', () => {
    const cropty1 = new VmoAES('asd!qwertyuighjk');
    const cropty2 = new VmoAES('asd!qwertyuighjg');
    const str1 = cropty1.getKey();
    const str2 = cropty2.getKey();
    expect(str1).to.not.eq(str2)
  });
});