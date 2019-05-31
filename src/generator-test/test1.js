function* g() {
    yield 'a';
    yield 'b';
    yield 'c';
    return 'ending';
}

const gen = g();

function next(){
    let { value, done } = gen.next()
    console.log(value) // 依次打印输出 a b c end
    if(!done) next() // 直到全部完成
}
next()