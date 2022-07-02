import { initSunmaoUI } from '@sunmao-ui/runtime';
import { type Application, type RuntimeModule } from '@sunmao-ui/core';
import config from './runtime.config';

type Props = {
  application: Application;
  modules?: RuntimeModule[];
};

export default function SunmaoEditor(props: Props) {
  const { application, modules = [] } = props;
  const { App, registry } = initSunmaoUI(config);

  modules.forEach(moduleSchema => {
    registry.registerModule(moduleSchema);
  });

  return <App options={application} />;
}
