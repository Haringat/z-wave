#!/usr/bin/env node --experimental-modules

import commander from "commander";
import {
    decode,
    encode
} from "./index"
import packageDefinition from "./package.json";
import fs from "fs";
import JSONStream from "JSONstream";

const {
    parse: parseJSON,
    stringify: stringifyJSON
} = JSONStream;
const {
    createReadStream,
    createWriteStream
} = fs;

commander.name("z-wave")
    .version(packageDefinition.version)
    .description("Encode or decode z-wave packages.");

commander.command("decode")
    .alias("d")
    .description("decode z-wave package")
    .option("-i, --input-file <file>", "read input from file instead of stdin")
    .option("-o, --output-file <file>", "write output to file instead of stdout")
    .arguments("-i")
    .action((cmd) => {

        console.log(`decode`);

        let input;
        if (cmd.inputFile !== undefined) {
            input = createReadStream(cmd.inputFile);
        } else {
            input = process.stdin;
        }

        let output;
        if (cmd.outputFile !== undefined) {
            output = createWriteStream(cmd.outputFile);
        } else {
            output = process.stdout;
        }

        input.pipe(decode()).pipe(stringifyJSON()).pipe(output);
    });

commander.command("encode")
    .alias("e")
    .description("encode z-wave package")
    .option("-i, --input-file <file>", "read input from file instead of stdin")
    .option("-o, --output-file <file>", "write output to file instead of stdout")
    .action((cmd) => {

        console.log(`encode`);

        let input;
        if (cmd.inputFile !== undefined) {
            input = createReadStream(cmd.inputFile);
        } else {
            input = process.stdin;
        }

        let output;
        if (cmd.outputFile !== undefined) {
            output = createWriteStream(cmd.outputFile);
        } else {
            output = process.stdout;
        }

        input.pipe(parseJSON()).pipe(encode()).pipe(output);
    });

commander.parse(process.argv);

assertRequiredArgs(commander);

// source: https://github.com/tj/commander.js/pull/462
function assertRequiredArgs(cli) {
    const ommittedRequiredParameters = [];
    cli.options.forEach((option) => {
        const name = option.long.slice(2);
        if (option.required && !cli.hasOwnProperty(name)) {
            ommittedRequiredParameters.push(`--${name}`);
        }
    });

    if (ommittedRequiredParameters.length !== 0) {
        console.error(`The following required parameters were ommitted: ${ommittedRequiredParameters.join(', ')}`);
        cli.help();
        process.exit(-1);
    }
}
