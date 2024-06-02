addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
})

async function handleRequest(request) {
  const url = new URL(request.url);

  // 只处理 /dns-query 路径
  if (url.pathname === '/dns-query') {
    const dohServerUrl = 'https://cloudflare-dns.com/dns-query';

    // 仅保留必要的请求头
    const necessaryHeaders = new Headers();
    necessaryHeaders.set('Content-Type', 'application/dns-message');
    necessaryHeaders.set('Accept', 'application/dns-message');

    // 读取请求体
    const requestBody = await request.arrayBuffer();

    // 发起 DoH 请求
    const response = await fetch(dohServerUrl, {
      method: 'POST',
      headers: necessaryHeaders,
      body: requestBody
    });

    // 仅保留必要的响应头
    const responseHeaders = new Headers();
    responseHeaders.set('Content-Type', 'application/dns-message');
    responseHeaders.set('X-Proxy-By', 'Cloudflare Worker');

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders
    });
  } else {
    // 如果路径不是 /dns-query，返回 404 Not Found
    return new Response('Not Found', { status: 404 });
  }
}
