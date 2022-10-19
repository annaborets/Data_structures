class Stack {
  constructor(elements) {
    this.elements = Array.isArray(elements) ? elements : [];
  }
  addNewStackItem(item) {
    return this.elements.push(item);
  }
  popStackItem() {
    return this.elements.pop();
  }
  getLastStackItem() {
    return this.elements[this.getStackSize(this.elements) - 1];
  }
  isStackEmpty() {
    return this.getStackSize() === 0;
  }
  getStackSize() {
    return this.elements.length;
  }
  printStack() {
    console.log(this.elements);
  }
}
