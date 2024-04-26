export class ResponseEntity {
    public ok: boolean;
    public message: string;
    public data: Object;

    constructor(ok: boolean, message: string, data: Object) {
        this.ok = ok;
        this.message = message;
        this.data = data;
    }
}
