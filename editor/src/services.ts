import type { Application, Module } from '@sunmao-ui/core';

const PREFIX = '/sunmao-fs';

export async function fetchApp(name: string): Promise<Application> {
  const application = await (await fetch(`${PREFIX}/${name}`)).json();

  if (application.kind === 'Application') {
    return application;
  }

  throw new Error('failed to load schema');
}

export function saveApp(name: string, app: Application) {
  return fetch(`${PREFIX}/${name}`, {
    method: 'put',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      value: app,
    }),
  });
}

export async function fetchModules(): Promise<Module[]> {
  const response = await (await fetch(`${PREFIX}/modules`)).json();

  if (Array.isArray(response)) {
    return response;
  }

  throw new Error('failed to load schema');
}

export function saveModules(modules: Module[]) {
  return fetch(`${PREFIX}/modules`, {
    method: 'put',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      value: modules,
    }),
  });
}
