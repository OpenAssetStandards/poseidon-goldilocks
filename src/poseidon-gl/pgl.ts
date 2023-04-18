
import { F1Field, Scalar } from "oas-ffjavascript";
import { C,S,M,P } from "./constants";
type IHashOut = [bigint,bigint,bigint,bigint];

const SPONGE_RATE = 8;
const SPONGE_WIDTH = 12;
const goldenPrime = BigInt("18446744069414584321");
const ZERO = BigInt(0);
const F = new F1Field(Scalar.e(goldenPrime));

const pow7 = (a: bigint) => F.mul(a, F.square(F.mul(a, F.square(a))));
const t = 12;
const nRoundsF = 8;
const nRoundsP = 22;
const permute = (inputState: bigint[]) => {
  if (inputState.length != 12) {
    throw new Error("Invalid state size (must be 12)");
  }
  let state = inputState.map((a, i) => F.add(a, C[i]));

  for (let r = 0; r < nRoundsF / 2 - 1; r++) {
    state = state.map((a) => pow7(a));
    state = state.map((a, i) => F.add(a, C[(r + 1) * t + i]));
    // eslint-disable-next-line no-loop-func
    state = state.map((_, i) =>
      state.reduce((acc, a, j) => F.add(acc, F.mul(M[j][i], a)), F.zero)
    );
  }
  state = state.map((a) => pow7(a));
  state = state.map((a, i) => F.add(a, C[(nRoundsF / 2 - 1 + 1) * t + i]));
  state = state.map((_, i) =>
    state.reduce((acc, a, j) => F.add(acc, F.mul(P[j][i], a)), F.zero)
  );
  for (let r = 0; r < nRoundsP; r++) {
    state[0] = pow7(state[0]);
    state[0] = F.add(state[0], C[(nRoundsF / 2 + 1) * t + r]);

    const s0 = state.reduce(
      (acc, a, j) => F.add(acc, F.mul(S[(t * 2 - 1) * r + j], a)),
      F.zero
    );
    for (let k = 1; k < t; k++) {
      state[k] = F.add(
        state[k],
        F.mul(state[0], S[(t * 2 - 1) * r + t + k - 1])
      );
    }
    state[0] = s0;
  }
  for (let r = 0; r < nRoundsF / 2 - 1; r++) {
    state = state.map((a) => pow7(a));
    state = state.map((a, i) =>
      F.add(a, C[(nRoundsF / 2 + 1) * t + nRoundsP + r * t + i])
    );
    // eslint-disable-next-line no-loop-func
    state = state.map((_, i) =>
      state.reduce((acc, a, j) => F.add(acc, F.mul(M[j][i], a)), F.zero)
    );
  }
  state = state.map((a) => pow7(a));
  state = state.map((_, i) =>
    state.reduce((acc, a, j) => F.add(acc, F.mul(M[j][i], a)), F.zero)
  );
  return state;
};

function hashNToMNoPad(inputsBase:bigint[], numOutputs: number): bigint[] {
  let inputs = inputsBase.map((x) => F.e(x));
  const inputsLength = inputs.length;

  let state : bigint[]= [ZERO, ZERO, ZERO, ZERO, ZERO, ZERO, ZERO, ZERO, ZERO, ZERO, ZERO, ZERO];
  const nChunks = Math.floor(inputsLength / SPONGE_RATE);
  for (let i = 0; i < nChunks; i++) {
    state[0] = inputs[i * 8 + 0];
    state[1] = inputs[i * 8 + 1];
    state[2] = inputs[i * 8 + 2];
    state[3] = inputs[i * 8 + 3];
    state[4] = inputs[i * 8 + 4];
    state[5] = inputs[i * 8 + 5];
    state[6] = inputs[i * 8 + 6];
    state[7] = inputs[i * 8 + 7];
    const n_state = permute(state);
    state[0] = n_state[0];
    state[1] = n_state[1];
    state[2] = n_state[2];
    state[3] = n_state[3];
    state[4] = n_state[4];
    state[5] = n_state[5];
    state[6] = n_state[6];
    state[7] = n_state[7];
    state[8] = n_state[8];
    state[9] = n_state[9];
    state[10] = n_state[10];
    state[11] = n_state[11];
  }
  const start = nChunks * SPONGE_RATE;
  const remaining = inputsLength - start;
  if (remaining > 0 && remaining < state.length) {
    for (let i = 0; i < remaining; i++) {
      state[i] = inputs[start + i];
    }
    const n_state = permute(state);
    state[0] = n_state[0];
    state[1] = n_state[1];
    state[2] = n_state[2];
    state[3] = n_state[3];
    state[4] = n_state[4];
    state[5] = n_state[5];
    state[6] = n_state[6];
    state[7] = n_state[7];
    state[8] = n_state[8];
    state[9] = n_state[9];
    state[10] = n_state[10];
    state[11] = n_state[11];
  }
  if (numOutputs === 4) {
    return [state[0], state[1], state[2], state[3]];
  }
  const outputs : bigint[]= [];
  let nOutputRounds = Math.ceil(numOutputs / SPONGE_RATE);
  let outputsPushed = 0;
  for (let i = 0; i < nOutputRounds; i++) {
    for (let x = 0; x < SPONGE_RATE && outputsPushed < numOutputs; x++) {
      outputs.push(state[x]);
      outputsPushed++;
    }
    state = permute(state);
  }
  return outputs;
}
function hashPad(input: bigint[]) {
  let paddedInput = input.concat([]);
  paddedInput.push(BigInt(1));
  while ((paddedInput.length + 1) % SPONGE_WIDTH !== 0) {
    paddedInput.push(ZERO);
  }
  paddedInput.push(BigInt(1));
  return hashNToMNoPad(paddedInput, 4).slice(0, 4);
}
function hashNoPad(input: bigint[]):IHashOut {
  const output = hashNToMNoPad(input, 4);
  return [
    output[0],
    output[1],
    output[2],
    output[3],
  ]
}
function hashCapacity(inputs: bigint[], capacity: bigint[]) {
  if (Array.isArray(capacity)) {
    return permute(inputs.concat(capacity).map((x) => F.e(x) as any)).slice(0, 4);
  } else {
    return permute(inputs.map((x) => F.e(x) as any).concat([ZERO, ZERO, ZERO, ZERO])).slice(
      0,
      4
    );
  }
}
function twoToOne(a: IHashOut,b: IHashOut){ 
  return hashNoPad([
    a[0],
    a[1],
    a[2],
    a[3],
    b[0],
    b[1],
    b[2],
    b[3],
  ]);
}

export {
  F,
  permute,
  hashCapacity,
  hashNToMNoPad,
  hashPad,
  hashNoPad,
  twoToOne,

};
export type {
  IHashOut,
}
