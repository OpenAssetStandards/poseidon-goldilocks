<!-- Improved compatibility of back to top link: See: https://github.com/OpenAssetStandards/poseidon-goldilocks/pull/73 -->
<a name="readme-top"></a>
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]




<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/OpenAssetStandards/poseidon-goldilocks">
  <img width="256" height="256" src="docs/images/goldilocks.jpg?raw=true">
  </a>

  <h3 align="center">poseidon-goldilocks</h3>

  <p align="center">
A full suite of Poseidon Goldilocks hash functions that are one-to-one compatible with those used in <a href="https://github.com/mir-protocol/plonky2">plonky2</a>, along with commonly used functions for creating and verifying merkle proofs compatible with plonky2.
  </p>
</div>

Credit to the original Mir team for creating plonky2. 
Constants for poseidon goldilocks were generated using [hadeshash](https://extgit.iaik.tugraz.at/krypto/hadeshash).


# Usage:
### Two to One (Hash two 4-element-wide values)
```javascript
import {twoToOne} from 'poseidon-goldilocks';
const c = twoToOne([1337n, 123456n, 100n, 15n], [1n, 2n, 3n, 4n]);
```
<details><summary>Plonky2 Equivalent</summary>

<p>



```rust
type F = GoldilocksField;
let a = HashOut { elements: [
  F::from_noncanonical_u64(1337),
  F::from_noncanonical_u64(123456),
  F::from_noncanonical_u64(100),
  F::from_noncanonical_u64(15),
] };
let b = HashOut { elements: [
  F::from_noncanonical_u64(1),
  F::from_noncanonical_u64(2),
  F::from_noncanonical_u64(3),
  F::from_noncanonical_u64(4),
] };
let c = PoseidonHash::two_to_one(a, b);
```

</p>

</details>

### Sponge Hash with Pad (Hash n elements with padding)
```javascript
import {hashPad} from 'poseidon-goldilocks';
const result = hashPad([1n, 2n, 3n, 1337n, 9999n, 123n]);
```
<details><summary>Plonky2 Equivalent</summary>

<p>



```rust
type F = GoldilocksField;
let result = PoseidonHash::hash_pad(&[
  F::from_noncanonical_u64(1),
  F::from_noncanonical_u64(2),
  F::from_noncanonical_u64(3),
  F::from_noncanonical_u64(1337),
  F::from_noncanonical_u64(9999),
  F::from_noncanonical_u64(123),
]);
```

</p>

</details>


## Todo
* Complete rest of documentation

# License
MIT License

Copyright (c) 2023 Zero Knowledge Labs Limited

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/OpenAssetStandards/poseidon-goldilocks.svg?style=for-the-badge
[contributors-url]: https://github.com/OpenAssetStandards/poseidon-goldilocks/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/OpenAssetStandards/poseidon-goldilocks.svg?style=for-the-badge
[forks-url]: https://github.com/OpenAssetStandards/poseidon-goldilocks/network/members
[stars-shield]: https://img.shields.io/github/stars/OpenAssetStandards/poseidon-goldilocks.svg?style=for-the-badge
[stars-url]: https://github.com/OpenAssetStandards/poseidon-goldilocks/stargazers
[issues-shield]: https://img.shields.io/github/issues/OpenAssetStandards/poseidon-goldilocks.svg?style=for-the-badge
[issues-url]: https://github.com/OpenAssetStandards/poseidon-goldilocks/issues