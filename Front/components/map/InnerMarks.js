import React from 'react';
import {Placemark, withYMaps} from 'react-yandex-maps'

class InnerMarks extends React.Component {
    state = {caption: "searching...", properties: {}};
    renderMark = () => {
        let {location} = this.props;
        let lat = parseFloat(location.split(",")[0]);
        let long = parseFloat(location.split(",")[1]);
        this.props.ymaps.geocode([lat, long]).then(res => {
            let firstGeoObject = res.geoObjects.get(0);
            this.setState({
                ...this.state, properties: {
                    iconCaption: [
                        // The name of the municipality or the higher territorial-administrative formation.
                        firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
                        // Getting the path to the toponym; if the method returns null, then requesting the name of the building.
                        firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
                    ].filter(Boolean).join(', '),
                    // Specifying a string with the address of the object as the balloon content.
                    balloonContent: firstGeoObject.getAddressLine()
                }
            });
        });
        return [lat, long]
    };

    render() {
        return (
            <div>
                {this.props.location !== "" &&
                <Placemark geometry={this.renderMark()} properties={this.state.properties}/>}
            </div>
        );
    }
}

export default withYMaps(InnerMarks, true, ['geocode']);