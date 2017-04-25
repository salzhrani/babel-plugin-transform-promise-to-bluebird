# babel-plugin-transform-promise-to-rsvp

This plugin transforms `Promise` to `rvsp`.

## Example
```javascript
export default function main() {
	const taskA = getResultAsync(1337);
	const taskB = new Promise((resolve, reject) =>
		nodeCallbackFunc(42, (err, res) => err ? reject(err) : resolve(res))
	);
	return Promise.all([taskA, taskB]).then(([resA, resB]) => resA + resB);
}
```
Gets converted to:
```javascript
import {all, default as Promise} from 'rsvp';

export default function main() {
	const taskA = getResultAsync(1337);
	const taskB = new Promise((resolve, reject) =>
		nodeCallbackFunc(42, (err, res) => err ? reject(err) : resolve(res))
	);
	return all([taskA, taskB]).then(([resA, resB]) => resA + resB);
}
```

## Usage

1. Install *rsvp*: `npm install --save rsvp`
2. Install the *promise-to-rsvp* plugin: `npm install --save-dev babel-plugin-transform-promise-to-rsvp`
3. Add *transform-promise-to-rsvp* to your *.babelrc* file:
```json
{
	"plugins": ["transform-promise-to-rsvp"]
}
```
If you'r using the *transform-runtime* plugin add *transform-promise-to-rsvp* before
*transform-runtime*:
```json
{
	"plugins": [
		"transform-promise-to-rsvp",
		"transform-runtime"
	]
}
```
