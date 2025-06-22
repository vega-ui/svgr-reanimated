import { JSXOpeningElement } from "@babel/types";
import * as t from "@babel/types";

export const hasProps = (name: string, elem: JSXOpeningElement) => {
  return elem.attributes.some(
    (attr) =>
      t.isJSXSpreadAttribute(attr) &&
      t.isIdentifier(attr.argument) &&
      attr.argument.name === name,
  );
}