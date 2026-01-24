import React from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import { AppText } from './AppText';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
  ];

  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <View className="flex-row gap-2">
      {languages.map(lang => (
        <Pressable
          key={lang.code}
          onPress={() => changeLanguage(lang.code)}
          className={`px-4 py-2 rounded-lg ${i18n.language === lang.code ? 'bg-blue-500' : 'bg-gray-200'}`}
        >
          <AppText className={`font-medium ${i18n.language === lang.code ? 'text-white' : 'text-gray-700'}`}>
            {lang.label}
          </AppText>
        </Pressable>
      ))}
    </View>
  );
}
