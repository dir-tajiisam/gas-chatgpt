import { Hoge } from "./hoge";
import { Fuga } from "./fuga";
import { v4 as uuidv4 } from "uuid";

export function handler() {
  let hoge = new Hoge();
  hoge.message("test1");

  let fuga = new Fuga(uuidv4());
  fuga.message();
  fuga.message();
}
