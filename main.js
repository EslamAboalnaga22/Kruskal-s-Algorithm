/////////////////////////////////////////////////////// create data structure (Priority Queue)
// to store element and its priority
class QElement {
  constructor(element, priority) {
    this.element = element;
    this.priority = priority;
  }
}
// PriorityQueue class
class PriorityQueue {
  // An array is used to implement priority
  constructor() {
    this.items = [];
  }

  // enqueue function to add element
  enqueue(element, priority) {
    // creating object from queue element
    var qElement = new QElement(element, priority);
    var contain = false;

    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].priority > qElement.priority) {
        // Once the correct location is found it is
        // enqueued
        this.items.splice(i, 0, qElement);
        contain = true;
        break;
      }
    }
    if (!contain) {
      this.items.push(qElement);
    }
  }

  // isEmpty function
  isEmpty() {
    return this.items.length == 0;
  }

  // dequeue method to remove
  dequeue() {
    if (this.isEmpty()) return "Underflow";
    return this.items.shift();
  }
}

/////////////////////////////////////////////////////// create  class union 

class UnionFind {
  constructor(elements) {
    // Number of disconnected components
    this.count = elements.length;

    // Keep Track of connected components
    this.parent = {};

    // Initialize the data structure such that all
    // elements have themselves as parents
    elements.forEach((e) => (this.parent[e] = e));
  }

  union(a, b) {
    let rootA = this.find(a);
    let rootB = this.find(b);

    // Roots are same so these are already connected.
    if (rootA === rootB) return;

    // Always make the element with smaller root the parent.
    if (rootA < rootB) {
      if (this.parent[b] != b) this.union(this.parent[b], a);
      this.parent[b] = this.parent[a];
    } else {
      if (this.parent[a] != a) this.union(this.parent[a], b);
      this.parent[a] = this.parent[b];
    }
  }

  // Returns final parent of a node
  find(a) {
    while (this.parent[a] !== a) {
      a = this.parent[a];
    }
    return a;
  }

  // Checks connectivity of the 2 nodes
  connected(a, b) {
    return this.find(a) === this.find(b);
  }
}
/////////////////////////////////////////////////////// create class graph

class Graph {
  constructor() {
    this.edges = {};
    this.nodes = [];
  }

  addNode(node) {
    this.nodes.push(node);
    this.edges[node] = [];
  }
  addEdge(node1, node2, weight = 1) {
    this.edges[node1].push({ node: node2, weight: weight });
    this.edges[node2].push({ node: node1, weight: weight });
  }

  addDirectedEdge(node1, node2, weight = 1) {
    this.edges[node1].push({ node: node2, weight: weight });
  }

  display() {
    let graph = "";
    this.nodes.forEach((node) => {
      graph +=
        "( " +node + "-->" + this.edges[node].map((n) => n.node).join(" , ") + " ) ";
    });
    // console.log(graph);

    // to show the result in page 
    let theResult = document.querySelector(".assign .classes-list .the-result");
    let final = document.createElement("div"); // add the steps to show in page
    final.prepend(graph);
    theResult.appendChild(final);
  }

  // function of kruskal's algorithm 
  kruskalsMST() {
    // Initialize graph that'll contain the MST
    const MST = new Graph();
    this.nodes.forEach((node) => MST.addNode(node));
    if (this.nodes.length === 0) {
      return MST;
    }

    // Create a Priority Queue
    let edgeQueue = new PriorityQueue(this.nodes.length * this.nodes.length);

    // Add all edges to the Queue:
    for (let node in this.edges) {
      this.edges[node].forEach((edge) => {
        edgeQueue.enqueue([node, edge.node], edge.weight);
      });
    }

    let uf = new UnionFind(this.nodes);

    // Loop until either we explore all nodes or queue is empty
    while (!edgeQueue.isEmpty()) {
      // Get the edge data using destructuring
      let nextEdge = edgeQueue.dequeue();
      let nodes = nextEdge.element;
      let weight = nextEdge.priority;

      if (!uf.connected(this.nodes[0], nodes[1])) {
        MST.addEdge(nodes[0], nodes[1], weight);
        uf.union(nodes[0], nodes[1]);
      }
    }
    return MST;
  }
}

///////////////////////////////////////////////////////  the steps to show in page
let parent = document.querySelector(".assign");

let addNode = document.querySelector(".classes-node");

let u = document.querySelector(".classes-u");
let v = document.querySelector(".classes-v");
let weight = document.querySelector(".classes-weight");

let div = document.querySelector(".assign .classes-list div");
let divv = document.querySelector(".classes-list-t div");

let button = document.querySelector(".sort");

let classList = div.children; // new spans added

let nodeBtn = document.querySelector(".add-node")
let edgeBtn = document.querySelector(".add-edge")



function add() {
  // to add nodes
  let a = addNode.value; // value of node
  for (let i = 0; i < 1; i++) {
    if (a === "") {
      // if no number , continue
      continue;
    } else {
      let span = document.createElement("span");
      span.className = span.innerText; // creat new span
      span.prepend(a); // add the first value the second and so on..
      div.appendChild(span); // add span in div(parent)
    }
  }
  addNode.value = ""; // clear the value after added
}
addNode.addEventListener("keypress", function () { // add node with enter
  // add number with enter
  if (event.key === "Enter") {
    add();
  }
});
nodeBtn.addEventListener("click", add); // add node with button




function add2() {
  // to add edge
  let b = u.value; // make array and sort values to add one value only to class list
  let c = v.value; // make array and sort values to add one value only to class list
  let d = weight.value; // make array and sort values to add one value only to class list
  for (let i = 0; i < 1; i++) {
    if (b === "" || c === "" || d === "") {
      // if no number , continue
      continue;
    } else {
      let spann = document.createElement("span");
      spann.className = spann.innerText; // creat new span
      spann.prepend(`${b}${c}  ${d}`); // add the first value the second and so on..
      divv.appendChild(spann); // add span in div(parent)
    }
  }
  u.value = ""; // clear the value after added
  v.value = ""; // clear the value after added
  weight.value = ""; // clear the value after added
}
u.addEventListener("keypress", function () {
  // add edge with enter
  if (event.key === "Enter") {
    add2();
  }
});
v.addEventListener("keypress", function () {
  // add edge with enter
  if (event.key === "Enter") {
    add2();
  }
});
weight.addEventListener("keypress", function () {
  // add edge with enter
  if (event.key === "Enter") {
    add2();
  }
});
edgeBtn.addEventListener("click", add2); // add edge with button





button.addEventListener("click", function () {  // button to start kruskal algorithm
  let g = new Graph(); // call the class graph
  let array = [];
  for (let e = 0; e < div.children.length; e++) { 
    array.push(div.children[e].innerText);          //add numbers into array
    g.addNode(array[e]);                            //call add node and add parameters value
  }

  for (let eee = 0; eee < divv.children.length; eee++) {
    g.addEdge(                                              //call add node and add parameters value
      divv.children[eee].innerText[0],
      divv.children[eee].innerText[1],
      divv.children[eee].innerText[3]
    );
  }

  g.kruskalsMST().display(); // call kruskal algorithm
});
