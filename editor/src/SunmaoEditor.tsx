import React, { useState, useMemo, useEffect } from 'react';
import { initSunmaoUIEditor } from '@sunmao-ui/editor';
import { type Application, type Module } from '@sunmao-ui/core';
import { fetchApp, fetchModules, saveApp, saveModules } from './services';
import config from '../../src/runtime.config';
import '@sunmao-ui/editor/dist/index.css';

const DEFAULT_APP: Application = {
  version: 'sunmao/v1',
  kind: 'Application',
  metadata: {
    name: 'some App',
  },
  spec: {
    components: [],
  },
};

type Props = {
  name: string;
};

export default function SunmaoEditor(props: Props) {
  const { name } = props;
  const [app, setApp] = useState<Application>(JSON.parse(JSON.stringify(DEFAULT_APP)));
  const [modules, setModules] = useState<Module[]>([]);

  const { Editor } = useMemo(
    () =>
      initSunmaoUIEditor({
        defaultApplication: app,
        defaultModules: modules,
        runtimeProps: config,
        storageHandler: {
          onSaveApp: function (app) {
            return saveApp(name, app);
          },
          onSaveModules: function (modules) {
            return saveModules(modules);
          },
        },
      }),
    [app, modules, name]
  );

  useEffect(() => {
    (async function () {
      const [app, modules] = await Promise.all([fetchApp(name), fetchModules()]);

      setApp(app);
      setModules(modules);
    })();
  }, [name]);

  return <Editor />;
}
