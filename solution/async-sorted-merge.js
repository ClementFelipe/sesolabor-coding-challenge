// Print all entries, across all of the *async* sources, in chronological order.

const MinHeap = require('./min-heap/MinHeap');

function addLogSourceIndexToLog(log, logSourceIndex) {
  return { ...log, logSourceIndex };
}

// Most of this is the same as the synchronous solution, with the exception
// of an extra step that builds a log cache after the initial heap creation.
module.exports = async (logSources, printer) => {
  // PART 1 - We build the initial min-heap with the first elements of every
  // log source. Declare a variable that counts down whenever a log source is drained,
  // execution will stop when all sources are drained.
  const heap = new MinHeap();

  let remainingSourcesCount = logSources.length;

  const initialLogs = await Promise.all(logSources.map((l) => l.popAsync()));

  initialLogs.forEach((log, i) => {
    // Check that we dont get a "false" from the start, The way LogSource is implemented
    // this will never happen, but it's best to be safe in a real world scenario
    if (log) {
      heap.insert(log.date.getTime(), addLogSourceIndexToLog(log, i));
    } else {
      remainingSourcesCount -= 1;
    }
  });

  // PART 2 - Build a cache for logs. This cache is built by obtaining the next logs from
  // all N sources every time the cache size is lowered to a certain amount. In effect, this
  // fetches all logs every N logs printed.

  // Ideally, I would've liked to implement a series of background processes, one for each
  // log source, such that they could continually fetch the next log and save it to a
  // series of queues for each log source. This would enable execution of the heap process
  // while logs are fetched in the background, having to await a value only when a queue is empty.
  // This was not implemented due to time constraints.

  // A generator function is used that is called every time a log is put into the heap. This
  // then checks on every execution that the cache size is maintained, fetching the N next
  // logs in case it is not, or when a log source cache is empty but hasn't been drained.
  async function* logSourceCache() {
    const logSourcesCache = logSources.map((_) => []);

    while (true) {
      const logCacheSize = logSourcesCache.reduce((sum, ls) => sum + ls.length, 0);
      const sourceIndex = yield -1;

      if (logCacheSize < 300 || logSourcesCache[sourceIndex].length === 0) {
        const nextLogs = await Promise.all(
          logSources.map((s) => (s.drained ? false : s.popAsync())),
        );

        nextLogs.forEach((log, i) => logSourcesCache[i].push(log));
      }

      // Unshift is O(n), a proper queue should be used here, but it was not implemented
      // due to time constraints
      yield logSourcesCache[sourceIndex].shift();
    }
  }

  const cache = logSourceCache();

  // PART 3 - Iterate the following:
  //   - Print minimum (earliest log) from the heap
  //   - Replace the removed log with the next log from it's same source
  //   - If we are done with the source (get a "false") then we add MAX_VALUE
  //     to the heap so it goes to the bottom
  while (remainingSourcesCount > 0) {
    const { object: currentLog } = heap.getMin();

    printer.print(currentLog);

    const { logSourceIndex } = currentLog;

    await cache.next();
    const nextLog = (await cache.next(logSourceIndex)).value;

    if (nextLog) {
      heap.replaceMin(nextLog.date.getTime(), addLogSourceIndexToLog(nextLog, logSourceIndex));
    } else {
      heap.replaceMin(Number.MAX_VALUE);
      remainingSourcesCount -= 1;
    }
  }

  printer.done();
};
