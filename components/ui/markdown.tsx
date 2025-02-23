import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/src/lib';

interface MarkdownProps {
  children: string;
  className?: string;
}

export function Markdown({ children, className }: MarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        div: ({ node, ...props }) => (
          <div className={cn('prose prose-sm dark:prose-invert max-w-none', className)} {...props} />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
} 