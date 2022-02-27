
const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();
bands.addBand( new Band('Queen'));
bands.addBand( new Band('U2'));
bands.addBand( new Band('Supertramp'));
bands.addBand( new Band('Guns and Roses'));
bands.addBand( new Band('Red Hot Chili Peppers'));
bands.addBand( new Band('Extreme'));

// Mensajes de sockets
io.on('connection', client => {
    console.log('cliente Conectado');

    // cuando un cliente se conecta, se le envían las bandas activas
    client.emit('bandas-activas', bands.getBands());

    client.on('disconnect', () => { 
        console.log('cliente desconectado');
    });

    // escuchar a clientes
    client.on('mensaje', ( payload ) => {
        console.log('Mensaje -> ', payload);
        io.emit('mensaje', { admin: 'Recibido nuevo mensaje' });
    });

    // client.on('emitir-mensaje', ( payload ) => {
    //     client.broadcast.emit('nuevo-mensaje', payload ); // envia a todos menos al emisor
    //     // console.log(payload);
    // });

    client.on('votar-banda', (payload) => {
        bands.votarBanda(payload.id);
        io.emit('bandas-activas', bands.getBands());
        // se usa io. en lugar de client. porque io contiene a todos los clientes conectados
    });

    client.on('nueva-banda', (payload) => {
        bands.addBand( new Band(payload.name));
        io.emit('bandas-activas', bands.getBands());
        // se usa io. en lugar de client. porque io contiene a todos los clientes conectados
    });

    client.on('eliminar-banda', (payload) => {
        bands.deleteBand(payload.id);
        io.emit('bandas-activas', bands.getBands());
        // se usa io. en lugar de client. porque io contiene a todos los clientes conectados
    });

});
