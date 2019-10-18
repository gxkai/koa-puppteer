const Koa = require('koa');
const app = new Koa();
var router = require('koa-router')();
const puppeteer = require('puppeteer');
const arr = [
    '<div>达瓦大大达瓦大达瓦大无大多哇多哇无大达瓦大达瓦大大无多哇多哇</div>',
    '<div>男女比是没VB没是女魃墓VB没VB没吧v无大达瓦大哇大小从自行车在重新做小从着小船</div>',
    '<p>·我一条腿与兔兔一条腿达瓦大大达瓦大达瓦大无大达瓦大哇大小从自行</p>'
]
const http = require('http');
let page
const start = async () => {
    //创建一个browser 实例
    let browser = await puppeteer.launch({
        headless: true,
        devtools: true,
        args: [
            '--disabled-gpu', // 正常服务器连显卡都没有
            '--no-sandbox'
        ]
    });
    //创建一个空白page实例
    page = await browser.newPage();
    await page.goto('http://fanyi.baidu.com/transpage?query=http%3A%2F%2Fwww.baidu.com&from=en&to=en&source=url&render=1')
}

router.get('/',async (ctx)=>{
    await page.$eval('#baidu_web_translate', input => input.value = 'www.cn86.cn')
    await page.click('.select-from-language')
    await page.click('.from-language-list a[value=zh]')
    await page.waitFor('.select-to-language')
    await page.click('.select-to-language')
    await page.click('.to-language-list a[value=en]')
    await page.waitFor('iframe')
    const frame = page.frames().find(frame => frame.name() === 'web-tranlsate-wrap');
    await frame.waitForSelector('.tonglan-contact');
    const text = await frame.$eval('.tonglan-contact', element => element.outerHTML);
    ctx.body = text;
})

router.get('/test',async (ctx)=>{
    ctx.headers['Content-Type'] = 'html'

    ctx.body = '<!DOCTYPE html>'+
        '<html>'+
        '<head>'+
        '<meta charset="utf-8" />'+
        '<title>祥云平台</title>'+
        '</head><body>'+
        arr[0]+
        '</body></html>';
})

app.use(router.routes());   /*启动路由*/
app.use(router.allowedMethods());

app.listen(4000);
// start();
