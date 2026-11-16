async function test() {
  const ua = 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)';
  const urls = [
    'https://www.cascade-erp.in',
    'https://www.cascade-erp.in/',
    'https://www.cascade-erp.in/en',
    'https://www.cascade-erp.in/en/'
  ];

  for (const url of urls) {
    console.log('\n--- Checking URL:', url, '---');
    const res = await fetch(url, {
      headers: { 'User-Agent': ua },
      redirect: 'follow'
    });
    console.log('Final URL:', res.url, 'Status:', res.status);
    const html = await res.text();
    const ogImg = html.match(/property="og:image"\s+content="([^"]+)"/i) || html.match(/content="([^"]+)"\s+property="og:image"/i);
    const ogTitle = html.match(/property="og:title"\s+content="([^"]+)"/i) || html.match(/content="([^"]+)"\s+property="og:title"/i);
    const ogDesc = html.match(/property="og:description"\s+content="([^"]+)"/i) || html.match(/content="([^"]+)"\s+property="og:description"/i);
    console.log('og:image:', ogImg ? ogImg[1] : 'NOT FOUND');
    console.log('og:title:', ogTitle ? ogTitle[1] : 'NOT FOUND');
    console.log('og:description:', ogDesc ? ogDesc[1] : 'NOT FOUND');
  }
}

test();
