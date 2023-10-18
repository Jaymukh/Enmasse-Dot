import React, { useState } from 'react';
import { GoSearch } from 'react-icons/go';
import styles from './Search.module.css';

interface SearchProps {
    handleInputChange: (value: string) => void;
    handleSelectValue?: (value: string) => void;
    data?: any;
    value: string;
    suggestions?: any;
    hideSuggestionBox: boolean;
    placeholderValue: string;
    classname?: string
}

const Search = ({ handleInputChange, handleSelectValue, data, value, suggestions, hideSuggestionBox, placeholderValue, classname }: SearchProps) => {
    const [hideSuggestions, setHideSuggestions] = useState<boolean>(true);

    const handleSelectOption = (value: any) => {
        if (handleSelectValue) {
            handleSelectValue(value);
        }
    }

    return (
        <div className='d-flex flex-column h-auto'>
            <div className="d-flex flex-column justify-content-center align-items-start">
                <input
                    onFocus={() => setHideSuggestions(false)}
                    onBlur={async () => {
                        setTimeout(() => {
                            setHideSuggestions(true);
                        }, 200);
                    }}
                    type="text"
                    placeholder={placeholderValue}
                    value={value}
                    className={classname}
                    onChange={(e) => {
                        handleInputChange(e.target.value);
                    }}
                />
                <span className={styles.icon}><GoSearch fontSize={22} /></span>
            </div>

            {!hideSuggestionBox &&
                <div
                    className={`py-1 ${classname} ${hideSuggestions ? styles.suggestions_hidden : styles.suggestions_visible}`}
                >
                    {suggestions.map((suggestion: any) => (
                        <div
                            className={`text-start py-1 ${styles.suggestions_item}`}
                            onClick={() => handleSelectOption(suggestion.name)}
                        >
                            <p className='px-3 m-0'>{suggestion.name}</p>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default Search;