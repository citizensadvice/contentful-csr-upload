import { marked } from "marked";
import { htmlStringToDocument } from "contentful-rich-text-html-parser";

const markdownToJson = (markdown, options) => {
  if (markdown === undefined) {
    return;
  }

  try {
    const { stripWhitespace } = options || {};

    let html = marked.parse(markdown);

    if (stripWhitespace) {
      // remove whitespace between HTML elements (eg between `<li>` elements
      html = html.replace(/>[\s]+</g, "><");
    }

    // format `li`s for Contentful - it requires text content in an `li` to be wrapped in `p`
    html = html.replace(/<li>/g, "<li><p>").replace(/<\/li>/g, "</p></li>");

    const json = htmlStringToDocument(html);

    json.content = json.content.filter(noEmptyTextTypeNodes);
    return json;
  } catch (error) {
    console.error(
      "Error converting markdown to JSON in `markdownToJson.js`",
      error,
    );
    throw error;
  }
};

const noEmptyTextTypeNodes = (node) => {
  return node.nodeType !== "text" && node.value !== "\n";
};

export default markdownToJson;
