import { SunmaoLib } from '@sunmao-ui/runtime';
// components
import Font from './components/Font';
// traits
import animation from './traits/animation';
// util methods
import i18n from './methods/i18n';
import navigate from './methods/navigate';

const lib: SunmaoLib = {
  components: [Font],
  traits: [animation],
  utilMethods: [i18n, navigate],
};

export default lib;
