import { ClickOutside } from '@/directives/click-outside';
import Focus from './focus/focus';
import { Tooltip } from '@/directives/tooltip'
import Markdown from './markdown/markdown';

export function registerDirectives(app) {
  app.directive('click-outside', ClickOutside);
  app.directive('focus', Focus);
  app.directive('tooltip', Tooltip);
  app.directive('md', Markdown);
}
