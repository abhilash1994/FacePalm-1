var rtcOpts = {
    room: 'test-room',
    //signaller: 'ws://192.168.137.181:3000'
	signaller: 'https://switchboard.rtc.io'
  };

var rtc = RTC(rtcOpts);

var localVideo = document.getElementById('l-video');

var remoteVideo = document.getElementById('r-video');

var messageWindow = document.getElementById('messages');


function bindDataChannelEvents(id, channel, attributes, connection) {

  
  channel.onmessage = function (evt) {
    messageWindow.innerHTML = evt.data;
  };

  messageWindow.onkeyup = function () {
    channel.send(this.innerHTML);
  };
}


function init(session) {
  session.createDataChannel('chat');
  session.on('channel:opened:chat', bindDataChannelEvents);
  

}

localVideo.appendChild(rtc.local);
remoteVideo.appendChild(rtc.remote);

rtc.on('ready', init);