import socketio from 'socket.io-client';

const socket = socketio('http://192.168.0.6:8080', {
    autoConnect:false
});

function subscribeToNewDevs(subscribeFunction){
    socket.on('new-dev', subscribeFunction);
}

function connect(latitude, longitude, techs){
    socket.io.opts.query = {
        latitude,
        longitude,
        techs
    };

    socket.connect();

    
    
}

function disconnect(){

    if(socket.connected){
        console.log("ola");

        socket.disconnect();
    }
}

export {
    connect,
    disconnect,
    subscribeToNewDevs
}