import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkRemoveComments from 'remark-remove-comments';
import rehypeRaw from 'rehype-raw';

interface MarkdownProps {
  children: string;
}

const plugins = [remarkGfm, remarkRemoveComments];

const Markdown = (props: MarkdownProps) => {
  return (
    <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={plugins} skipHtml={true} className="markdown-body">
      {props.children}
    </ReactMarkdown>
  );
};

export default Markdown;
