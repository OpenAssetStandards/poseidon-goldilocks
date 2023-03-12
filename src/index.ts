
import type { IHashOut } from './poseidon-gl';
import type { IMerkleProof, IMerkleProofHashOut } from './merkletree/index';

import {
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

} from './poseidon-gl';

import {
  getMerkleProof,
  getMerkleRoot,
  calculateMerkleRoot,
  isMerkleProofValid,

  getMerkleProofHashOut,
  getMerkleRootHashOut,
  calculateMerkleRootHashOut,
  isMerkleProofHashOutValid,
} from './merkletree';



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


  getMerkleProof,
  getMerkleRoot,
  calculateMerkleRoot,
  isMerkleProofValid,

  getMerkleProofHashOut,
  getMerkleRootHashOut,
  calculateMerkleRootHashOut,
  isMerkleProofHashOutValid,
};

export type {
  IHashOut,
  
  IMerkleProof,
  IMerkleProofHashOut,
};