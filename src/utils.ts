import { IHashOut } from "./poseidon-gl/pgl";

function compareHashOut(a: IHashOut, b: IHashOut): number{
  if(a[0] === b[0]){
    if(a[1] === b[1]){
      if(a[2] === b[2]){
        if(a[3] === b[3]){
          return 0;
        }else{
          return a[3] > b[3] ? 1 : -1;
        }
      }else{
        return a[2] > b[2] ? 1 : -1;
      }
    }else{
      return a[1] > b[1] ? 1 : -1;
    }
  }else{
    return a[0] > b[0] ? 1 : -1;
  }
}
export {
  compareHashOut,
}