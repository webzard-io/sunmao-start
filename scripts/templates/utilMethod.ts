import { implementUtilMethod } from '@sunmao-ui/runtime';
import { Type } from '@sinclair/typebox';

export default function i18nUtilMethodFactory() {
  return implementUtilMethod({
    version: 'custom/v1',
    metadata: {
      name: 'utilMethodName',
    },
    spec: {
      parameters: Type.Object({}),
    },
  })(() => {
    // implement your util method here
  });
}
