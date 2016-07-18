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

and to init the library, call this before `</body>`:

```js
kissuiPosition.init();
```

That's it. 

# Events

Here is a list of available events.

## ID-based event

You can get the events of an element using its ID. Let's say you have:

```html
<p id="paragraph" data-kui-position="in right">This element is tracking by Kissui.Position</p>
```

then you can get events using:

```js
kissuiPosition.on('paragraph', function (element) {
  console.log('with id', element);
});
```

## * event

If you want to get all events, simply bind a callback function to `*` event:

```js
kissuiPosition.on('*', function (element, event) {
  console.log('*', element, event);
});
```

## position event

Also, you can get all events using its unique `data-kui-position` attribute value. So, imagine you have:

```html
<p id="paragraph" data-kui-position="in right">this element is tracking by kissui.position</p>
```

then you can listen to events from `in right` (with the same order):

```js
kissuiPosition.on('in right', function (element) {
  console.log('single', element);
});
```

# Author
Afshin Mehrabani

# License
MIT
