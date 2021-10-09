let xhr = new XMLHttpRequest();
xhr.onload = (res) => console.log(res);
xhr.onerror = (err) => console.log(err);
xhr.onabort = () => console.log('aborted!');
xhr.open('get', 'https://slowmo.glitch.me/5000');
xhr.send();

setTimeout(() => {
    xhr.abort();
}, 200);