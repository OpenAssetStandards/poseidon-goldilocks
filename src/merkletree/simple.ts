import type {
  IHashOut,
} from '../index'

import {
  twoToOne
} from '../index';
import { hashOutArrayToHexArray, hashOutToHex, hexArrayToHashOutArray, hexToHashOut } from '../poseidon-gl/pglhex';
import { compareHashOut } from '../utils';
import { IMerkleProof, IMerkleProofHashOut } from './types';

const ZERO_HASH : IHashOut = [BigInt(0), BigInt(0), BigInt(0), BigInt(0)];

function normalizeMerkleLeaves(treeDepth: number, leaves: IHashOut[]){
  const nLeaves = Math.round(Math.pow(2, treeDepth));
  const inputLeavesLength = leaves.length;
  if(inputLeavesLength > nLeaves){
    return leaves.slice(0, nLeaves);
  }else if(inputLeavesLength < nLeaves){
    const leafArray = leaves.concat([]);
    for(let i=inputLeavesLength;i<nLeaves;i++){
      leafArray[i] = ZERO_HASH;
    }
    return leafArray;
  }else{
    return leaves;
  }
}

function getMerkleProofHashOut(index: number, treeDepth: number, leaves: IHashOut[]): IMerkleProofHashOut{
  const normalizedLeaves = normalizeMerkleLeaves(treeDepth, leaves);

  const siblings : IHashOut[] = [];
  let currentIndex = index;
  let currentLevel = normalizedLeaves;

  for(let i=0;i<treeDepth;i++){
    siblings[i] = currentLevel[currentIndex^1];
    const nextLevel: IHashOut[] = [];
    for(let j=0,l=(currentLevel.length/2);j<l;j++){
      nextLevel[j] = twoToOne(currentLevel[2*j], currentLevel[2*j+1]);
    }
    currentIndex = currentIndex >>> 1;
    currentLevel = nextLevel;
  }

  return {
    index,
    siblings,
    root: currentLevel[0],
    value: normalizedLeaves[index]
  };
}

function getMerkleRootHashOut(treeDepth: number, leaves: IHashOut[]): IHashOut{
  return getMerkleProofHashOut(0, treeDepth, leaves).root;
}

function calculateMerkleRootHashOut(index: number, value: IHashOut, siblings: IHashOut[]){
  let currentIndex = index;
  let currentHash = value;
  for(let i=0,l=siblings.length;i<l;i++){
    if((currentIndex&1) === 0){
      currentHash = twoToOne(currentHash, siblings[i]);
    }else{
      currentHash = twoToOne(siblings[i], currentHash);
    }
    currentIndex = currentIndex >>> 1;
  }
  return currentHash;
}

function isMerkleProofHashOutValid(proof: IMerkleProofHashOut): boolean{
  const calculatedRoot = calculateMerkleRootHashOut(proof.index, proof.value, proof.siblings);
  return compareHashOut(calculatedRoot, proof.root) === 0;
}


function getMerkleProof(index: number, treeDepth: number, leaves: string[]): IMerkleProof{
  const hashOutProof = getMerkleProofHashOut(index, treeDepth, hexArrayToHashOutArray(leaves));
  return {
    index: hashOutProof.index,
    root: hashOutToHex(hashOutProof.root),
    siblings: hashOutArrayToHexArray(hashOutProof.siblings),
    value: hashOutToHex(hashOutProof.value),
  }
}

function getMerkleRoot(treeDepth: number, leaves: string[]): string{
  const hashOutProof = getMerkleProofHashOut(0, treeDepth, hexArrayToHashOutArray(leaves));
  return hashOutToHex(hashOutProof.root);
}

function calculateMerkleRoot(index: number, value: string, siblings: string[]){
  return hashOutToHex(calculateMerkleRootHashOut(index, hexToHashOut(value), hexArrayToHashOutArray(siblings)));
}

function isMerkleProofValid(proof: IMerkleProof): boolean{
  const calculatedRoot = calculateMerkleRoot(proof.index, proof.value, proof.siblings);
  return compareHashOut(hexToHashOut(calculatedRoot), hexToHashOut(proof.root)) === 0;
}

export {
  getMerkleProof,
  getMerkleRoot,
  calculateMerkleRoot,
  isMerkleProofValid,

  getMerkleProofHashOut,
  getMerkleRootHashOut,
  calculateMerkleRootHashOut,
  isMerkleProofHashOutValid,
}

