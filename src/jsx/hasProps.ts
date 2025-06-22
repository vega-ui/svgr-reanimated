import { JSXOpeningElement } from "@babel/types";
import { isJSXSpreadAttribute, isIdentifier } from '@babel/types'

export const hasProps = (name: string, elem: JSXOpeningElement) => {
  return elem.attributes.some(
    (attr) =>
      isJSXSpreadAttribute(attr) &&
      isIdentifier(attr.argument) &&
      attr.argument.name === name,
  );
}