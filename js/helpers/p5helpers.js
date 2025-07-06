function runBetweenPushAndPop(func) {
    push();
    func();
    pop();
}