import {JSXOpeningElement} from "@babel/types";
import * as t from "@babel/types";

export const addProp = (name: string, value: any, elem: JSXOpeningElement) => {
  elem.attributes.push(
    t.jsxAttribute(
      t.jsxIdentifier(name),
      t.jsxExpressionContainer(t.identifier(value)),
    ),
  );
}