import React, { useState } from 'react';
import './LocationAndDateForm.css';

type Props = {
    error: string,
    getSunActivity: (postcode: string, date: string) => void
}

const renderInputError = () => (
    <p className="error__message">
        Sorry, we can't find a location for that postcode. Please check your postcode is valid or try another.
        </p>
)

const renderServiceError = () => (
    <p className="error__message">Please try again.</p>
)

const renderError = (error: string) => (
    <div className="error">
        {error === 'NOT_FOUND' ? renderInputError() : renderServiceError()}
    </div>
)

const LocationAndDateForm = ({ error, getSunActivity }: Props) => {

    const [postcode, setPostcode] = useState<string>("");
    const [date, setDate] = useState<string>("");

    const handleSubmit = (e) => {
        e.preventDefault();
        getSunActivity(postcode, date);
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2 className="form__header">Search for your sunrise and sunset times</h2>
            <fieldset className="form_fieldset">
                <div className="field">
                    <label className="field__label" htmlFor="postcode">Postcode</label>
                    <input
                        required={true}
                        type="text"
                        name="postcode"
                        className="field__input field__input--text"
                        maxLength={8}
                        onChange={(e) => { setPostcode(e.target.value) }} />
                </div>
                <div className="field">
                    <label className="field__label" htmlFor="date">Date</label>
                    <input
                        required={true}
                        type="date"
                        name="date"
                        className="field__input field__input--date"
                        onChange={(e) => { setDate(e.target.value) }} />
                </div>
            </fieldset>
            <footer className="footer">
                {error && renderError(error)}
                <button className="footer__button" type="submit">Find</button>
            </footer>
        </form>
    )
}

export default LocationAndDateForm;