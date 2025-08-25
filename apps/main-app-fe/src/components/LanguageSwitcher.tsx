import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import { createLanguageURL } from "../utils/languageUtils";

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const languages = [
    { code: "vi", name: t("languages.vietnamese"), flag: "🇻🇳" },
    { code: "en", name: t("languages.english"), flag: "🇺🇸" },
  ];

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  const changeLanguage = (languageCode: string) => {
    // Change i18n language
    i18n.changeLanguage(languageCode);

    // Update URL with new language
    const newURL = createLanguageURL(
      languageCode,
      location.pathname + location.search
    );
    navigate(newURL, { replace: true });
  };

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200 shadow-sm">
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="text-sm font-medium text-gray-700 hidden sm:block">
          {currentLanguage.code.toUpperCase()}
        </span>
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </button>

      <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors flex items-center space-x-3 ${
              i18n.language === language.code
                ? "bg-pink-50 text-pink-600"
                : "text-gray-700"
            }`}
          >
            <span className="text-lg">{language.flag}</span>
            <span className="flex-1">{language.code.toUpperCase()}</span>
            {i18n.language === language.code && (
              <span className="ml-auto text-pink-600">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
