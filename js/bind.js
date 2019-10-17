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
console.log('part1 end')

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

bindFoo1(19); // 1 test 19
console.log('part2 end')
//part3 bind演示
var value = 2;

var foo2 = {
    value: 1
};

function bar2(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}

bar2.prototype.friend = 'kevin';

var bindFoo = bar2.bind(foo, 'daisy');

var obj = new bindFoo('18');
// undefined
// daisy
// 18
console.log(obj.habit);
console.log(obj.friend);
// shopping
// kevin

console.log('part3 end')
//part3 bind演示 说明bind构造函数效果 this指向了obj实例,而不是foo,绑定函数中this定义的变量可以获得,绑定函数原型定义的变量也可以获得
//模拟方法如下
//3.bind构造函数模拟
Function.prototype.bind3=function(context){
   
    var self=this;//self表示绑定函数
    var args=Array.prototype.slice.call(arguments,1);//获取函数参数的第二个到最后的参数(第一个是context)
    var boundReturn= function(){
        var bindArgs=Array.prototype.slice.call(arguments);////获取返回函数所有参数
        //核心 绑定函数执行,传实例本身或context
        return self.apply(this instanceof boundReturn?this:context,args.concat(bindArgs));//this表示实例或windows
        //使用return是因为函数可能有返回值,apply第二个参数是数组,代表传入参数
        //若为构造函数,则this为返回函数的实例,将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值(habbit)
        //当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
    }
    boundReturn.prototype=this.prototype;//返回函数的原型修改为绑定函数的原型,实例就能获取到绑定函数原型的属性(friend),原型继承
    return boundReturn;
}
//4.优化
Function.prototype.bind3=function(context){

    if (typeof this !== "function") {//加判断
        throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }
   
    var self=this;//self表示绑定函数
    var args=Array.prototype.slice.call(arguments,1);//获取函数参数的第二个到最后的参数(第一个是context)
    
    var fNOP = function () {};//加入中间函数
    
    var boundReturn= function(){
        var bindArgs=Array.prototype.slice.call(arguments);////获取返回函数所有参数
        //核心 绑定函数执行,传实例本身或context
        return self.apply(this instanceof boundReturn?fNOP :context,args.concat(bindArgs));//this表示实例或windows
        //使用return是因为函数可能有返回值,apply第二个参数是数组,代表传入参数
        //若为构造函数,则this为返回函数的实例,将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值(habbit)
        //当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
    }


    // boundReturn.prototype=this.prototype;//返回函数的原型修改为绑定函数的原型,实例就能获取到绑定函数原型的属性(friend),原型继承
    fNOP.prototype = this.prototype;
    boundReturn.prototype = new fNOP();
    
    
    return boundReturn;
}