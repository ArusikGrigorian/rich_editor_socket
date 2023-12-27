import { faBold, faItalic, faStrikethrough, faUnderline } from "@fortawesome/free-solid-svg-icons";
import { ReactNode, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { Editor, Range } from "slate";
import { useFocused, useSlate } from "slate-react";
import { FormatButton } from "./FormatButton";

import * as styles from "./styles";

type PortalProps = { children?: ReactNode };

const Portal = ({ children }: PortalProps) => {
  return typeof document === "object" ? ReactDOM.createPortal(children, document.body) : null;
};

export const FormatToolbar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const editor = useSlate();
  const focused = useFocused();

  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;

    if (!el) {
      return;
    }

    if (
      !selection ||
      !focused ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ""
    ) {
      el.removeAttribute("style");
      return;
    }

    const domSelection = window.getSelection();
    if (!domSelection?.rangeCount) {
      return;
    }

    const domRange = domSelection.getRangeAt(0);

    const rect = domRange.getBoundingClientRect();
    el.style.opacity = "1";
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight - 6}px`;
    el.style.left = `${rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2}px`;
  });

  return (
    <Portal>
      <div ref={ref} className={styles.styleSpace} onMouseDown={(e) => e.preventDefault()}>
        <FormatButton format="bold" icon={faBold} />
        <FormatButton format="italic" icon={faItalic} />
        <FormatButton format="strikethrough" icon={faStrikethrough} />
        <FormatButton format="underline" icon={faUnderline} />
      </div>
    </Portal>
  );
};
