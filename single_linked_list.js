class LinkedListNode {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  getHeadOfList() {
    return this.head.data;
  }
  appendElementToList(data) {
    const node = new LinkedListNode(data);
    if (this.tail) {
      this.tail.next = node;
    }
    if (!this.head) {
      this.head = node;
    }
    this.tail = node;
    this.length++;
  }
  prependElementToList(data) {
    const node = new LinkedListNode(data, this.head);
    this.head = node;
    if (!this.tail) {
      this.tail = node;
    }
    this.length++;
  }
  findElement(data) {
    if (!this.head) {
      return;
    }
    let current = this.head;
    while (current) {
      if (current.data === data) {
        return current;
      }
      current = current.next;
    }
  }
  insertAfter(after, data) {
    const found = this.findElement(after);
    if (!found) {
      return;
    }
    const node = new LinkedListNode(data, found.next);
    found.next = node;
    this.length++;
  }
  deleteElement(data) {
    if (!this.head) {
      return;
    }
    if (this.head && this.head.data === data) {
      this.head = this.head.next;
    }
    let current = this.head;
    while (current.next) {
      if (current.next.data === data) {
        current.next = current.next.next;
      } else {
        current = current.next;
      }
    }
    if (this.tail.data === data) {
      this.tail = current;
    }
    this.length--;
  }
  getListLength() {
    return this.length;
  }
  printListData() {
    let current = this.head;

    while (current) {
      console.log(current.data);
      current = current.next;
    }
  }
}
