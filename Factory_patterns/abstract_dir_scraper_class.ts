import fs from 'fs';

// this is loose coupling beteen the actual directory scraper
//and the function implementation to check whether a file is a json file or not

//here we abstract the DirectoryScraper class so it cant be instantiated
abstract class DirectoryScraper {
  constructor(public dirPath: string) {}
  //not defining public for specifiled values in constructor makes them inaccessible in tthe class itself.
  scanFiles() {
    return fs
      .readdirSync(this.dirPath)
      .reduce<Record<string, unknown>>(
        (acc: Record<string, unknown>, file: string) => {
          if (this.isJSONfile(file)) {
            acc[file] = this.readJSON(`${this.dirPath}/${file}`);
          } else {
            acc[file] = this.readText(`${this.dirPath}/${file}`);
          }
          return acc;
        },
        {}
      );
  }

  abstract isJSONfile(file: string): boolean;
  abstract readText(file: string): string;
  abstract readJSON(file: string): unknown;
}

class FileReader extends DirectoryScraper {
  isJSONfile(file: string): boolean {
    return file.endsWith('.json');
  }

  readText(file: string): string {
    return fs.readFileSync(file, 'utf8').toString();
  }

  readJSON(file: string): unknown {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  }
}

const fileReader = new FileReader('./data');

const output = fileReader.scanFiles();
console.log(output);
