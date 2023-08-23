import { Hoge } from "./hoge";
import { Fuga } from "./fuga";
import dayjs from "dayjs";
import "dayjs/locale/ja";

dayjs.locale("ja");

export function handler() {
  let hoge = new Hoge();
  hoge.message("test1");

  let fuga = new Fuga(dayjs().format("YYYY年M月D日(ddd) H:m"));
  fuga.message();
  fuga.message();
}

(global as any).handler = handler;
