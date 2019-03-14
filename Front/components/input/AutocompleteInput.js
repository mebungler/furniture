import React from 'react';
import Autosuggest from "react-autosuggest";

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
const escapeRegexCharacters = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');


class AutocompleteInput extends React.Component {
    state = {
        suggestions: []
    };
    getSuggestions = (value) => {
        const escapedValue = escapeRegexCharacters(value.trim());

        if (escapedValue === '') {
            return [];
        }

        const regex = new RegExp('^' + escapedValue, 'i');
        const suggestions = this.props.suggestions.filter(language => regex.test(language.name));

        if (suggestions.length === 0) {
            return [
                {isAddNew: true}
            ];
        }

        return suggestions;
    };

    getSuggestionValue = suggestion => suggestion.Name;

    onSuggestionsFetchRequested = ({value}) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    renderSuggestion = suggestion => (
        <div>
            {suggestion.Name}
        </div>
    );

    render() {
        const {value, placeholder, onChange, className,name, ...rest} = this.props;
        const {suggestions} = this.state;
        const inputProps = {
            placeholder,
            value,
            onChange,
            className,
            name
        };
        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
                onChange={onChange}
                {...rest}
            />
        )
    }

}

export default AutocompleteInput;