const revKillTime = 45; //seconds
const taskSkipTime = 360; //seconds
const revsAssigned = 93; //assumes slaughter + 70 kill task
const revWeight = 417; //4.17%

function onTask(){
    let totalTime = 0;
    let kc = 0;
    let skipping = true;
    let taskKc = 0;
    let drop = false;
    let taskCount = 0;
    let taskTotal = 0;
    
    while(!drop){
        while(skipping){
            let task = Math.floor(Math.random() * 10000)//0 to 10000
            if(task < revWeight){
                //on task
                taskKc = revsAssigned;
                skipping = false;
            }
            else{
                //skip this task and get a new one.
                taskCount++;
                totalTime = totalTime + taskSkipTime;
            }
        }
        //we now have a task so:
    
        while(taskKc != 0){
            let rng = Math.floor(Math.random() * 2933) //0 to 2933
            totalTime = totalTime + revKillTime;
            kc++;
            if(rng == 0){            //dropped
                drop = true;
                taskKc = 0;
            }
            else{
                taskKc--;
            }
        }
        
        let slayerCape = Math.floor(Math.random() * 10) //0 to 9
        if(slayerCape == 0){
            taskKc = revsAssigned;
            skipping = false;
        }
        else{
            skipping = true;
        }
        taskTotal = taskTotal + taskCount;
        taskCount = 0;
    }
    return (totalTime/60)/60; //returns in hours
}

function offTask(){
    let totalTime = 0;
    let kc = 0;
    let reving = true;
    
    while(reving){
        let rng = Math.floor(Math.random() * 14667) //0 to 14666
        totalTime = totalTime + revKillTime;
        kc++;
        if(rng == 0){            //dropped
            reving = false;
        }
    }
   return (totalTime/60)/60; //returns in hours
}

function runCalc(){
    //run 10000 simulations
    let onTaskTime = [];
    let offTaskTime = [];
    for(let i = 0; i < 10000; i++){
        let onTaskRun = onTask();
        let offTaskRun = offTask();
        onTaskTime.push(onTaskRun);
        offTaskTime.push(offTaskRun);
    }
    console.log("Average on task rev time per weapon: " + averageTime(onTaskTime) + " hours");
    console.log("Average off task rev time per weapon: " + averageTime(offTaskTime) + " hours");
}

//returns time in hours
function averageTime(arr){
    let total = 0;
    for(let i = 0; i < arr.length; i++){
        total = total + arr[i];
    }
    total = total/arr.length;
    return total; // minutes into hours
}

runCalc();
