const inputAdd = document.querySelector(".input__item_add");
const inputAfter = document.querySelector(".input__item_after");
const list = document.querySelector(".list__container");
const addBtn = document.querySelector(".buttons__item_add");
const removeBtn = document.querySelector(".buttons__item_remove");
const reverseBtn = document.querySelector(".buttons__item_reverse");
const containerForItems = document.querySelector(".list");

class LinkedListNode {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  getHead() {
    return this.head.data;
  }

  appendElement(data) {
    if (this.getLength() >= 10) {
      alert("Too much items!");
      return;
    }
    const node = new LinkedListNode(data);
    let current;
    if (!this.head) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.length++;
  }

  prependElement(data) {
    const node = new LinkedListNode(data, this.head);
    node.next = this.head;
    this.head = node;
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

  insertElementAfter(after, data) {
    const found = this.findElement(after);
    if (!found) {
      alert("Value not found");
      return;
    }
    const node = new LinkedListNode(data, found.next);
    found.next = node;
    this.length++;
  }

  deleteElement(data) {
    let found = this.findElement(data);
    if (!found) {
      alert("Value not found");
      return;
    }
    let current = this.head;
    let prev = null;
    if (!current) {
      return;
    }
    while (current) {
      if (current.data === data) {
        if (prev === null) {
          this.head = current.next;
        } else {
          prev.next = current.next;
        }
        this.length--;
        return current.data;
      }
      prev = current;
      current = current.next;
    }
  }

  reverse() {
    if (!this.head || !this.head.next) {
      return this.head;
    }
    let previous = null;
    let next = null;
    while (this.head !== null) {
      next = this.head.next;
      this.head.next = previous;
      previous = this.head;
      this.head = next;
    }
    this.head = previous;

    return previous;
  }

  getLength() {
    return this.length;
  }

  printData() {
    let current = this.head;

    while (current) {
      console.log(current.data);
      current = current.next;
    }
  }

  renderItems() {
    containerForItems.classList.remove("list_empty");
    containerForItems.innerHTML = "";
    let current = this.head;
    while (current) {
      const listItem = document.createElement("li");
      let text = "";
      if (current === this.head) {
        text += "Head. ";
      }
      text += `Value = ${current.data}, next = ${
        current.next ? current.next.data : null
      }`;
      listItem.innerHTML = `<div>${text}</div>`;
      listItem.classList.add("list__item");
      containerForItems.appendChild(listItem);
      current = current.next;
    }
    if (this.length === 0) {
      containerForItems.classList.add("list_empty");
    }
  }
}

let singleLinkedList = new LinkedList();

addBtn.addEventListener("click", () => {
  const text = inputAdd.value.trim();
  const textAfter = inputAfter.value.trim();
  if (text !== "") {
    if (textAfter !== "") {
      singleLinkedList.insertElementAfter(textAfter, text);
      singleLinkedList.renderItems();
    } else {
      singleLinkedList.appendElement(text);
      singleLinkedList.renderItems();
    }
    inputAdd.value = "";
    inputAfter.value = "";
  } else {
    alert("Please type something");
  }
});

removeBtn.addEventListener("click", () => {
  if (inputAdd.value !== "") {
    singleLinkedList.deleteElement(inputAdd.value);
    inputAdd.value = "";
    singleLinkedList.renderItems();
  } else {
    alert("Please type something");
  }
});

reverseBtn.addEventListener("click", () => {
  singleLinkedList.reverse();
  singleLinkedList.renderItems();
});
