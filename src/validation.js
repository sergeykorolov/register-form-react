import {useEffect, useState} from "react";

const useValidation = (value, validations) => {

    const [isEmpty, setEmpty] = useState(true);
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [errorText, setErrorText] = useState('Поле не может быть пустым');
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'isEmpty':
                    value ? setEmpty(false) : setEmpty(true);
                    break;
                case 'isEmail':
                    const reEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (!reEmail.test(String(value).toLowerCase())) {
                        setEmailError(true);
                        setErrorText('Введено некорректное значение');
                        if (!value) {
                            setErrorText("Поле не может быть пустым");
                        }
                    } else {
                        setEmailError(false);
                        setErrorText("");
                    }
                    break;
                case 'isValidPhone':
                    const rePhone = /^\+[0-9]\(\d{3}\)\d{3}-\d{2}-\d{2}$/;
                    if (!rePhone.test(String(value))) {
                        setPhoneError(true);
                        setErrorText('Введено некорректное значение');
                        if (!value) {
                            setErrorText("Поле не может быть пустым");
                        }
                    } else {
                        setPhoneError(false);
                        setErrorText("");
                    }
                    break;
                case 'isValidName':
                    const reName = /^[a-z -]{3,16}$/;
                    if (!reName.test(String(value).toLowerCase())) {
                        setNameError(true);
                        setErrorText('Введено некорректное значение');
                        if (!value) {
                            setErrorText('Поле не может быть пустым');
                        }
                    } else {
                        setNameError(false);
                        setErrorText("");
                    }
                    break;
                default:
                    break;
            }
        }
    }, [value]);

    useEffect(() => {
        if (isEmpty || emailError || phoneError || nameError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [isEmpty, emailError, phoneError, nameError]);

    return {
        isEmpty,
        emailError,
        phoneError,
        nameError,
        errorText,
        formValid
    }
};

const useInput = (initialValue, validations) => {

    const [value, setValue] = useState(initialValue);
    const [isDirty, setDirty] = useState(false);
    const valid = useValidation(value, validations);

    const onChange = (e) => {
        setValue(e.target.value);
    }

    const onBlur = (e) => {
        setDirty(true);
    }

    return {
        value,
        onChange,
        onBlur,
        isDirty,
        ...valid
    }
};

export default useInput;