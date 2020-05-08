class Location{
    constructor(address, city, latitude, longitude){
        this._address  = address ;
        this._city = city;
        this._latitude = latitude;
        this._longitude = longitude;
    }
    toJson(){
        return{
            address: this._address.value,
            city: this._city.value,
            latitude: this._latitude.value,
            longitude: this._longitude.value
        }
    }
    
}

module.exports = Location;