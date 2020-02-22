// @flow

import moment from 'moment';
import * as React from 'react';
import SunCalc from 'suncalc';
import LocationAndDateForm from '../components/LocationAndDateForm/LocationAndDateForm';
import SunActivity from '../components/SunActivity/SunActivity';
import { fetchCoordinates } from '../services/services';
import './SunActivityPage.css'

type State = {
    coordinatesError: string | boolean,
    sunActivity: any,
};

class SunActivityPage extends React.Component<{}, State> {

    constructor(props: {}) {
        super(props);
        this.state = {
            coordinatesError: false,
            sunActivity: {},
        };

        // (this: any).getSunActivity = this.getSunActivity.bind(this);
    }

    getSunActivity (args: {postcode: string, date: string}) {

        const { postcode, date } = args;

        fetchCoordinates(postcode)
            .then((response: any) => {
                return {
                    formattedDate: moment(date).toDate(),
                    latitude: response.result.latitude,
                    longitude: response.result.longitude
                }
            })
            .then((data: any) => {
                this.setState({
                    coordinatesError: false,
                    sunActivity: SunCalc.getTimes(data.formattedDate, data.latitude, data.longitude),
                });
            })
            .catch(({error}) => {
                this.setState({
                    coordinatesError: error
                });
            })
    }

    render () {
         const { coordinatesError, sunActivity } = this.state;

         return (
            <div className="page-sun-activity">
                <h1 className="page-sun-activity__header">
                    Sunrise and Sunset
                </h1>
                <LocationAndDateForm
                    error={coordinatesError}
                    getSunActivity={this.getSunActivity} />
                <SunActivity
                    sunActivity={sunActivity} />
            </div>
        )
    }
}

export default SunActivityPage;