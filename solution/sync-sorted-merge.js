const MinHeap = require('./min-heap/MinHeap');
// Print all entries, across all of the sources, in chronological order.
// const Printer = require('../lib/printer');

function addLogSourceIndexToLog(log, logSourceIndex) {
  return { ...log, logSourceIndex };
}

// SEE README for the general explanation of the algorithm
module.exports = (logSources, printer) => {
  // PART 1 - We build the initial min-heap with the first elements of every
  // log source. Declare a variable that counts down whenever a log source is drained,
  // execution will stop when all sources are drained.
  const heap = new MinHeap();

  let remainingSourcesCount = logSources.length;

  logSources.forEach((source, i) => {
    const log = source.pop();

    // Check that we dont get a "false" from the start, The way LogSource is implemented
    // this will never happen, but it's best to be safe in a real world scenario
    if (log) {
      heap.insert(log.date.getTime(), addLogSourceIndexToLog(log, i));
    } else {
      remainingSourcesCount -= 1;
    }
  });

  // PART 2 - Iterate the following:
  //   - Print minimum (earliest log) from the heap
  //   - Replace the removed log with the next log from it's same source
  //   - If we are done with the source (get a "false") then we add MAX_VALUE
  //     to the heap so it goes to the bottom
  while (remainingSourcesCount > 0) {
    const { object: currentLog } = heap.getMin();
    printer.print(currentLog);

    const { logSourceIndex } = currentLog;
    const nextLog = logSources[logSourceIndex].pop();

    if (nextLog) {
      heap.replaceMin(nextLog.date.getTime(), addLogSourceIndexToLog(nextLog, logSourceIndex));
    } else {
      heap.replaceMin(Number.MAX_VALUE);
      remainingSourcesCount -= 1;
    }
  }

  printer.done();
};
