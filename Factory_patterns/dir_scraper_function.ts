import fs from "fs";

interface IFileReader {
    isJSONfile(file: string) : boolean;
    readText(file: string) : string;
    readJSON(file: string) : unknown;
};


const directoryScraper = ( dirPath: string,  fileReader: IFileReader) =>  {
    return fs.readdirSync(dirPath)
    .reduce<Record<string, unknown>>((acc: Record<string, unknown>, file: string) => {
        if(fileReader.isJSONfile(file)){
            acc[file] = fileReader.readJSON(`${dirPath}/${file}`);
        }else{
            acc[file] = fileReader.readText(`${dirPath}/${file}`);
        }
        return acc;
    }, {})
}
    //not defining public for specifiled values in constructor makes them inaccessible in tthe class itself.
    
      
    



const fileReader: IFileReader = {
    isJSONfile(file: string): boolean {
        return file.endsWith(".json");
    },

    readText(file: string): string {
        return fs.readFileSync(file, "utf8");
    },

    readJSON(file: string): unknown {
        return JSON.parse(fs.readFileSync(file, "utf8"));
    }
};


const output = directoryScraper("./data", fileReader);
console.log(output);

