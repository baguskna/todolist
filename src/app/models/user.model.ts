export class User {

  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date,
  ) {}

  get token() {
    if (this.checkTokenExist()) {
      return null;
    }
    return this._token;
  }

  checkTokenExist() {
    return !this._tokenExpirationDate || new Date() > this._tokenExpirationDate;
  }
}
