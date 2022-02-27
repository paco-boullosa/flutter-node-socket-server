const Band = require("./band");

class Bands {
    constructor() {
        this.bands = [];
    }

    addBand( band = new Band()){
        this.bands.push(band);
    }
    getBands(){
        return this.bands;
    }
    deleteBand( id = '' ) {
        this.bands = this.bands.filter( registro => registro.id !== id );
        return this.bands;
    }
    votarBanda(id){
        this.bands = this.bands.map( registro => {
            if (registro.id === id) {
                registro.votes++;
            }
            return registro;
        });
    }
}

module.exports = Bands;