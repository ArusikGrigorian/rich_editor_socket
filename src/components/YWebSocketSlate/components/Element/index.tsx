import { RenderElementProps } from "slate-react";
import { css } from "@emotion/css";

export const Element = ({ element, attributes, children }: RenderElementProps) => {
  switch (element.type) {
    case "heading-one":
      return (
        <h1 {...attributes} className={css``}>
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2 {...attributes} className={css``}>
          {children}
        </h2>
      );
    case "inline-code":
      return (
        <code {...attributes} className={css``}>
          {children}
        </code>
      );
    case "block-quote":
      return (
        <blockquote {...attributes} className={css``}>
          <p className="my-1">{children}</p>
        </blockquote>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};
