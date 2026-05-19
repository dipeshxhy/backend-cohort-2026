setTimeout(() => {
  console.log('Hello from timer');
}, 0);

setImmediate(() => {
  console.log('Hello from immediate');
}, 0);

// console.log('Hello from top level code');

/**
 * when we remove console.log then immediate run before timeout because it depends on how the nodejs handler the phases and it enforse the delay of timer.
 *
 * when there is only two cb like timeout and immediate which expired in 0 ms so it runs fast so nodejs give 1ms delay to timer so when event loop runs it checks is there any expired timer no so it moves to next phase and check there  there is immediate cb which is ready to run so immediate runs before timer
 *
 * but when we add top level code like console. it minimum takes minimum ms to run so when event loop runs the 1ms delay pass so timer run before immediate
 */
