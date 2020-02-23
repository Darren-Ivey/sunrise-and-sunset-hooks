import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment';
import SunCalc from 'suncalc';
import LocationAndDateForm from '../components/LocationAndDateForm/LocationAndDateForm';
import SunActivity from '../components/SunActivity/SunActivity';
import { fetchCoordinates } from '../services/services';
import './SunActivityPage.css'

type SunActivity = {
    sunrise: string,
    sunset: string,
}
type Response = {
    result: {
        latitude: string,
        longitude: string,
    }
}
type Error = {
    message: string,
    [key: string]: any,
}

const SunActivityPage = () => {
    const [coordinatesError, setCoordinatesError] = useState<string>("");
    const [sunActivity, setSunActivity] = useState<SunActivity>({
        sunrise: "",
        sunset: "",
    });
    const [postcode, setPostcode] = useState<string>();
    const [date, setDate] = useState<string>();

    useEffect(() => {
        if (postcode && date) {
            const fetchData = async () => {
                try {
                    const res: Response = await fetchCoordinates(postcode);
                    setCoordinatesError("");
                    setSunActivity(SunCalc.getTimes(moment(date).toDate(), res.result.latitude, res.result.longitude));
                } catch ({ message }) {
                    setCoordinatesError(message)
                }
            }
            fetchData();
        }
    }, [postcode, date])

    const getSunActivity = useCallback(
        (postcode: string, date: string) => {
            setPostcode(postcode);
            setDate(date)
        }, []);

    return (
        <div className="page-sun-activity">
            <h1 className="page-sun-activity__header">
                Sunrise and Sunset
            </h1>
            <LocationAndDateForm
                error={coordinatesError}
                getSunActivity={getSunActivity} />
            <SunActivity
                sunActivity={sunActivity} />
        </div>
    )
}

export default SunActivityPage;