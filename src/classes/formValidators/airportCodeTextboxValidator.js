import stations from '../../Assets/stations.json';

class AirportCodeValidator {

    static validate(value, departureOrArrival, otherTextboxValue) {
        const station = value.substr(-3).toUpperCase();
        const otherTextboxStation = otherTextboxValue.substr(-3).toUpperCase();

        if(station in stations.airStations){
            const stationName = stations.airStations[station].stationName;
            const stateFederalUnit = stations.airStations[station].stateFederalUnit;
            const airportCode = stations.airStations[station].airportCode;
            var stationIsInternational = stateFederalUnit.length > 2;
            var fullDescription = `${stationName}, ${stateFederalUnit} - ${airportCode}`;
        }

        if(otherTextboxStation in stations.airStations){
            var otherStationIsInternational = stations.airStations[otherTextboxStation].stateFederalUnit.length > 2;
        }
        const valuesIsFullDescription = !value.localeCompare(fullDescription, undefined , {sensitivity: 'base'});
        const valueIsValidStation = Object.keys(stations.airStations).includes(value.toUpperCase());
        const bothStationsAreInternational = stationIsInternational && otherStationIsInternational;
        const bothStationsAreSame = station && station === otherTextboxStation;
        const stationsAreCompatible = !bothStationsAreInternational && !bothStationsAreSame;
        const updatedValue = (valuesIsFullDescription  || valueIsValidStation) && stationsAreCompatible ? fullDescription : '';
        let errorMessage = updatedValue ? '' : `Enter ${departureOrArrival} city or airport code.`;
        errorMessage = !stationsAreCompatible ? `Invalid route with ${departureOrArrival === 'arrival' ? 'departure' : 'arrival'} airport` : errorMessage;
        return [updatedValue, errorMessage];
    }
}

export default AirportCodeValidator;