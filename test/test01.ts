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