// https://github.com/yanatan16/nanoajax
!function(t,e){function n(t){return t&&e.XDomainRequest&&!/MSIE 1/.test(navigator.userAgent)?new XDomainRequest:e.XMLHttpRequest?new XMLHttpRequest:void 0}function o(t,e,n){t[e]=t[e]||n}var r=["responseType","withCredentials","timeout","onprogress"];t.ajax=function(t,a){function s(t,e){return function(){c||(a(void 0===f.status?t:f.status,0===f.status?"Error":f.response||f.responseText||e,f),c=!0)}}var u=t.headers||{},i=t.body,d=t.method||(i?"POST":"GET"),c=!1,f=n(t.cors);f.open(d,t.url,!0);var l=f.onload=s(200);f.onreadystatechange=function(){4===f.readyState&&l()},f.onerror=s(null,"Error"),f.ontimeout=s(null,"Timeout"),f.onabort=s(null,"Abort"),i&&(o(u,"X-Requested-With","XMLHttpRequest"),e.FormData&&i instanceof e.FormData||o(u,"Content-Type","application/x-www-form-urlencoded"));for(var p,m=0,v=r.length;v>m;m++)p=r[m],void 0!==t[p]&&(f[p]=t[p]);for(var p in u)f.setRequestHeader(p,u[p]);return f.send(i),f},e.nanoajax=t}({},function(){return this}());!function(){var e=0;document.querySelector("html").addEventListener("keypress",function(t){if(13===t.keyCode&&(e++,e>4)){var r=e%4*90;document.querySelector("html").setAttribute("style","transform:rotate("+r+"deg);")}})}();

// Featch available tickets
(function () {
    'use strict';

    var key = '25824865869';
    var url = 'http://188.226.255.60/api/gb.php?key=' + key;

    nanoajax.ajax({url: url}, function (code, responseText) {
        if (code === 200) {
            var tickets = JSON.parse(responseText);
            if (tickets.sold < tickets.capacity) {
                // Hide placeholder
                document.querySelector('.tickets-placeholder').className += ' hidden';
                // Add available tickets
                var ticketsAvailable = document.querySelector('.tickets-available');
                ticketsAvailable.className = ticketsAvailable.className.replace(/\bhidden\b/, '');
                document.querySelector('.tickets-available span.tickets').textContent = tickets.capacity - tickets.sold + ' av ' + tickets.capacity;
            } else {
                // Hide placeholder
                document.querySelector('.tickets-placeholder').className += ' hidden';
                // Show sold out message
                var ticketsSoldOut = document.querySelector('.tickets-sold-out');
                ticketsSoldOut.className = ticketsSoldOut.className.replace(/\bhidden\b/, '');
            }
        }
    })
}());
