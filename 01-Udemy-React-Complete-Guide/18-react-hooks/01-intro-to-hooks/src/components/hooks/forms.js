// for when you want to create your own hooks
// these are kind of like mixins
// these hooks are reusable - super useful

import { useState } from 'react';

export const useFormInput = () => {
    const [value, setValue] = useState('');
    const [validity, setValidity] = useState(false);

    const inputChangedHandler = event => {
        const inputVal = event.target.value;
        setValue(inputVal);
        setValidity(inputVal.trim() !== '')
    }

    // can return anything
    return {
        value,
        onChange: inputChangedHandler,
        validity
    }
}