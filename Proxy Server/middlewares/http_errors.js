export class HttpError extends Error {
    constructor(code, message) {
        super(message)
        this.code = code
        Object.setPrototypeOf(this, HttpError.prototype)
    }
}