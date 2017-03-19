/*例1.使用Promise.resolve()启动*/
// let task1 = (value1)=>value1+1;
// let task2 = (value2)=>value2+2;
// let task3 = (value3)=>{console.log(value3+3)};

// Promise.resolve(1).then(task1).then(task2).then(task3);//console => 7


/*例2.普通的返回一个Promise*/
function task1(){
  var b = 8
  return new Promise((resolve,reject)=>{
    if(resolve){
      resolve(b+1);
    }else{
      throw new Error("throw Error @ task1");
    }
  });
}

function task2(value2){
  return new Promise((resolve,reject)=>{
    if(resolve){
      resolve(value2+2);
    }else{
      throw new Error("throw Error @ task1");
    }
  });
}
function task3(value3){
  return new Promise((resolve,reject)=>{
    if(resolve){
      console.log(value3+3);
    }else{
      throw new Error("throw Error @ task1");
    }
  });
}

task1(1).then(task2).then(task3);
