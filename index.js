const express = require("express");

const{ Worker } = require("worker_threads");

const app = express();
const port = process.env.PORT || 3000;
const thread_count = 2;

function createWorker(){
    return new Promise((resolve, reject) => {
        const worker = new Worker("./worker.js",{
            workerData:{thread_count:thread_count}
        })
        //const worker = new Worker("./worker.js");

        worker.on("message",(counter)=>{
            resolve(counter);
        });
    
        worker.on("error",(error)=>{
            reject(`an error occured ${error}`);
        });

    })

   
}


app.get("/non-blocking",(req,res)=>{
    res.status(200).send("This is a non-blocking page");
});

app.get("/blocking",async(req,res)=>{
    
    const workerPromises = [];

        for(let i = 0; i<thread_count; i++){
            workerPromises.push(createWorker())
        }
    const thread_results = await Promise.all(workerPromises);
    const total = thread_results[0]+thread_results[1];
    res.status(200).send(`result is ${total}`);

    
});


app.listen(port,()=>{
    console.log(`app is listening on port ${port}`);
});



