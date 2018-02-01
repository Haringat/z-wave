import stream from "stream";

const {
    Transform
} = stream;

export default class PackageReader extends Transform {

    constructor() {
        super({
            writableObjectMode: false,
            readableObjectMode: true
        });
    }

    _transform(chunk, encoding, callback) {
        try {
            console.log(chunk.toString("hex"));
            callback();
        } catch(e) {
            callback(e);
        }
    }

}