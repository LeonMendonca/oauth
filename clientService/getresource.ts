import http from "http";

//const url = 'http://localhost:3000/'

const body = JSON.stringify({
  email: "leon@gmail.com"
});

function getResource(accessToken: string): Promise<string> {
  console.log('called', accessToken);
  return new Promise((resolve, reject) => {
    const httpReq = http.request({ 
      host: '127.0.0.1', 
      method: 'GET', 
      port: 3000,
      path: '/oauth',
      headers: {
        'authorization': `Bearer ${accessToken}`
      }
    }, (httpRes) => {
      httpRes.on('data', (data: Buffer) => {
        resolve(data.toString('utf-8'));
      }).on('end', ()=> {
        console.log('--response ended--');
      });
    });
    httpReq.setTimeout(3000, ()=> {
      httpReq.emit('error', new Error("Request timed out"));
    });
    httpReq.on('error', (error)=> {
      reject(error);
    });
    httpReq.end();
  });
}

export { getResource }
