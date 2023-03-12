import { IHashOut } from "../poseidon-gl";

interface IMerkleProofHashOut {
  index: number,
  siblings: IHashOut[];
  root: IHashOut;
  value: IHashOut;
}

interface IMerkleProof {
  index: number,
  siblings: string[];
  root: string;
  value: string;
}

export type {
  IMerkleProofHashOut,
  IMerkleProof,

}