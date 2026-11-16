async function test() {
  const res = await fetch('https://www.cascade-erp.in/en');
  const html = await res.text();
  console.log('--- LIVE HTML INSPECTION ---');
  console.log('Has ambient shade (from-cyan-400/35):', html.includes('from-cyan-400/35'));
  console.log('Has new width 104:', html.includes('width="104"'));
  console.log('Has new height lg:h-[84px]:', html.includes('lg:h-[84px]'));
  console.log('Has og:image (jpg):', html.includes('og-image.jpg'));

  // Also check the navbar header snippet
  const navMatch = html.match(/<header[^>]*>([\s\S]*?)<\/header>/i);
  if (navMatch) {
    console.log('Navbar snippet length:', navMatch[0].length);
    console.log('Navbar starts with:', navMatch[0].slice(0, 300));
  }
}
test();
