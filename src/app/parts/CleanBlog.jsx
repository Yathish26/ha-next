import DOMPurify from 'dompurify';

export default function CleanBlog({ content }) {
  const sanitizedContent = DOMPurify.sanitize(content);

  const processedContent = sanitizedContent.replace(
    /<img(.*?)\/?>/g,
    `<div style="display: flex; justify-content: center; align-items: center; width: 100%; height: fit-content;">
       <img $1 style="max-width: 100%; border-radius: 10px; height: auto;" draggable="false" />
     </div>`
  )
  .replace(
    /<pre><code(.*?)>(.*?)<\/code><\/pre>/gs,
    `<div style="overflow-x: auto; background-color: #1e1e1e; padding: 16px; border-radius: 8px; color: #ffffff; font-family: 'Courier New', monospace;">
       <code$1>$2</code>
     </div>`
  )
  .replace(
    /<ul>/g,
    `<ul style="list-style-type: disc; margin-left: 20px; padding-left: 20px;">`
  )
  .replace(
    /<ol>/g,
    `<ol style="list-style-type: decimal; margin-left: 20px; padding-left: 20px;">`
  )
  .replace(
    /<li>/g,
    `<li style="margin-bottom: 8px;">`
  )
  .replace(
    /<h2>/g,
    `<h2 style="font-size: 1.8em; font-weight: bold; margin-top: 20px; margin-bottom: 10px; color: #333;">`
  )
  .replace(
    /<h3>/g,
    `<h3 style="font-size: 1.5em; font-weight: bold; margin-top: 20px; margin-bottom: 10px; color: #333;">`
  )
  .replace(
    /<h4>/g,
    `<h4 style="font-size: 1.2em; font-weight: bold; margin-top: 15px; margin-bottom: 8px; color: #555;">`
  );

  return (
    <div className="blog-content">
      <div dangerouslySetInnerHTML={{ __html: processedContent }} />
    </div>
  );
}
