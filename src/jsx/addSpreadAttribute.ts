import * as t from "@babel/types";
import { JSXOpeningElement } from "@babel/types";

export const addSpreadAttribute = (name: string, elem: JSXOpeningElement) => {
  elem.attributes.push(
    t.jsxSpreadAttribute(t.identifier(name)),
  );
}