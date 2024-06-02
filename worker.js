addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
})

async function handleRequest(request) {
  const url = new URL(request.url);

  // 只处理 /dns-query 路径
  if (url.pathname === '/dns-query') {
    const dohServerUrl = 'https://cloudflare-dns.com/dns-query';

    // 构建DoH请求
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/dns-message',
        'Accept': 'application/dns-message'
      },
      body: await request.arrayBuffer()
    };

    // 发起DoH请求
    const response = await fetch(dohServerUrl, fetchOptions);

    // 构造响应
    const responseHeaders = new Headers();
    responseHeaders.set('Content-Type', 'application/dns-message');
    responseHeaders.set('X-Proxy-By', 'Cloudflare Worker');

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders
    });
  } else {
    // 如果路径不是 /dns-query，返回404 Not Found
    return new Response('Not Found', { status: 404 });
  }
}
