import { useTranslation } from 'react-i18next';
import { Flex, Button } from '@morphkit/react-native';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <Flex direction="horizontal" gap="sm">
      {LANGUAGES.map(language => (
        <Button
          key={language.code}
          variant={i18n.language === language.code ? 'primary' : 'secondary'}
          size="sm"
          onPress={() => handleLanguageChange(language.code)}
        >
          {language.label}
        </Button>
      ))}
    </Flex>
  );
}
