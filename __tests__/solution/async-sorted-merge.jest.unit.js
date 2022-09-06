const _ = require('lodash');
const P = require('bluebird');
const asyncSortedMerge = require('../../solution/async-sorted-merge');

class FakeLogSource {
  constructor(ls) {
    this.ls = ls;
  }

  popAsync() {
    const val = this.ls.shift();
    return P.delay(_.random(8)).then(() => (val ? { date: val, msg: '' } : false));
  }
}

class FakePrinter {
  constructor() {
    this.list = [];
  }

  print(log) {
    this.list.push(log.date.toISOString());
  }

  done() {}
}

describe('async-sorted-merge', () => {
  test('should print logs from multiple sources in order', async () => {
    const logs = [
      [new Date('2022-09-01T00:00:00.000Z'), new Date('2022-09-08T00:00:00.000Z'), new Date('2022-09-11T00:00:00.000Z'), new Date('2022-09-12T00:00:00.000Z')],
      [new Date('2022-09-07T00:00:00.000Z'), new Date('2022-09-10T00:00:00.000Z'), new Date('2022-09-11T00:00:00.000Z'), new Date('2022-09-30T00:00:00.000Z')],
      [new Date('2022-09-03T00:00:00.000Z'), new Date('2022-09-04T00:00:00.000Z'), new Date('2022-09-13T00:00:00.000Z'), new Date('2022-09-20T00:00:00.000Z')],
    ];

    const logSources = logs.map((ls) => new FakeLogSource(ls));

    const printer = new FakePrinter();

    await asyncSortedMerge(logSources, printer);

    expect(printer.list).toStrictEqual([
      '2022-09-01T00:00:00.000Z', '2022-09-03T00:00:00.000Z', '2022-09-04T00:00:00.000Z', '2022-09-07T00:00:00.000Z',
      '2022-09-08T00:00:00.000Z', '2022-09-10T00:00:00.000Z', '2022-09-11T00:00:00.000Z', '2022-09-11T00:00:00.000Z',
      '2022-09-12T00:00:00.000Z', '2022-09-13T00:00:00.000Z', '2022-09-20T00:00:00.000Z', '2022-09-30T00:00:00.000Z',
    ]);
  });
});
