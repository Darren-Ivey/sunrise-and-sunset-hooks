import * as _ from 'lodash';
import * as React from 'react';
import './LocationAndDateForm.css';

type Props = {
    error: string | boolean,
    getSunActivity: any
}

class LocationAndDateForm extends React.Component<Props, {}> {

    fields: {
        postcodeInput,
        dateInput,
    };

    constructor (props: Props) {
        super(props);
        this.fields = {
            postcodeInput: {},
            dateInput: {}
        };
        // (this:any).handleSubmit = this.handleSubmit.bind(this);
    }

    gatherData () {
        let values: {} = {};
        _.forOwn(this.fields, (field) => {
            if (field) {
                values = {...values, [field.name]: field.value}
            }
        });
        return values;
    }

    handleSubmit (e: any) {
        e.preventDefault();
        this.props.getSunActivity(this.gatherData());
    }

    renderInputError () {
        return (
            <div className="error">
                <p className="error__message">
                    Sorry, we can't find a location for that postcode. Please check your postcode is valid or try another.
                </p>
            </div>
        )
    }

    renderServiceError () {
        return (
            <div className="error">
                <p className="error__message">Please try again.</p>
            </div>
        )
    }

    handleError () {
        return this.props.error === 'NOT_FOUND' ? this.renderInputError() : this.renderServiceError();
    }

    render () {
        return (
            <form className="form" onSubmit={ this.handleSubmit }>
                <h2 className="form__header">Search for your sunrise and sunset times</h2>
                <fieldset className="form_fieldset">
                    <div className="field">
                        <label className="field__label" htmlFor="postcode">Postcode</label>
                        <input defaultValue="" required={true} type="text" id="postcode" name="postcode" className="field__input field__input--text" maxLength={8} ref={ (e) => this.fields.postcodeInput = e } />
                    </div>
                    <div className="field">
                        <label className="field__label" htmlFor="date">Date</label>
                        <input defaultValue="" required={true} type="date" id="date" name="date" className="field__input field__input--date" ref={ (e) => this.fields.dateInput= e } />
                    </div>
                </fieldset>
                <footer className="footer">
                    { this.props.error && this.handleError() }
                    <button className="footer__button" type="submit">Find</button>
                </footer>
            </form>
        )
    }
}

export default LocationAndDateForm;