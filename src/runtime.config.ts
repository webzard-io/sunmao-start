import { type SunmaoUIRuntimeProps } from '@sunmao-ui/runtime';
import { ArcoDesignLib } from '@sunmao-ui/arco-lib';
import { EChartsLib } from '@sunmao-ui/echarts-lib';
import lib from './sunmao/lib';
import i18n from './locales';
import '@sunmao-ui/arco-lib/dist/index.css';
import './styles/global.scss';

const libs = [ArcoDesignLib, EChartsLib, lib];

export default {
  libs,
  dependencies: {
    i18n,
  },
} as SunmaoUIRuntimeProps;
