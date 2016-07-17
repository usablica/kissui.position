# kissui.position
Track element(s) on the page like a boss.

This library is a part of Kissui project.

# Getting Started

Using this libarary is as easy as adding `data-kui-position` attribute to your elements:

```
<p data-kui-position="in"></p>
```

and then bind an event listener:

```js
kissuiPosition.on ('in', function (element) {
  console.log('yay!', element);
});
```

That's it. 

# Author
Afshin Mehrabani

# License
MIT
