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
    classname?: string,

    // results: any;
    // handleChangeResults: (data: any, value: string) => void;

    // handleSelectedValue: (data: any, value: string) => void;
}

const Search = ({ handleInputChange, handleSelectValue, data, value, suggestions, hideSuggestionBox, placeholderValue, classname }: SearchProps) => {
    const [hideSuggestions, setHideSuggestions] = useState<boolean>(true);

    const handleSelectOption = (value: any) => {
        if(handleSelectValue) {
            handleSelectValue(value);
        }
    }
    // const [value, setValue] = useState<string>('');
    // const [results, setResults] = useState(
    //     [
    //         {
    //             code: 'AD',
    //             name: 'Andhra Pradesh',
    //             districts: [
    //                 {
    //                     code: 'AD1',
    //                     name: 'Anantapur',
    //                 },
    //                 {
    //                     code: 'AD2',
    //                     name: 'Chittoor',
    //                 },
    //                 {
    //                     code: 'AD3',
    //                     name: 'East Godavari',
    //                 },
    //                 {
    //                     code: 'AD4',
    //                     name: 'Guntur',
    //                 },
    //                 {
    //                     code: 'AD4',
    //                     name: 'Krishna'
    //                 }
    //             ]
    //         },
    //         {
    //             code: 'GJ',
    //             name: 'Gujarat',
    //             districts: [
    //                 {
    //                     code: 'GJ1',
    //                     name: 'Ahmedabad',
    //                 },
    //                 {
    //                     code: 'GJ2',
    //                     name: 'Amreli',
    //                 },
    //                 {
    //                     code: 'GJ3',
    //                     name: 'Anand',
    //                 },
    //                 {
    //                     code: 'GJ4',
    //                     name: 'Kutch'
    //                 }
    //             ]

    //         },
    //         {
    //             code: 'KL',
    //             name: 'Kerala',
    //             districts: [
    //                 {
    //                     code: 'KL1',
    //                     name: 'Thiruvananthapuram',
    //                 },
    //                 {
    //                     code: 'KL6',
    //                     name: 'Thrissur'
    //                 }
    //             ]
    //         }
    //     ]);

    // const [suggestions, setSuggestions] = useState(data);



    // const handleInputChange = (value: string) => {
    //     setValue(value);
    //     if (!value) {
    //         setSuggestions(data);
    //     } else {
    //         const result = suggestions.filter((item: any) => item.name.toLowerCase().includes(value.toLowerCase()));
    //         setSuggestions(result);
    //     }
    // }

    // const handleSelectValue = (value: string) => {
    //     setValue(value);
    //     const filteredData = suggestions.filter((item: any) => item.name.toLowerCase().includes(value.toLowerCase()));
    //     setResults(filteredData);
    //     // handleInputChange(value);
    //     // handleSelectedValue(data, value)

    // }

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
                placeholder={placeholderValue}
                value={value}
                onChange={(e) => {
                    handleInputChange(e.target.value);
                }}
            />
            <span className={styles.icon}><GoSearch fontSize={22} /></span>
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