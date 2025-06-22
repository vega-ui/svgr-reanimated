import { jsxSpreadAttribute, identifier } from '@babel/types'
import { JSXOpeningElement } from "@babel/types";

export const addSpreadAttribute = (name: string, elem: JSXOpeningElement) => {
  elem.attributes.push(
    jsxSpreadAttribute(identifier(name)),
  );
}