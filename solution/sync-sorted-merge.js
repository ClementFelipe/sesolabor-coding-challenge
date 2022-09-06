const MinHeap = require('./min-heap/MinHeap');
// Print all entries, across all of the sources, in chronological order.
// const Printer = require('../lib/printer');

function addLogSourceIndexToLog(log, logSourceIndex) {
  return { ...log, logSourceIndex };
}

module.exports = (logSources, printer) => {
  const heap = new MinHeap();

  let remainingSourcesCount = logSources.length;

  logSources.forEach((source, i) => {
    const log = source.pop();

    if (log) {
      heap.insert(log.date.getTime(), addLogSourceIndexToLog(log, i));
    } else {
      remainingSourcesCount -= 1;
    }
  });

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

// class FakeLogSource {
//   constructor(ls) {
//     this.ls = ls;
//   }

//   pop() {
//     const val = this.ls.shift();
//     return val ? { date: new Date(24 * 60 * 60 * 1000 * val), msg: '' } : false;
//   }
// }

// const lss = [
//   [1, 8, 11, 12],
//   [7, 10, 11, 30],
//   [3, 4, 13, 20],
// ];

// const sources = [];

// for (let i = 0; i < lss.length; i += 1) {
//   sources.push(new FakeLogSource(lss[i]));
// }

// const printer = new Printer();

// solution(sources, printer);
