import { implementRuntimeComponent } from '@sunmao-ui/runtime';
import { Type } from '@sinclair/typebox';
import { PRESET_PROPERTY_CATEGORY } from '@sunmao-ui/shared';
import { css, cx } from '@emotion/css';

const ColorFontStyle = css`
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  background-clip: text;
  color: transparent;
  animation: flowing-background 10s ease infinite;

  @keyframes flowing-background {
    0% {
      background-position: 0% 50%;
    }

    50% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0% 50%;
    }
  }
`;

export default implementRuntimeComponent({
  version: 'custom/v1',
  metadata: {
    name: 'font',
    displayName: 'Font',
    description: 'The amazing color font.',
    isDraggable: false,
    isResizable: false,
    exampleProperties: {
      text: 'SunmaoUI',
    },
    exampleSize: [1, 1],
    annotations: {
      category: PRESET_PROPERTY_CATEGORY.Basic,
    },
  },
  spec: {
    properties: Type.Object({
      text: Type.String({ title: 'Text' }),
    }),
    state: Type.Object({
      isHover: Type.Boolean(),
    }),
    methods: {},
    slots: {
      prefix: {
        slotProps: Type.Object({}),
      },
    },
    styleSlots: ['content'],
    events: ['onClick'],
  },
})(({ text, customStyle, callbackMap, slotsElements, mergeState }) => {
  const onMouseEnter = () => {
    mergeState({
      isHover: true,
    });
  };
  const onMouseLeave = () => {
    mergeState({
      isHover: false,
    });
  };
  const onClick = () => {
    callbackMap?.onClick?.();
  };

  return (
    <div
      className={cx(css(customStyle?.content), ColorFontStyle)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {slotsElements.prefix ? slotsElements.prefix({}) : null}
      {text}
    </div>
  );
});
