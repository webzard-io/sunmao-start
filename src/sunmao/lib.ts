import Font from './components/Font';
import animation from './traits/animation';
import i18n from './utilMethods/i18n';
import navigate from './utilMethods/navigate';
import { type SunmaoLib } from '@sunmao-ui/runtime';

const lib: SunmaoLib = {
  components: [Font],
  traits: [animation],
  utilMethods: [i18n, navigate],
};

export default lib;
