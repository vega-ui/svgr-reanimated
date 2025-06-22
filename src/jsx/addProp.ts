import { JSXOpeningElement } from "@babel/types";
import { jsxAttribute, jsxIdentifier, jsxExpressionContainer, identifier } from '@babel/types'

export const addProp = (name: string, value: any, elem: JSXOpeningElement) => {
  elem.attributes.push(
    jsxAttribute(
      jsxIdentifier(name),
      jsxExpressionContainer(identifier(value)),
    ),
  );
}