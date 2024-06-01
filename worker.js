addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  try {
    const url = new URL(request.url)
    url.hostname = 'security.cloudflare-dns.com'
    url.pathname = '/dns-query'
    
    const newHeaders = new Headers(request.headers)
    newHeaders.set('Host', 'security.cloudflare-dns.com')
    newHeaders.set('User-Agent', 'Cloudflare-Worker')
    
    const requestBody = await request.clone().text() // 确保请求体的正确传递
    
    const newRequest = new Request(url, {
      method: request.method,
      headers: newHeaders,
      body: request.method !== 'GET' && request.method !== 'HEAD' ? requestBody : null,
      redirect: 'manual' // 手动处理重定向
    })
    
    const response = await fetch(newRequest)

    const newResponse = new Response(response.body, response)
    newResponse.headers.set('X-Content-Type-Options', 'nosniff')
    newResponse.headers.set('X-Frame-Options', 'DENY')
    newResponse.headers.set('X-XSS-Protection', '1; mode=block')
    newResponse.headers.set('Referrer-Policy', 'no-referrer')
    newResponse.headers.set('Content-Security-Policy', "default-src 'none'")

    return newResponse

  } catch (err) {
    return new Response('Internal Server Error', { status: 500 })
  }
}
