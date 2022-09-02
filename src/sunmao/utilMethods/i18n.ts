import { implementUtilMethod, StringUnion } from '@sunmao-ui/runtime';
import { Type } from '@sinclair/typebox';
import i18n from '../../locales';

export default function i18nUtilMethodFactory() {
  return implementUtilMethod({
    version: 'custom/v1',
    metadata: {
      name: 'i18n',
    },
    spec: {
      parameters: Type.Object({
        lang: StringUnion(['en-US', 'zh-CN']),
      }),
    },
  })(({ lang }) => {
    i18n.changeLanguage(lang);
  });
}
