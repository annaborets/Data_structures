const inputAdd = document.querySelector(".input__item_add");
const inputAfter = document.querySelector(".input__item_after");
const list = document.querySelector(".list__container");
const addBtn = document.querySelector(".buttons__item_add");
const removeBtn = document.querySelector(".buttons__item_remove");
const containerForItems = document.querySelector(".list");

class CircularLinkedListNode {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class CircularLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  getHead() {
    return this.head.data;
  }

  appendElement(data) {
    if (this.getLength() >= 10) {
      alert("Too much items!");
    }
    const node = new CircularLinkedListNode(data);
    if (this.tail) {
      this.tail.next = node;
    }
    if (!this.head) {
      this.head = node;
    }
    this.tail = node;
    node.next = this.head;
    this.length++;
  }

  prependElement(data) {
    const node = new CircularLinkedListNode(data, this.head);
    this.head = node;
    if (!this.tail) {
      this.tail = node;
    }
    this.tail.next = this.head;
    this.length++;
  }

  findElement(data) {
    if (!this.head) {
      return;
    }
    let counter = 0;
    let current = this.head;
    while (counter < this.length) {
      if (current.data === data) {
        return current;
      }
      current = current.next;
      counter++;
    }
  }

  insertElementAfter(after, data) {
    const found = this.findElement(after);
    if (!found) {
      alert("Value not found");
    } else {
      const node = new CircularLinkedListNode(data, found.next);
      found.next = node;
      this.length++;
    }
  }

  deleteElement(data) {
    if (!this.head) {
      return;
    }
    if (this.head && this.head.data === data) {
      this.head = this.head.next;
      this.tail.next = this.head;
    }
    let current = this.head;
    let counter = 0;
    while (current.next && counter < this.length) {
      if (current.next.data === data) {
        current.next = current.next.next;
      } else {
        current = current.next;
      }
      counter++;
    }
    if (this.tail.data === data) {
      this.tail = current;
    }
    this.length--;
  }

  getLength() {
    return this.length;
  }

  printData() {
    let current = this.head;
    let counter = 0;
    while (counter < this.length) {
      console.log(current.data);
      current = current.next;
      counter++;
    }
  }

  renderItems() {
    containerForItems.classList.remove("none");
    containerForItems.innerHTML = "";
    let current = this.head;
    let counter = 0;
    while (counter < this.length) {
      const listItem = document.createElement("li");
      let text = "";
      if (current === this.head) {
        text += "Head. ";
      }
      if (current === this.tail) {
        text += "Tail. ";
      }
      text += `Value = ${current.data}, next = ${current.next.data}`;
      listItem.innerHTML = `<div>${text}</div>`;
      listItem.classList.add("list__item");
      containerForItems.appendChild(listItem);
      current = current.next;
      counter++;
    }
  }
}

let clist = new CircularLinkedList();

addBtn.addEventListener("click", () => {
  const text = inputAdd.value.trim();
  const textAfter = inputAfter.value.trim();
  if (text !== "") {
    if (textAfter !== "") {
      clist.insertElementAfter(textAfter, text);
      clist.renderItems();
    } else {
      clist.appendElement(text);
      clist.renderItems();
    }
  } else {
    alert("Please type something");
  }
  inputAdd.value = "";
  inputAfter.value = "";
});

removeBtn.addEventListener("click", () => {
  clist.deleteElement(inputAdd.value);
  inputAdd.value = "";
  clist.renderItems();
});
