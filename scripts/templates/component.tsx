import { implementRuntimeComponent } from '@sunmao-ui/runtime';
import { Type } from '@sinclair/typebox';
import { PRESET_PROPERTY_CATEGORY } from '@sunmao-ui/shared';
import { css } from '@emotion/css';

export default implementRuntimeComponent({
  version: 'custom/v1',
  metadata: {
    name: 'componentName',
    displayName: 'componentDisplayName',
    description: '',
    isDraggable: false,
    isResizable: false,
    exampleProperties: {},
    exampleSize: [1, 1],
    annotations: {
      category: PRESET_PROPERTY_CATEGORY.Basic,
    },
  },
  spec: {
    properties: Type.Object({}),
    state: Type.Object({}),
    methods: {},
    slots: {},
    styleSlots: ['content'],
    events: [],
  },
})(({ customStyle }) => {
  // implement your component here
  return <div className={css(customStyle?.content)} />;
});
