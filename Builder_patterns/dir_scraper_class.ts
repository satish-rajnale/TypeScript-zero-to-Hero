import fs from "fs";

interface IFileReader {
    isJSONfile(file: string) : boolean;
    readText(file: string) : string;
    readJSON(file: string) : unknown;
};


class DirectoryScraper {
    constructor(public dirPath: string, public fileReader: IFileReader) {}
    //not defining public for specifiled values in constructor makes them inaccessible in tthe class itself.
    scanFiles() {
        return fs.readdirSync(this.dirPath)
            .reduce<Record<string, unknown>>((acc: Record<string, unknown>, file: string) => {
                if(this.fileReader.isJSONfile(file)){
                    acc[file] = this.fileReader.readJSON(`${this.dirPath}/${file}`);
                }else{
                    acc[file] = this.fileReader.readText(`${this.dirPath}/${file}`);
                }
                return acc;
            }, {})
    }
}


class FileReader implements IFileReader {
    isJSONfile(file: string): boolean {
        return file.endsWith(".json");
    }

    readText(file: string): string {
        return fs.readFileSync(file, "utf8");
    }

    
    readJSON(file: string): unknown {
        return JSON.parse(fs.readFileSync(file, "utf8"));
    }
};

const fileReader = new FileReader();
const dirScraper = new DirectoryScraper("./data", fileReader);

const output = dirScraper.scanFiles();
console.log(output);

