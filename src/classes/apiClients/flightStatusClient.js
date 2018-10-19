
class FlightStatusClient {
    static getFlightStatus(params) {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'X-API-Key': 'l7xx72f4d7a942b94b648fddadedcc7fe4f3'
        });

        const body = {
            application: 'air-flight-status',
            departureDate: params.departureDate,
            originationAirportCode: params.departureAirport,
            destinationAirportCode: params.arrivalAirport,
            flightNumber: params.flightNumber || '',
            site: 'southwest'
        };

        return(
            fetch('http://172.18.225.110:8090/v1/air-operations/api/air/flights/status',
                {
                    method: 'POST',
                    headers,
                    body: JSON.stringify(body),
                    mode: 'cors'
                }).then(response => response.json())
        );
    }
}

export default FlightStatusClient