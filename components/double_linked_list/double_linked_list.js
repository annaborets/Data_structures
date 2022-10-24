const inputAdd = document.querySelector(".input__item_add");
const inputAfter = document.querySelector(".input__item_after");
const list = document.querySelector(".list__container");
const addBtn = document.querySelector(".buttons__item_add");
const removeBtn = document.querySelector(".buttons__item_remove");
const reverseBtn = document.querySelector(".buttons__item_reverse");
const containerForItems = document.querySelector(".list");

class DoubleLinkedListNode {
  constructor(data, next = null, previous = null) {
    this.data = data;
    this.next = next;
    this.previous = previous;
  }
}

class DoubleLinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  getHead() {
    return this.head.data;
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

  appendElement(data) {
    if (this.getLength() >= 10) {
      alert("Too much items!");
      return;
    }
    const node = new DoubleLinkedListNode(data);
    node.next = null;
    let current = this.head;
    if (!current) {
      node.prev = null;
      this.head = node;
    } else {
      while (current.next) {
        current = current.next;
      }
      current.next = node;
      node.previous = current;
    }
    this.length++;
  }

  insertElementAfter(after, data) {
    const found = this.findElement(after);
    if (!found) {
      alert("Value not found");
      return;
    }
    const node = new DoubleLinkedListNode(data, found.next, found);
    found.next.previous = node;
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
    while (current) {
      if (current.data === data) {
        if (current === this.head && !this.head.next) {
          this.head = null;
        } else if (current === this.head) {
          this.head = this.head.next;
          this.head.previous = null;
        } else if (!current.next) {
          current.previous.next = null;
        } else {
          current.previous.next = current.next;
          current.next.previous = current.previous;
        }
        this.length--;
        return current.data;
      }
      current = current.next;
    }
  }

  reverse() {
    if (!this.head || !this.head.next) {
      return this.head;
    }
    let temp = null;
    let current = this.head;
    while (current !== null) {
      temp = current.previous;
      current.previous = current.next;
      current.next = temp;
      current = current.previous;
    }
    if (temp !== null) {
      this.head = temp.previous;
    }
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
      }, previous = ${current.previous ? current.previous.data : null}`;
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

let doubleLinkedList = new DoubleLinkedList();

addBtn.addEventListener("click", () => {
  const text = inputAdd.value.trim();
  const textAfter = inputAfter.value.trim();
  if (text !== "") {
    if (textAfter !== "") {
      doubleLinkedList.insertElementAfter(textAfter, text);
      doubleLinkedList.renderItems();
    } else {
      doubleLinkedList.appendElement(text);
      doubleLinkedList.renderItems();
    }
    inputAdd.value = "";
    inputAfter.value = "";
  } else {
    alert("Please type something");
  }
});

removeBtn.addEventListener("click", () => {
  if (inputAdd.value !== "") {
    doubleLinkedList.deleteElement(inputAdd.value);
    inputAdd.value = "";
    doubleLinkedList.renderItems();
  } else {
    alert("Please type something");
  }
});

reverseBtn.addEventListener("click", () => {
  doubleLinkedList.reverse();
  doubleLinkedList.renderItems();
});
