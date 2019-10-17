//手写一个bind函数

//1.bind方法返回一个新函数 
Function.prototype.bind2=function(context){
    var self=this;
    return function(){
        return self.apply(context);//使用return是因为函数可能有返回值
    }
}

var foo = {
    value: 1
};

function bar() {
	return this.value;
}

var bindFoo = bar.bind2(foo);

console.log(bindFoo()); // 1

//2.bind方法可以传参数
Function.prototype.bind3=function(context){
    var self=this;
    var args=Array.prototype.slice.call(arguments,1);//获取函数参数的第二个到最后的参数(第一个是context)
    return function(){
        var bindArgs=Array.prototype.slice.call(arguments);////获取返回函数所有参数
        return self.apply(context,args.concat(bindArgs));//使用return是因为函数可能有返回值,apply第二个参数是数组,代表传入参数
    }
}

var foo1 = {
    value: 1
};

function bar1(name,age) {
    console.log(this.value);
    console.log(name);
    console.log(age);
}

var bindFoo1 = bar1.bind3(foo1,'test');

console.log(bindFoo1(19)); // 1 test 19