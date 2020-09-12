import toMdast from 'hast-util-to-mdast';
import toMarkdown from 'mdast-util-to-markdown';
import toHastTable from 'tdast-util-to-hast-table';

export default function toMarkdownTable(tdast, options = {}) {
  return toMarkdown(toMdast(toHastTable(tdast, options)));
}
