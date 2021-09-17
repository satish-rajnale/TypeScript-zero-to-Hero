import fs from "fs";

interface Result {
    results: {
        id: number,
        name:string,
        job:string
    }[];
}

const printJobs = (results: Result) => {
    results.results.forEach(({job}) => {
        console.log(job);
    })
};
// this wont throw an err
// printJobs({
//     results:[{
//         id:1,
//         name:"satish",
//         job:"Developer"
//     }]
// });

const data: Result = JSON.parse(fs.readFileSync("data.json", "utf-8"));
printJobs(data);// this here shows no error even if data.json has no balue resembling Result
//will throw runtime error
