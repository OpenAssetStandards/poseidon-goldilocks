import type { IHashOut } from "./pgl";

import {
  permute,
  hashCapacity,
  hashNToMNoPad,
  hashPad,
  hashNoPad,
  twoToOne,
} from './pgl';

import {
  hexToHashOut,
  hashOutToHex,
  hexArrayToHashOutArray,
  hashOutArrayToHexArray,
  twoToOneHex,
} from './pglhex';

export {
  permute,
  hashCapacity,
  hashNToMNoPad,
  hashPad,
  hashNoPad,
  twoToOne,

  hexToHashOut,
  hashOutToHex,
  hexArrayToHashOutArray,
  hashOutArrayToHexArray,
  twoToOneHex,
};


export type {
  IHashOut,
};