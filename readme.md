<!-- 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll? -->
Ans: 

getElementById is used when  need one specific element by its unique ID.
exp: document.getElementById("title");

getElementsByClassName returns multiple elements that share the same class, so  usually loop through them.
exp: document.querySelector(".card");

querySelector finds and returns only the first element that matches a CSS selector, while querySelectorAll returns all matching elements and is the most flexible because it supports any CSS selector (class, id, etc.).
exp: document.querySelector(".card");
     document.querySelectorAll(".card");

<!-- 2. How do you create and insert a new element into the DOM? -->
Ans: 

We usually do it in 3 simple steps:
1. Create the element
2. Add content or attributes
3. Insert it into the DOM
exp: const div = document.createElement("div");
div.textContent = "Programming Hero";
document.body.appendChild(div);

<!-- 3. What is Event Bubbling? How does it work? -->
Ans: 

Event Bubbling is when an event starts on an element and then propagates upward through its parent elements.
How it works: 
1.Event occurs on the target element.
2.Target element’s event handler runs.
3.Event moves upward to the parent.
4.Parent’s handler runs if it exists.
5.Event continues bubbling up through all ancestors.
6.Optionally, stopPropagation() can stop it at any step.

<!-- 4. What is Event Delegation? Why is it useful? -->
Ans: 

Event Delegation is when you add one event listener to a parent instead of many children and use bubbling to handle child events.
Why it’s useful:
1.Better performance
2.Less memory usage
3.Works even for dynamically added elements

<!-- 5.Difference between preventDefault() and stopPropagation() -->
Ans: 

preventDefault() → stops the browser’s default action, like preventing a form from submitting or a link from opening.
exp: event.preventDefault();

stopPropagation() → stops the event from bubbling to parent elements.
exp: event.stopPropagation();