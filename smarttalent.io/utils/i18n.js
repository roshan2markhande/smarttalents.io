import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      login: "Login",
      register: "Register",
      email: "Email",
      password: "Password",
      confirm_password: "Confirm Password",
      forgot_password: "Forgot Password?",
      or_continue: "Or continue with",
      login_desc: "Login to your company dashboard",
      create_account_desc: "Register to start posting jobs",
      have_account: "Already have an account?",
      no_account: "Don't have an account?",
      password_mismatch: "Passwords do not match",
      generic_error: "Something went wrong. Try again.",
    },
  },
  hi: {
    translation: {
      login: "लॉग इन करें",
      register: "पंजीकरण करें",
      email: "ईमेल",
      password: "पासवर्ड",
      confirm_password: "पासवर्ड की पुष्टि करें",
      forgot_password: "पासवर्ड भूल गए?",
      or_continue: "या सोशल लॉगिन से जारी रखें",
      login_desc: "अपने डैशबोर्ड में लॉगिन करें",
      create_account_desc: "जॉब पोस्टिंग शुरू करने के लिए पंजीकरण करें",
      have_account: "क्या आपके पास खाता है?",
      no_account: "क्या आपके पास खाता नहीं है?",
      password_mismatch: "पासवर्ड मेल नहीं खा रहे हैं",
      generic_error: "कुछ गलत हो गया। फिर से प्रयास करें।",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
