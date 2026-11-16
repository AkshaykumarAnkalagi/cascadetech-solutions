async function test() {
  const urls = [
    'https://cascade-erp.in',
    'https://www.cascade-erp.in',
    'https://www.cascade-erp.in/en'
  ];

  for (const url of urls) {
    console.log('\n--- Checking URL:', url, '---');
    const res = await fetch(url, {
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
      }
    });
    console.log('Final URL:', res.url, 'Status:', res.status);
    console.log('Cache-Control:', res.headers.get('cache-control'));
    console.log('x-vercel-cache:', res.headers.get('x-vercel-cache'));
    const html = await res.text();
    console.log('Has GovOS:', html.includes('GovOS'));
    console.log('Has Educore:', html.includes('Educore'));
    console.log('Has Nestora:', html.includes('Nestora Hub'));
    console.log('Has og:image (jpg):', html.includes('og-image.jpg'));
  }
}
test();
