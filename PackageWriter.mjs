import stream from "stream";

const {
    Transform
} = stream;

export default class PackageWriter extends Transform {

    constructor() {
        super({
            writableObjectMode: true,
            readableObjectMode: false
        });

    }

}