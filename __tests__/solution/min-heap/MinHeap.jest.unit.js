const MinHeap = require('../../../solution/min-heap/MinHeap');
const HeapNode = require('../../../solution/min-heap/HeapNode');

describe('MinHeap', () => {
  test('should insert in correct order 1', () => {
    const entries = [0, 1, 2, 3, 4, 5];

    const heap = new MinHeap();

    entries.forEach((e) => heap.insert(e));

    expect(heap.heap).toStrictEqual([
      new HeapNode(0),
      new HeapNode(1),
      new HeapNode(2),
      new HeapNode(3),
      new HeapNode(4),
      new HeapNode(5),
    ]);
  });

  test('should insert in correct order 2', () => {
    const entries = [5, 4, 3, 2, 1, 0];

    const heap = new MinHeap();

    entries.forEach((e) => heap.insert(e));

    expect(heap.heap).toStrictEqual([
      new HeapNode(0),
      new HeapNode(2),
      new HeapNode(1),
      new HeapNode(5),
      new HeapNode(3),
      new HeapNode(4),
    ]);
  });

  test('should insert in correct order 3', () => {
    const entries = [6, 2, 9, 3, 11, 0];

    const heap = new MinHeap();

    entries.forEach((e) => heap.insert(e));

    expect(heap.heap).toStrictEqual([
      new HeapNode(0),
      new HeapNode(3),
      new HeapNode(2),
      new HeapNode(6),
      new HeapNode(11),
      new HeapNode(9),
    ]);
  });

  test('should replace minimum and conserve order 1', () => {
    const entries = [0, 1, 2, 3, 4, 5];

    const heap = new MinHeap();

    entries.forEach((e) => heap.insert(e));

    heap.replaceMin(10);

    expect(heap.heap).toStrictEqual([
      new HeapNode(1),
      new HeapNode(3),
      new HeapNode(2),
      new HeapNode(10),
      new HeapNode(4),
      new HeapNode(5),
    ]);
  });

  test('should replace minimum and conserve order 2', () => {
    const entries = [5, 4, 3, 2, 1, 0];

    const heap = new MinHeap();

    entries.forEach((e) => heap.insert(e));

    heap.replaceMin(10);

    expect(heap.heap).toStrictEqual([
      new HeapNode(1),
      new HeapNode(2),
      new HeapNode(4),
      new HeapNode(5),
      new HeapNode(3),
      new HeapNode(10),
    ]);
  });

  test('should replace minimum and conserve order 3', () => {
    const entries = [0, 1, 2, 100, 200];

    const heap = new MinHeap();

    entries.forEach((e) => heap.insert(e));

    heap.replaceMin(50);

    expect(heap.heap).toStrictEqual([
      new HeapNode(1),
      new HeapNode(50),
      new HeapNode(2),
      new HeapNode(100),
      new HeapNode(200),
    ]);
  });

  test('should replace minimum and conserve order 4', () => {
    const entries = [0, 100, 2, 200, 300, 5];

    const heap = new MinHeap();

    entries.forEach((e) => heap.insert(e));

    heap.replaceMin(7);

    expect(heap.heap).toStrictEqual([
      new HeapNode(2),
      new HeapNode(100),
      new HeapNode(5),
      new HeapNode(200),
      new HeapNode(300),
      new HeapNode(7),
    ]);
  });
});
