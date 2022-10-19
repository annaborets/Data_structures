class Queue {
  constructor(elements) {
    this.elements = Array.isArray(elements) ? elements : [];
  }
  addNewQueueItem(item) {
    return this.elements.push(item);
  }
  deleteFrontQueueItem() {
    return this.elements.shift();
  }
  getFrontQueueItem() {
    return this.elements[0];
  }
  getQueueSize() {
    return this.elements.length;
  }
  isQueueEmpty() {
    return this.getQueueSize() === 0;
  }
  printQueue() {
    console.log(this.elements);
  }
}
