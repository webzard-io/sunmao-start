import { implementRuntimeTrait } from '@sunmao-ui/runtime';
import { Type } from '@sinclair/typebox';

export default implementRuntimeTrait({
  version: 'custom/v1',
  metadata: {
    name: 'traitName',
  },
  spec: {
    properties: Type.Object({}),
    methods: [],
    state: Type.Object({}),
  },
})(() => {
  // implement your trait here
  return () => {
    return {
      props: {},
    };
  };
});
