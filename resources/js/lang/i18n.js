import { createI18n } from 'vue-i18n';

import enCommon from '../lang/en/common.json';
import enNavigation from '../lang/en/navigation.json';
import enFooter from '../lang/en/footer.json';
import enHome from '../lang/en/home.json';
import enAbout from '../lang/en/about.json'
import enLanguageCode from '../lang/en/languageCode.json';
import enError from '../lang/en/error.json';
import enWarning from '../lang/en/warning.json';
import enAdmin from '../lang/en/admin.json';

import idCommon from '../lang/id/common.json';
import idNavigation from '../lang/id/navigation.json';
import idFooter from '../lang/id/footer.json';
import idHome from '../lang/id/home.json';
import idAbout from '../lang/id/about.json'
import idLanguageCode from '../lang/id/languageCode.json';
import idError from '../lang/id/error.json';
import idWarning from '../lang/id/warning.json';
import idAdmin from '../lang/id/admin.json';

const messages = {
    en: {
        common: enCommon,
        navigation: enNavigation,
        footer: enFooter,
        home: enHome,
        about: enAbout,
        languageCode: enLanguageCode,
        error: enError,
        warning: enWarning,
        admin: enAdmin,
    }, 
    id: {
        common: idCommon,
        navigation: idNavigation,
        footer: idFooter,
        home: idHome,
        about: idAbout,
        languageCode: idLanguageCode,
        error: idError,
        warning: idWarning,
        admin: idAdmin,
    }
};

const getDefaultLanguage = () => {
    // Periksa apakah ada bahasa yang disimpan di localStorage
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && messages[savedLanguage]) {
        return savedLanguage;
    }

    // Jika tidak ada, gunakan bahasa dari browser
    const userLang = navigator.language || navigator.userLanguage;
    const lang = userLang.split('-')[0];
    return messages[lang] ? lang : 'en';
};


const i18n = createI18n({
    legacy: false,
    locale: getDefaultLanguage(),
    fallbackLocale: 'en',
    messages,
});

export default i18n;
