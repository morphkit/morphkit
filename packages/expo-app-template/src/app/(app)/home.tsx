import { useTranslation } from 'react-i18next';
import { Container, Flex, Typography } from '@morphkit/react-native';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';

export default function HomeScreen() {
  const { t } = useTranslation();

  return (
    <Container insets={['top', 'bottom']}>
      <Flex direction="vertical" align="center" justify="center" style={{ flex: 1 }}>
        <Typography variant="large-title">{t('home.title')}</Typography>
        <Typography variant="body">{t('home.subtitle')}</Typography>
        <LanguageSwitcher />
      </Flex>
    </Container>
  );
}
