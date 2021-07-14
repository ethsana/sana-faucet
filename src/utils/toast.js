export default function (msg, duration){
  duration = isNaN(duration) ? 3000 : duration;
  const m = document.createElement('div');
  m.innerHTML = msg;
  m.style.cssText="max-width:80%;min-width: 80px;padding: 10px 14px; word-break: break-all;line-height:1.5;color: rgb(255, 255, 255);text-align: center;border-radius: 4px;position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0, 0.72);font-size: 14px;";
  document.body.appendChild(m);
  setTimeout(function() {
    const d = 0.5;
    m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
    m.style.opacity = '0';
    setTimeout(function() { document.body.removeChild(m) }, d * 1000);
  }, duration);
};
