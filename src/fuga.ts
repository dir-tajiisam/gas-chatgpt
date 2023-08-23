export class Fuga {
  private cnt: number;

  constructor(private readonly value: string) {
    this.cnt = 0;
  }

  public message() {
    console.log(`hugahuga:${this.value} ${++this.cnt}回目`);
  }
}
