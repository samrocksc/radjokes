export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname;

  // Skip static files - let them be served directly
  if (
    path.endsWith('.html') ||
    path.endsWith('.css') ||
    path.endsWith('.js') ||
    path.endsWith('.json') ||
    path.endsWith('.md') ||
    path.endsWith('.png') ||
    path.endsWith('.jpg') ||
    path.endsWith('.jpeg') ||
    path.endsWith('.gif') ||
    path.startsWith('/blog/entries/')
  ) {
    return env.ASSETS.fetch(request);
  }

  // For /blog, /blog/, and all other /blog/* routes, serve app.html
  const appUrl = new URL('/blog/app.html', url.origin);
  return env.ASSETS.fetch(appUrl);
}
