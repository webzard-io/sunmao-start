import { implementRuntimeTrait } from '@sunmao-ui/runtime';
import { Type } from '@sinclair/typebox';

export default implementRuntimeTrait({
  version: 'custom/v1',
  metadata: {
    name: 'animation',
  },
  spec: {
    properties: Type.Object({
      isVisible: Type.Boolean({ title: 'Is Visible' }),
      from: Type.String({ title: 'From' }),
      to: Type.String({ title: 'To' }),
      duration: Type.Number({ title: 'Duration' })
    }),
    methods: [],
    state: Type.Object({
      isVisible: Type.Boolean(),
    }),
  },
})(() => {
  const visibleMap = new Map();

  return ({ isVisible, from = 'opacity: 0; transform: translateY(50px);', to = '', duration = 0.8, componentId, services, mergeState }) => {
    if (visibleMap.has(componentId)) {
      return {
        props: {},
      };
    }

    const { eleMap } = services;

    return {
      props: {
        customStyle: isVisible
          ? {
              content: `${to} transition: all ${duration}s ease;`,
            }
          : { content: `${from} transition: all ${duration}s ease;` },
        componentDidMount: [
          () => {
            const el = eleMap.get(componentId);

            if (el) {
              const o = new IntersectionObserver(
                ([entry]) => {
                  mergeState({ isVisible: entry.isIntersecting });
                },
                { root: document.body }
              );

              o.observe(el);
            }
          },
        ],
      },
    };
  };
});
