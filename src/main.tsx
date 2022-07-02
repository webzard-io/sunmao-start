import SunmaoApp from './SunmaoApp';
import ReactDOM from 'react-dom';
import React from 'react';
import { RouteComponent } from './components/Router';
import type { Application, ComponentSchema } from '@sunmao-ui/core';

export default function App() {
  return (
    <RouteComponent
      generateComponent={route =>
        React.lazy(async () => {
          const application = await import(`./applications/${route.name}.json`);
          const moduleNames: string[] = application.spec.components
            .filter(
              (componentSchema: ComponentSchema) =>
                componentSchema.type === 'core/v1/moduleContainer'
            )
            .map((componentSchema: ComponentSchema) => {
              const type = (componentSchema.properties as any).type.split('/');

              return type[type.length - 1];
            });
          const modules = await Promise.all(
            moduleNames.map(name => import(`./modules/${name}.json`))
          );

          return {
            default: function () {
              return (
                <SunmaoApp
                  application={application.default as Application}
                  modules={modules}
                />
              );
            },
          };
        })
      }
      type="history"
    />
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
