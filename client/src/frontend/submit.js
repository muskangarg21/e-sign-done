import React, { useEffect, useState } from 'react';

const Submitfun = () => {
    //---------------------------------------------------------------------------------------------------------------------
    // States and variables
    const [showLoader, setshowLoader] = useState(false);
    const [refresh, setrefresh] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState({});
    const [values, setValues] = useState({});

    useEffect(() => {
        if (Object.keys(error).length === 0 && isSubmitting) {
        handleSubmit();
        } else if (isSubmitting) {
        setIsSubmitting(false)
        }
    }, [error]);

    const preHandleSubmit = (event) => {
        console.log('hono');
        if (event) event.preventDefault();
        setError(validate(values));
        setIsSubmitting(true);
      };
    
    function handleSubmit(type) {
        setshowLoader(true)

        let formData = new FormData();
        // values.userId = userId
        // values.userEmail = userEmail
        Object.keys(values).forEach((key) => {
            formData.append(key, values[key]);
        });

        call('POST', 'userdocument', formData).then((result) => {
            console.log('post request result:', result);
            toastDisplay(result, "success");
            setshowLoader(false)
            setrefresh(refresh + 1)
        }).catch(err => {
            setshowLoader(false)
            console.log("conn:", err)
            toastDisplay(err, "error");
        })
    }
}
module.exports = {
    Sumbitfun
}