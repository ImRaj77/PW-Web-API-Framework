
import fs from "fs";
import {parse} from 'csv-parse/sync';

export class CsvHelper {

    static readCsv(filePath : string) {
        return parse(fs.readFileSync(filePath, 'utf-8'), {
            columns : true,                                  // 1st row is always  headers
            skip_empty_lines : true,                         // mistakenly added empty lines to be skipped
            trim : true,                                     // Autpomatically trim the space
        }) as Record<string, string>[];                      // Everything in a csv file is a string
    }
}