f# CS 260 Notes

[My startup - Simon](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

My IP address is: 44.215.99.218
route 53; hosted zones, and registered domains
EC2; elastic IP, public IP, instances

## Caddy

No problems worked just like it said in the [instruction](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md).

## HTML

Main, div, nav, ul, li, table, span are basically the most popular tags that I will use.
yes

## CSS

It was important to make it responsive and Bootstrap helped with that. It looks great on all kinds of screen sizes.

Bootstrap seems a bit like magic. It styles things nicely, but is very opinionated. You either do, or you do not. There doesn't seem to be much in between.

I did like the navbar it made it super easy to build a responsive header.

```html
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand">
            <img src="logo.svg" width="30" height="30" class="d-inline-block align-top" alt="" />
            Calmer
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" href="play.html">Play</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="about.html">About</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="index.html">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
```

I also used SVG to make the icon and logo for the app. This turned out to be a piece of cake.

```html
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" fill="#0066aa" rx="10" ry="10" />
  <text
    x="50%"
    y="50%"
    dominant-baseline="central"
    text-anchor="middle"
    font-size="72"
    font-family="Arial"
    fill="white"
  >
    C
  </text>
</svg>
```

## Java Script

Arrow functions are a compact function syntax. (a, b) => a + b means a function with parameters a and b that
returns a+b.
Examples:

```js
const add = (a, b) => a + b;
const greet = name => `Hi ${name}`;
const square = x => { return x * x; } // block form
Note: arrow functions do not bind their own 'this' and are not suitable as constructors.
```

map() transforms every element of an array and returns a new array without mutating the original.
Examples:

```js
const nums = [1, 2, 3];
const doubled = nums.map((n) => n * 2); // [2,4,6]
const names = ["Amy", "Bob"];
const greetings = names.map((n) => `Hi ${n}`); // ['Hi Amy','Hi Bob']
```

getElementByID and addEventListener

```js
const btn = document.getElementById("btn");
btn.addEventListener("click", () => console.log("Clicked!"));
```

## Difference Between `getElementById()` and `querySelector()`

| Feature              | `getElementById()`                  | `querySelector()`                                                       |
| -------------------- | ----------------------------------- | ----------------------------------------------------------------------- |
| **Selector type**    | Only works with **id** (no `#`)     | Works with **any CSS selector** (`#id`, `.class`, `tag`, etc.)          |
| **Syntax**           | `document.getElementById("btn")`    | `document.querySelector("#btn")`                                        |
| **Return value**     | The element, or `null` if not found | The **first** element that matches, or `null` if none                   |
| **Multiple matches** | Not possible (IDs are unique)       | Only returns the first match — use `querySelectorAll()` for all matches |
| **Speed**            | Slightly faster (older, simpler)    | Slightly slower (more flexible)                                         |

## React Part 1: Routing

Setting up Vite and React was pretty simple. I had a bit of trouble because of conflicting CSS. This isn't as straight forward as you would find with Svelte or Vue, but I made it work in the end. If there was a ton of CSS it would be a real problem. It sure was nice to have the code structured in a more usable way.

## React Part 2: Reactivity

- Arrow Functions
- Closure

```jsx
function makeClosure(init) {
  let closureValue = init;
  return () => {
    return `closure ${++closureValue}`;
  };
}
```

```jsx
const closure = makeClosure(0);

console.log(closure());
// OUTPUT: closure 1

console.log(closure());
// OUTPUT: closure 2
```

## Startup Service

Fetch

Express
