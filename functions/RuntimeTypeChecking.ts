import fs from "fs";
import { z } from "zod";// can use joi or yup also

const ResultSchema = z.object({
    results : z.array(
        z.object({
            id: z.number().min(100), // meaning must be 100 or more
            name: z.string(),
            job: z.string()
        })
    )
});


//you want to have a runtime check with resultschema but also want a compile time check with interface result so use z.infer
type Result = z.infer<typeof ResultSchema>;


// interface Result {
//     results: {
//         id: number,
//         name:string,
//         job:string
//     }[];
// }

const printJobs = (results: Result) => {
    
    results?.results?.forEach(({job}) => { // doing ? will not print anything as it has no else check on it 
        console.log(job);
    })
};
// this wont throw an err at runtime without ?
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


const printJobswithZod = (results: Result) => {
    if(ResultSchema.safeParse(results).success){
    results?.results?.forEach(({job}) => {
        console.log(job);
    })
}else{
    console.log("Bad data")
}
};
printJobswithZod(data);