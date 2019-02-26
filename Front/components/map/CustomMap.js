import React from 'react';
import {Map, YMaps} from 'react-yandex-maps';
import InnerMarks from "./InnerMarks";

class CustomMap extends React.Component {
    state = {
        header: ""
    };

    render() {
        let {location, ...rest} = this.props;
        return (
            <YMaps
                query={{
                    apikey: '7c42b025-8fb9-4daa-b29f-91c677918548',
                }}
            >
                <Map {...rest}>
                    <InnerMarks location={location}/>
                </Map>
            </YMaps>
        );
    }
}

export default CustomMap;