import {
    encode as encodeManchester,
    decode as decodeManchester
} from "manchester";
import PackageReader from "./PackageReader";
import PackageWriter from "./PackageWriter";

export function decode() {
    return decodeManchester()
        .pipe(new PackageReader());
}

export function encode() {
    return new PackageWriter()
        .pipe(encodeManchester());
}