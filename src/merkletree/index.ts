import type { IMerkleProof, IMerkleProofHashOut } from './types';

import {
  getMerkleProof,
  getMerkleRoot,
  calculateMerkleRoot,
  isMerkleProofValid,

  getMerkleProofHashOut,
  getMerkleRootHashOut,
  calculateMerkleRootHashOut,
  isMerkleProofHashOutValid,
} from './simple';

export {
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
  IMerkleProof,
  IMerkleProofHashOut,
};