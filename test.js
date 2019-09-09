const arr = [
    console.log(1),
    console.log(2),
    console.log(3)
]

let t = Promise.all(arr);
t.then(() => console.log("Finished"));