import h from 'hastscript';
import toMdast from 'hast-util-to-mdast';
import toMarkdown from 'mdast-util-to-markdown';
import td from 'tdastscript';

import toMarkdownTable from '../lib/to-markdown-table';

function serializeHast(hast) {
  return toMarkdown(toMdast(hast));
}

describe(toMarkdownTable, () => {
  it('should return empty table for empty table or invalid nodes', () => {
    expect(toMarkdownTable(td('table'))).toEqual(serializeHast(h('table')));
    expect(toMarkdownTable(h('invalid node'))).toEqual(
      serializeHast(h('table')),
    );
  });

  it('should return table with rows of cells', () => {
    const tdast = td('table', [
      td('row', ['row0col0', 'row0col1', 'row0col2']),
      td('row', ['row1col0', 'row1col1', 'row1col2']),
      td('row', ['row2col0', 'row2col1', 'row2col2']),
    ]);
    expect(toMarkdownTable(tdast)).toEqual(
      serializeHast(
        h('table', [
          h('tbody', [
            h('tr', [
              h('td', 'row0col0'),
              h('td', 'row0col1'),
              h('td', 'row0col2'),
            ]),
            h('tr', [
              h('td', 'row1col0'),
              h('td', 'row1col1'),
              h('td', 'row1col2'),
            ]),
            h('tr', [
              h('td', 'row2col0'),
              h('td', 'row2col1'),
              h('td', 'row2col2'),
            ]),
          ]),
        ]),
      ),
    );
  });

  it('should return table with thead and tbody with rows table cells', () => {
    const tdast = td('table', [
      td('row', [
        td('column', 'col0'),
        td('column', 'col1'),
        td('column', 'col2'),
      ]),
      td('row', ['row1col0', 'row1col1', 'row1col2']),
      td('row', ['row2col0', 'row2col1', 'row2col2']),
    ]);
    expect(toMarkdownTable(tdast)).toEqual(
      serializeHast(
        h('table', [
          h('thead', [
            h('tr', [h('th', 'col0'), h('th', 'col1'), h('th', 'col2')]),
          ]),
          h('tbody', [
            h('tr', [
              h('td', 'row1col0'),
              h('td', 'row1col1'),
              h('td', 'row1col2'),
            ]),
            h('tr', [
              h('td', 'row2col0'),
              h('td', 'row2col1'),
              h('td', 'row2col2'),
            ]),
          ]),
        ]),
      ),
    );
  });

  it('should apply options.useColumnLabel to use column.label as table column values if possible', () => {
    const tdast = td('table', [
      td('row', [
        td('column', { label: 'Column 0 Label', value: 'col0' }),
        td('column', { label: 'Column 1 Label', value: 'col1' }),
        td('column', 'col2'),
      ]),
    ]);
    expect(toMarkdownTable(tdast)).toEqual(
      serializeHast(
        h('table', [
          h('thead', [
            h('tr', [h('th', 'col0'), h('th', 'col1'), h('th', 'col2')]),
          ]),
          h('tbody'),
        ]),
      ),
    );
    expect(toMarkdownTable(tdast, { useColumnLabel: true })).toEqual(
      serializeHast(
        h('table', [
          h('thead', [
            h('tr', [
              h('th', 'Column 0 Label'),
              h('th', 'Column 1 Label'),
              h('th', 'col2'),
            ]),
          ]),
          h('tbody'),
        ]),
      ),
    );
  });
});
