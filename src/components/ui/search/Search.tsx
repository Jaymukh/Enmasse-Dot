import React, { useState } from 'react';
import { GoSearch } from 'react-icons/go';
import styles from './Search.module.css';

interface SearchProps {
    handleInputChange: (value: string) => void;
    handleSelectValue: (value: string) => void;
    data: any;
    value: string;
    suggestions: any;
}

const Search = ({ handleInputChange, handleSelectValue, data, value, suggestions }: SearchProps) => {
    const [hideSuggestions, setHideSuggestions] = useState<boolean>(true);

    return (
        <div className='d-flex flex-column'>
            <input
                onFocus={() => setHideSuggestions(false)}
                onBlur={async () => {
                    setTimeout(() => {
                        setHideSuggestions(true);
                    }, 200);
                }}
                type="text"
                placeholder="Search by state"
                value={value}
                onChange={(e) => {
                    handleInputChange(e.target.value);
                }}
            />
            <span className={styles.icon}><GoSearch fontSize={22} /></span>
            <div
                className={`py-1 ${hideSuggestions ? styles.suggestions_hidden : styles.suggestions_visible}`}
            >
                {suggestions.map((suggestion: any) => (
                    <div
                        className={`text-start py-1 ${styles.suggestions_item}`}
                        onClick={() => handleSelectValue(suggestion.name)}
                        key={suggestion.name}
                    >
                        <p className='px-3 m-0'>{suggestion.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Search;