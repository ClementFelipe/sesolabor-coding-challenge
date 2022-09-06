const syncSortedMerge = require('../../solution/sync-sorted-merge');

class FakeLogSource {
  constructor(ls) {
    this.ls = ls;
  }

  pop() {
    const val = this.ls.shift();
    return val ? { date: val, msg: '' } : false;
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

describe('sync-sorted-merge', () => {
  test('should print logs from multiple sources in order', () => {
    const logs = [
      [new Date('2022-09-01T00:00:00.000Z'), new Date('2022-09-08T00:00:00.000Z'), new Date('2022-09-11T00:00:00.000Z'), new Date('2022-09-12T00:00:00.000Z')],
      [new Date('2022-09-07T00:00:00.000Z'), new Date('2022-09-10T00:00:00.000Z'), new Date('2022-09-11T00:00:00.000Z'), new Date('2022-09-30T00:00:00.000Z')],
      [new Date('2022-09-03T00:00:00.000Z'), new Date('2022-09-04T00:00:00.000Z'), new Date('2022-09-13T00:00:00.000Z'), new Date('2022-09-20T00:00:00.000Z')],
    ];

    const logSources = logs.map((ls) => new FakeLogSource(ls));

    const printer = new FakePrinter();

    syncSortedMerge(logSources, printer);

    expect(printer.list).toStrictEqual([
      '2022-09-01T00:00:00.000Z', '2022-09-03T00:00:00.000Z', '2022-09-04T00:00:00.000Z', '2022-09-07T00:00:00.000Z',
      '2022-09-08T00:00:00.000Z', '2022-09-10T00:00:00.000Z', '2022-09-11T00:00:00.000Z', '2022-09-11T00:00:00.000Z',
      '2022-09-12T00:00:00.000Z', '2022-09-13T00:00:00.000Z', '2022-09-20T00:00:00.000Z', '2022-09-30T00:00:00.000Z',
    ]);
  });
});
