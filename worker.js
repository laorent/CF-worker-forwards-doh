addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  try {
    const url = new URL(request.url)
    url.hostname = 'security.cloudflare-dns.com'
    url.pathname = '/dns-query'
    
    const newHeaders = new Headers(request.headers)
    // Ensure headers are appropriate
    newHeaders.set('Host', 'security.cloudflare-dns.com')
    newHeaders.set('User-Agent', 'Cloudflare-Worker')
    
    const newRequest = new Request(url, {
      method: request.method,
      headers: newHeaders,
      body: request.body,
      redirect: 'manual' // We handle redirects ourselves
    })
    
    const response = await fetch(newRequest)

    // Clone the response to be able to modify headers
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
