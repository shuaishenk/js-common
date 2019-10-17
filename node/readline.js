const readline =require('readline') ;
const fs=require('fs');

let readStream = fs.createReadStream('test.txt');
let writeStream = fs.createWriteStream('./result.txt');
const rl = readline.createInterface({
    input: readStream
});
let array=[]
rl.on('line', (input) => {
    console.log(`Received: ${input}`);
    array.push(input)
});
rl.on('close', function () {

});
readStream.on('end', () => {
    console.log('readTxt end');
    // console.log({array})
    writeStream.end(Buffer.from(array.join(',')))
    // fs.writeFileSync('./result.txt',Buffer.from(array.join(',')))
});
readStream.on('error', (err) => {
    console.log('解析txt失败',err);
});