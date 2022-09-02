import { implementUtilMethod } from '@sunmao-ui/runtime';
import { Type } from '@sinclair/typebox';
import { history } from '../../components/Router';

export default function i18nUtilMethodFactory() {
  return implementUtilMethod({
    version: 'custom/v1',
    metadata: {
      name: 'navigate',
    },
    spec: {
      parameters: Type.Object({
        path: Type.String(),
      }),
    },
  })(({ path }) => {
    history.push(path);
  });
}
