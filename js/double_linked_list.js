const inputAdd = document.querySelector(".input__item_add");
const inputAfter = document.querySelector(".input__item_after");
const list = document.querySelector(".list__container");
const addBtn = document.querySelector(".buttons__item_add");
const removeBtn = document.querySelector(".buttons__item_remove");
const reverseBtn = document.querySelector(".buttons__item_reverse");

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
    const node = new DoubleLinkedListNode(data);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.previous = this.tail;
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
  }

  insertElementAfter(after, data) {
    let current = this.head;
    while (current) {
      if (current.data === after) {
        let node = new DoubleLinkedListNode(data);
        if (current === this.tail) {
          this.add(data);
        } else {
          current.next.previous = node;
          node.previous = current;
          node.next = current.next;
          current.next = node;
          this.length++;
        }
      }
      current = current.next;
    }
  }

  deleteElement(data) {
    let current = this.head;
    while (current) {
      if (current.data === data) {
        if (current === this.head && current === this.tail) {
          this.head = null;
          this.tail = null;
        } else if (current === this.head) {
          this.head = this.head.next;
          this.head.previous = null;
        } else if (current === this.tail) {
          this.tail = this.tail.previous;
          this.tail.next = null;
        } else {
          current.previous.next = current.next;
          current.next.previous = current.previous;
        }
        this.numberOfValues--;
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
    list.innerHTML = "";
    const containerForItems = document.createElement("ol");

    containerForItems.classList.add("list");
    let current = this.head;

    while (current) {
      const listItem = document.createElement("li");

      let text = "";

      if (current === this.head) {
        text += "Head. ";
      }

      if (current === this.tail) {
        text += "Tail. ";
      }

      text += `Value = ${current.data}, next = ${
        current.next ? current.next.data : null
      }, previous = ${current.previous ? current.previous.data : null}`;

      listItem.innerHTML = `<div>${text}</div>`;

      listItem.classList.add("list__item");

      containerForItems.appendChild(listItem);

      current = current.next;
    }

    list.appendChild(containerForItems);
  }
}

let dlist = new DoubleLinkedList();

addBtn.addEventListener("click", () => {
  const text = inputAdd.value.trim();
  const textAfter = inputAfter.value.trim();
  if (text !== "") {
    if (textAfter !== "") {
      dlist.insertElementAfter(textAfter, text);
      dlist.renderItems();
    } else {
      dlist.appendElement(text);
      dlist.renderItems();
    }
    inputAdd.value = "";
    inputAfter.value = "";
  } else {
    alert("Please type something");
  }
});

removeBtn.addEventListener("click", () => {
  if (inputAdd.value !== "") {
    dlist.deleteElement(inputAdd.value);
    inputAdd.value = "";
    dlist.renderItems();
  } else {
    alert("Please type something");
  }
});

reverseBtn.addEventListener("click", () => {
  dlist.reverse();
  dlist.renderItems();
});
