export class CustomError extends Error {
  constructor(public msg: string, public status: number) {
    super(msg);
    this.status = status;
  }
}
