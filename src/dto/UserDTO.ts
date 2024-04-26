export class UserDTO {
    public _id?: string;
    public username: string;

    constructor(username: string, _id?: string) {
        this.username = username;
        this._id = _id;
    }
}
