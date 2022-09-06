const HeapNode = require('./HeapNode');

module.exports = class MinHeap {
  constructor() {
    this.heap = [];
    this.size = 0;
  }

  insert(value, object) {
    const newNode = new HeapNode(value, object);

    this.heap.push(newNode);
    this.size += 1;

    this.swapUp();
  }

  replaceMin(value, object) {
    const newNode = new HeapNode(value, object);

    this.heap[0] = newNode;

    this.swapDown();
  }

  getMin() {
    return this.heap[0];
  }

  popMin() {
    if (this.size < 1) {
      return undefined;
    }

    const min = this.heap[0];

    const lastIndex = this.size - 1;
    const last = this.heap[lastIndex];

    this.heap[lastIndex] = undefined;

    if (this.size > 1) {
      this.replaceMin(last.value, last.object);
    }

    this.size -= 1;

    return min;
  }

  popAll() {
    const all = [];

    while (this.size > 0) {
      all.push(this.popMin());
    }

    return all;
  }

  swapUp() {
    let lastIndex = this.heap.length - 1;
    let parentIndex = this.getParentIndex(lastIndex);

    let lastNode = this.heap[lastIndex];
    let parentNode = this.heap[parentIndex];

    while (parentNode !== undefined && lastNode.value < parentNode.value) {
      this.swap(parentNode, lastNode);

      lastIndex = parentIndex;
      parentIndex = this.getParentIndex(lastIndex);

      lastNode = this.heap[lastIndex];
      parentNode = this.heap[parentIndex];
    }
  }

  swapDown() {
    let currentIndex = 0;
    let leftIndex = this.getLeftIndex(0);
    let rightIndex = this.getRightIndex(0);

    let current = this.heap[currentIndex];
    let left = this.heap[leftIndex];
    let right = this.heap[rightIndex];

    let isFinished = false;

    while (!isFinished) {
      let smallestIndex = currentIndex;
      let smallest = current;

      if (left !== undefined && left.value < smallest.value) {
        smallestIndex = leftIndex;
        smallest = left;
      }

      if (right !== undefined && right.value < smallest.value) {
        smallestIndex = rightIndex;
        smallest = right;
      }

      if (smallestIndex !== currentIndex) {
        this.swap(smallest, current);

        currentIndex = smallestIndex;
        leftIndex = this.getLeftIndex(currentIndex);
        rightIndex = this.getRightIndex(currentIndex);

        current = this.heap[currentIndex];
        left = this.heap[leftIndex];
        right = this.heap[rightIndex];
      } else {
        isFinished = true;
      }
    }
  }

  swap(node1, node2) {
    const tempValue = node1.value;
    node1.value = node2.value;
    node2.value = tempValue;

    const tempObject = node1.object;
    node1.object = node2.object;
    node2.object = tempObject;
  }

  getParentIndex(index) {
    return Math.ceil((index / 2) - 1);
  }

  getLeftIndex(index) {
    return index * 2 + 1;
  }

  getRightIndex(index) {
    return index * 2 + 2;
  }
};
