import SunmaoEditor from './SunmaoEditor';
import ReactDOM from 'react-dom';
import React from 'react';
import { RouteComponent } from '../../src/components/Router';

export default function Editor() {
  return (
    <RouteComponent
      generateComponent={route => () => <SunmaoEditor name={route.name} />}
      type="history"
    />
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Editor />
  </React.StrictMode>,
  document.getElementById('root')
);
