import { useState } from 'react';

const useFormFields = (initState) => {
    const [fields, setValue] = useState(initState);

    return [
        fields,
        (event) => {
            if (event) {
                return setValue({
                    ...fields,
                    [event.target.name]: event.target.value,
                });
            }
            return setValue(initState);
        },
    ];
};

export default useFormFields;
