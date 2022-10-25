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
    let counter = 0;
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
    while (current && counter < this.length) {
      if (current.data === data) {
        if (current === this.head && current === this.tail) {
          this.head = null;
          this.tail = null;
        } else if (current === this.head) {
          this.head = this.head.next;
          this.tail.next = this.head;
        } else if (prev === null) {
          this.head = current.next;
        } else if (current === this.tail) {
          this.tail = prev;
          this.tail.next = this.head;
        } else {
          prev.next = current.next;
        }
        this.length--;
        counter++;
        return current.data;
      }
      prev = current;
      current = current.next;
    }
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
    if (this.lenght === 0) {
      containerForItems.classList.add("list_empty");
    } else {
      containerForItems.classList.remove("list_empty");
    }
  }
}

let circularLinkedList = new CircularLinkedList();

addBtn.addEventListener("click", () => {
  const text = inputAdd.value.trim();
  const textAfter = inputAfter.value.trim();
  if (text !== "") {
    if (textAfter !== "") {
      circularLinkedList.insertElementAfter(textAfter, text);
      circularLinkedList.renderItems();
    } else {
      circularLinkedList.appendElement(text);
      circularLinkedList.renderItems();
    }
  } else {
    alert("Please type something");
  }
  inputAdd.value = "";
  inputAfter.value = "";
});

removeBtn.addEventListener("click", () => {
  if (!inputAdd.value) {
    alert("Please type something");
    return;
  }
  circularLinkedList.deleteElement(inputAdd.value);
  inputAdd.value = "";
  circularLinkedList.renderItems();
});
