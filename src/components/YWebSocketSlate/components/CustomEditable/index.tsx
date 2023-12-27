import { ComponentProps } from "react";
import { Editable } from "slate-react";
import { Element } from "../Element";
import { Leaf } from "../Leaf";

type CustomEditableProps = Omit<ComponentProps<typeof Editable>, "renderElement" | "renderLeaf"> &
  Partial<Pick<ComponentProps<typeof Editable>, "renderElement" | "renderLeaf">>;

export const CustomEditable = ({
  renderElement = Element,
  renderLeaf = Leaf,
  ...props
}: CustomEditableProps) => {
  return (
    <Editable
      placeholder="Type here..."
      renderElement={renderElement}
      renderLeaf={renderLeaf}
      {...props}
    />
  );
};
