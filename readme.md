# tdast-util-to-markdown-table

[**tdast**][tdast] utility to serialize tdast to markdown table ([GFM][]).

---

> **Note**: This package is in active development and is currently unreleased.

## Install

```sh
npm install tdast-util-to-markdown-table
```


## Use

Use with a tdast table node,

```js
import toMarkdownTable from 'tdast-util-to-markdown-table';

const tdast = {
  type: 'table',
  children: [
    {
      type: 'row',
      index: 0,
      children: [
        {
          type: 'column',
          index: 0,
          value: 'col0',
        },
        {
          type: 'column',
          index: 1,
          value: 'col1',
        },
        {
          type: 'column',
          index: 2,
          value: 'col2',
        },
      ],
    },
    {
      type: 'row',
      index: 1,
      children: [
        {
          type: 'cell',
          columnIndex: 0,
          rowIndex: 1,
          value: 'row1col0',
        },
        {
          type: 'cell',
          columnIndex: 1,
          rowIndex: 1,
          value: 'row1col1',
        },
        {
          type: 'cell',
          columnIndex: 2,
          rowIndex: 1,
          value: 'row1col2',
        },
      ],
    },
    {
      type: 'row',
      index: 2,
      children: [
        {
          type: 'cell',
          columnIndex: 0,
          rowIndex: 2,
          value: 'row2col0',
        },
        {
          type: 'cell',
          columnIndex: 1,
          rowIndex: 2,
          value: 'row2col1',
        },
        {
          type: 'cell',
          columnIndex: 2,
          rowIndex: 2,
          value: 'row2col2',
        },
      ],
    },
  ],
};

console.log(toMarkdownTable(tdast));
```

yields a serialized markdown table.

```md
```

Easily use this markdown table with any markdown content!

## API

### `toMarkdownTable(tdast[, options])`

#### Interface
```ts
function toMarkdownTable(
  /** A valid tdast Table node */
  tdast: Table,
  /** Configurable options (compatible with tdast-util-to-hast-table's options) */
  options?: Options,
): string;
```

Serializes a tdast `Table` node into a markdown table.  Note that markdown tables are not [commonmark][]-compliant and are based on [GFM][].

Uses [`tdast-util-to-hast-table`][tdast-util-to-hast-table] under the hood to transform the tdast `Table` node into a [hast][] table node, then transforms to [mdast][] via [`hast-util-to-mdast`][hast-util-to-mdast], and finally applies [`mdast-util-to-markdown`][mdast-util-to-markdown] to serialize the mdast node into a markdown string.  For more details, please refer to [`tdast-util-to-hast-table`][tdast-util-to-hast-table] for behaviors of transformed nodes.


#### Related interfaces
```ts
interface Options {
  /** use the `label` property of a tdast `Column` node for the text value of a hast thead node. */
  useColumnLabel?: boolean;
}
```

<!-- Definitions -->
[commonmark]: https://commonmark.org/
[hast]: https://github.com/syntax-tree/hast
[hast-util-to-mdast]: https://github.com/syntax-tree/hast-util-to-mdast
[gfm]: https://github.github.com/gfm/
[hastscript]: https://github.com/syntax-tree/hastscript
[mdast]: https://github.com/syntax-tree/mdast
[mdast-util-to-markdown]: https://github.com/syntax-tree/mdast-util-to-markdown
[tdast]: https://github.com/tdast/tdast
[tdast-util-to-hast-table]: https://github.com/tdast/tdast-util-to-hast-table
[tdastscript]: https://github.com/tdast/tdastscript
