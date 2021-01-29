import './App.scss';
import React, {useState} from "react";
import classNames from 'classnames';
import InputMask from 'react-input-mask';
import useInput from "./validation";

const App = () => {

    const name = useInput('', {isEmpty: true, isValidName: true});
    const email = useInput('', {isEmpty: true, isEmail: true});
    const phone = useInput('', {isEmpty: true, isValidPhone: true});

    const [language, setLanguage] = useState("Язык");
    const [isActiveLangMenu, setActiveLangMenu] = useState(false);
    const [isLangMenuDirty, setLangMenuDirty] = useState(false);
    const [conditions, setConditions] = useState(false);
    const languageValid = language !== "Язык";
    const formValid = name.formValid && email.formValid && phone.formValid && languageValid && conditions;

    const onChangeLangMenuStatus = () => {
        setActiveLangMenu(!isActiveLangMenu);
        setLangMenuDirty(true);
    }

    const onChooseLanguage = (e) => {
        setLanguage(e.target.innerText);
    }

    const onConfirmConditions = () => {
        setConditions(!conditions);
    }

    return (
        <div className="wrapper" onClick={isActiveLangMenu ? onChangeLangMenuStatus : null}>
            <div className="form">
                <form className="form__body" action="#">
                    <h1 className="form__title">Регистрaция</h1>
                    <div className="form__question">Уже есть аккаунт? <a href="#">Войти</a></div>
                    <div className="form__item">
                        <label className="form__label">
                            <span>Имя</span>
                            <input
                                onChange={e => name.onChange(e)}
                                onBlur={e => name.onBlur(e)}
                                value={name.value}
                                className="form__input"
                                name="name"
                                type="text"
                                placeholder="Введите Ваше имя"
                            />
                        </label>
                        {(name.isDirty && name.nameError) && <div className="form__error">{name.errorText}</div>}
                    </div>
                    <div className="form__item">
                        <label className="form__label">
                            <span>Email</span>
                            <input
                                onChange={e => email.onChange(e)}
                                onBlur={e => email.onBlur(e)}
                                value={email.value}
                                className="form__input"
                                name="email"
                                type="text"
                                placeholder="Введите ваш email"
                            />
                        </label>
                        {(email.isDirty && email.emailError) && <div className="form__error">{email.errorText}</div>}
                    </div>
                    <div className="form__item">
                        <label className="form__label">
                            <span>Номер телефона</span>
                            <InputMask
                                mask="+9(999)999-99-99"
                                value={phone.value}
                                className="form__input"
                                name="phone"
                                onChange={e => phone.onChange(e)}
                                onBlur={e => phone.onBlur(e)}
                                type="text"
                                placeholder="Введите номер телефона"
                            />
                        </label>
                        {(phone.isDirty && phone.phoneError) && <div className="form__error">{phone.errorText}</div>}
                    </div>
                    <div className='form__item'>
                        <div className="form__label">Язык</div>
                        <div className={classNames("menu", {active: isActiveLangMenu})}
                             onClick={onChangeLangMenuStatus}>
                            <div className="menu__label">{language}</div>
                            <div className="menu__arrow"></div>
                            <ul className="menu__list">
                                <li className="menu__item" onClick={e => onChooseLanguage(e)}>Русский</li>
                                <li className="menu__item" onClick={e => onChooseLanguage(e)}>Английский</li>
                                <li className="menu__item" onClick={e => onChooseLanguage(e)}>Китайский</li>
                                <li className="menu__item" onClick={e => onChooseLanguage(e)}>Испанский</li>
                            </ul>
                        </div>
                        {(isLangMenuDirty && language === "Язык") &&
                        <div className="form__error">Нужно выбрать язык</div>}
                    </div>
                    <div className='form__item'>
                        <div className="checkbox">
                            <label className="checkbox__label" onChange={onConfirmConditions}>
                                <input type="checkbox" name="agreement" className="checkbox__input"/>
                                <span className="checkbox__check"></span>
                                <span>Принимаю <a href="#">условия</a> использования</span>
                            </label>
                        </div>
                    </div>
                    <button disabled={!formValid} className="form__button" type="submit">Зарегистрироваться</button>
                </form>
            </div>
        </div>
    );
}

export default App;
