import type { IHashOut } from "./pgl";
import {
  twoToOne,
} from './pgl';

const ZERO_PADDING = "0000000000000000";


function hexToHashOut(hex: string):IHashOut{
  const realHex = hex.substring(0,2)==='0x'?hex.substring(2):hex;
  return [
    BigInt("0x"+realHex.substring(48,64)),
    BigInt("0x"+realHex.substring(32,48)),
    BigInt("0x"+realHex.substring(16,32)),
    BigInt("0x"+realHex.substring(0,16)),
  ];

}

function hashOutToHex(h4:IHashOut): string{
  const a = ZERO_PADDING+h4[0].toString(16);
  const b = ZERO_PADDING+h4[1].toString(16);
  const c = ZERO_PADDING+h4[2].toString(16);
  const d = ZERO_PADDING+h4[3].toString(16);
  return "0x"+d.substring(d.length-16)+c.substring(c.length-16)+b.substring(b.length-16)+a.substring(a.length-16);
}

function hashOutArrayToHexArray(hashOuts: IHashOut[]): string[]{
  const output : string[] = [];
  for(let i=0,l=hashOuts.length;i<l;i++){
    output[i] = hashOutToHex(hashOuts[i]);
  }
  return output;
}

function hexArrayToHashOutArray(hexHashes: string[]): IHashOut[]{
  const output : IHashOut[] = [];
  for(let i=0,l=hexHashes.length;i<l;i++){
    output[i] = hexToHashOut(hexHashes[i]);
  }
  return output;
}

function twoToOneHex(a: string, b: string): string {
  return hashOutToHex(twoToOne(hexToHashOut(a),hexToHashOut(b)));
}


export {
  hexToHashOut,
  hashOutToHex,
  hashOutArrayToHexArray,
  hexArrayToHashOutArray,
  twoToOneHex,
}