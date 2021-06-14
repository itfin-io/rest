# ITFin REST

> ITFin REST API client for Browser and Node.js

## Usage

<table>
<tbody valign=top align=left>
<tr><th>
Node
</th><td>

Install with `npm install @itfin/rest --save`

```js
const { Application } = require("@itfin/rest");
// or: import { Application } from '@itfin/rest';
```

</td></tr>
</tbody>
</table>

### Examples

More examples of usage you can find in `examples` folder.

#### Client Options

You can set the APIs' `baseUrl` and modify some behaviors (e.g. request timeout etc.) by passing a clientOptions object to the `Application` constructor.

```js
// secret key & token you can get on page Settings > API Keys
const secretKey = '...';
const secretToken = '...';
const clientOptions = {
  baseUrl: 'https://app.itfin.io',
  requestTimeout: 15000,
  requestsPerSecond: 2,
  debug: false
}

const app = new Application(secretKey, secretToken, clientOptions)
```

## LICENSE

[MIT](LICENSE)
