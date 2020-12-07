import { useState, useCallback } from 'react';


export default (defaultValue) => {
    const[ value, setValue ] = useState(defaultValue);

    const onChange = useCallback((e) => {
        const { value } = e.target
        setValue(value);
    }, [])
    return { value, onChange, setValue };
}