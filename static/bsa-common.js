// code below shows ads even if adblock is turned on
window.document.querySelector('.ad.top').appendChild(window.document.createElement('div')).id = 'carbon-block';

const carbonScriptSrc = {
    'jsonlint.com': '//cdn.carbonads.com/carbon.js?serve=CK7DK23U&placement=jsonlintcom',
    'jscompress.com': '//cdn.carbonads.com/carbon.js?serve=CE7D5KJN&placement=jscompresscom',
    'dns-lookup.com': '//cdn.carbonads.com/carbon.js?serve=CE7D5KJU&placement=dns-lookupcom',
    'jsoncompare.com': '//cdn.carbonads.com/carbon.js?serve=CE7D5KJY&placement=jsoncomparecom',
    'validatejavascript.com': '//cdn.carbonads.com/carbon.js?serve=CE7D5K7E&placement=validatejavascriptcom',
    'randomkeygen.com': null,
    localhost: null,
}[window.location.hostname];

if (carbonScriptSrc) {
    window.fetch(new window.Request('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', { method: 'HEAD', mode: 'no-cors' })).catch(() => {
        const carbonScript = window.document.createElement('script');
        carbonScript.src = carbonScriptSrc;
        carbonScript.id = '_carbonads_js';
        window.document.getElementById('carbon-block').appendChild(carbonScript);
    });
}

if (typeof carbonScriptSrc === 'undefined') {
    throw new Error('carbonScriptSrc is undefined');
}
