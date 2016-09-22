var udpSocket = new udp();

udpSocket.option = {
    persistent: true
};
udpSocket.localPort = 8000;
udpSocket.init(function (code) {
    if (code < 0) {
        console.log('UDP Socket bind failed, error code: ' + code);
        return false;
    }
    else {
        //We'll do something after udp socket init later
    }
});