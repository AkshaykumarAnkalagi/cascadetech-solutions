async function test() {
  const urls = [
    'https://cascade-erp.in',
    'https://cascade-erp.in/',
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
    const html = await res.text();
    console.log('Has ambient shade (from-cyan-400/35):', html.includes('from-cyan-400/35'));
    console.log('Has new width 104:', html.includes('width="104"'));
    console.log('Has new height lg:h-[84px]:', html.includes('lg:h-[84px]'));
    console.log('Has og:image (jpg):', html.includes('og-image.jpg'));
  }
}
test();
