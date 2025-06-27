import type { Identifier, JSXElement, File } from '@babel/types';
import { transformToAnimated } from "./transformToAnimated";

export interface TemplateVariables {
  imports: string;
  interfaces: string;
  componentName: Identifier;
  props: Identifier;
  jsx: JSXElement;
  exports: string;
}

export interface TemplateOptions {
  tpl: (strings: TemplateStringsArray, ...exprs: any[]) => File;
  [key: string]: any;
}

export type TemplateFunction = (
  variables: TemplateVariables,
  options: TemplateOptions
) => File;


export const template: TemplateFunction = ({ imports, interfaces, jsx, props, exports, componentName }, { tpl }) => {
  const transformedJsx = transformToAnimated(jsx);
  
  return tpl`
${imports}
import { type SvgProps } from 'react-native-svg';
import { useAnimatedProps } from 'react-native-reanimated';
import { AnimatedSvg, AnimatedPath, AnimatedCircle } from '../animatedFactory'

${interfaces}

export interface AnimatedSvgProps extends SvgProps {
  size?: number | string;
  color?: string;
  strokeWidth?: number | string;
  pathProps?: Partial<React.ComponentProps<typeof AnimatedPath>>;
  animatedProps?: ReturnType<typeof useAnimatedProps>;
  ref?: React.Ref<React.Component<SvgProps>>
}

const ${componentName}: React.FC<AnimatedSvgProps> = ({
      size = 24,
      color = 'currentColor',
      strokeWidth = 2,
      pathProps,
      animatedProps,
      ref,
      ...props
    }) => ${transformedJsx};

${exports}
`;
};