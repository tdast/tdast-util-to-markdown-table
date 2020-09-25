import toMdast from 'hast-util-to-mdast';
import table from 'mdast-util-gfm-table';
import toMarkdown from 'mdast-util-to-markdown';
import toHastTable from 'tdast-util-to-hast-table';

export default function toMarkdownTable(tdast, options = {}) {
  const hast = toHastTable(tdast, options);
  const mdast = toMdast(hast);
  return toMarkdown(mdast, { extensions: [table.toMarkdown()] });
}
