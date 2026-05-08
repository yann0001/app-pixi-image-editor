import type { ReactElement } from "react";
import { DocumentationDecorator, DocumentationLayout } from "@package/storybook";

export default {
  title: "Design System/Typography",
  tags: ["no-tests"],
  decorators: [DocumentationDecorator],
  parameters: {
    a11y: {
      test: "off",
    },
    layout: "fullscreen",
  },
};

const codeExample = `function greet(name: string): string {
  return \`Hello, \${name}!\`;
}`;

export function Typography(): ReactElement {
  return (
    <DocumentationLayout label="Typography">
      <div className="prose dark:prose-invert mt-8 max-w-none">
        <h2>Headings</h2>
        <h1>h1. The quick brown fox jumps over the lazy dog</h1>
        <h2>h2. The quick brown fox jumps over the lazy dog</h2>
        <h3>h3. The quick brown fox jumps over the lazy dog</h3>
        <h4>h4. The quick brown fox jumps over the lazy dog</h4>
        <h5>h5. The quick brown fox jumps over the lazy dog</h5>
        <h6>h6. The quick brown fox jumps over the lazy dog</h6>

        <h2>Body text</h2>
        <p>
          Regular paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
        </p>
        <p>
          <strong>Bold text.</strong> Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
          turpis egestas.
        </p>
        <p>
          <em>Italic text.</em> Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.
        </p>
        <p>
          Inline <code>code snippet</code> and an <a href="#">anchor link</a> inside a paragraph.
        </p>

        <h2>Font weights</h2>
        <p className="not-prose font-thin">Thin — font-thin</p>
        <p className="not-prose font-extralight">Extra Light — font-extralight</p>
        <p className="not-prose font-light">Light — font-light</p>
        <p className="not-prose font-normal">Normal — font-normal</p>
        <p className="not-prose font-medium">Medium — font-medium</p>
        <p className="not-prose font-semibold">Semibold — font-semibold</p>
        <p className="not-prose font-bold">Bold — font-bold</p>
        <p className="not-prose font-extrabold">Extra Bold — font-extrabold</p>
        <p className="not-prose font-black">Black — font-black</p>

        <h2>Lists</h2>
        <ul>
          <li>Unordered list item one</li>
          <li>Unordered list item two</li>
          <li>
            Nested list
            <ul>
              <li>Nested item one</li>
              <li>Nested item two</li>
            </ul>
          </li>
        </ul>
        <ol>
          <li>Ordered list item one</li>
          <li>Ordered list item two</li>
          <li>Ordered list item three</li>
        </ol>

        <h2>Blockquote</h2>
        <blockquote>
          "Design is not just what it looks like and feels like. Design is how it works." — Steve Jobs
        </blockquote>

        <h2>Code block</h2>
        <pre>
          <code>{codeExample}</code>
        </pre>

        <h2>Table</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Default</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>children</td>
              <td>ReactNode</td>
              <td>—</td>
            </tr>
            <tr>
              <td>className</td>
              <td>string</td>
              <td>undefined</td>
            </tr>
            <tr>
              <td>onClick</td>
              <td>() =&gt; void</td>
              <td>undefined</td>
            </tr>
          </tbody>
        </table>

        <hr />
      </div>
    </DocumentationLayout>
  );
}
