import t, {JSXElement} from "@babel/types";
import { default as traverse } from "@babel/traverse";
import { addProp, addSpreadAttribute, hasProps } from "./jsx";

export const transformToAnimated = (jsx: JSXElement): JSXElement => {
  const exprStmt = t.expressionStatement(jsx as any);
  const program = t.program([exprStmt]);
  const ast = t.file(program);
  
  traverse(ast, {
    JSXElement(path) {
      const opening = path.node.openingElement;
      
      if (t.isJSXIdentifier(opening.name) && opening.name.name === 'svg') {
        opening.name.name = 'AnimatedSvg';
        const closing = path.node.closingElement;
        
        if (closing && t.isJSXIdentifier(closing.name)) {
          closing.name.name = 'AnimatedSvg';
        }
        
        opening.attributes = opening.attributes.filter(attr => {
          if (t.isJSXAttribute(attr) && t.isJSXIdentifier(attr.name)) {
            const name = attr.name.name;
            return name !== 'stroke' && name !== 'width' && name !== 'height' && name !== 'strokeWidth';
          }
          return true;
        });
        
        const hasAnimatedProps = hasProps('animatedProps', opening);
        if (!hasAnimatedProps) addProp('animatedProps', 'animatedProps', opening);
        
        const hasRefProp = hasProps('ref', opening);
        if (!hasRefProp) addProp('ref', 'ref', opening)
        
        addProp('width', 'size', opening);
        addProp('height', 'size', opening);
        addProp('stroke', 'color', opening);
        addProp('strokeWidth', 'strokeWidth', opening);
        
        const hasAnimatedSvgProps = hasProps('svgProps', opening)
        if (!hasAnimatedSvgProps) addSpreadAttribute('props', opening)
      }
      
      if (t.isJSXIdentifier(opening.name) && opening.name.name === 'path') {
        opening.name.name = 'AnimatedPath';
        const closing = path.node.closingElement;
        
        if (closing && t.isJSXIdentifier(closing.name)) {
          closing.name.name = 'AnimatedPath';
        }
        
        const hasPathProps = hasProps('pathProps', opening);
        const hasAnimatedProps = hasProps('animatedProps', opening);
        
        if (!hasAnimatedProps) addProp('animatedProps', 'animatedProps', opening)
        if (!hasPathProps) addSpreadAttribute('pathProps', opening)
      }
    },
  });
  
  return (program.body[0] as t.ExpressionStatement).expression as JSXElement;
}