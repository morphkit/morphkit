import { Link } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppText } from '../../components/AppText';

export default function TermsOfServiceScreen() {
  const { t } = useTranslation();

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6">
        <AppText className="text-3xl font-bold mb-6">{t('legal.termsOfService.title')}</AppText>
        <AppText className="text-sm text-gray-500 mb-8">{t('legal.termsOfService.lastUpdated')}</AppText>

        <AppText className="text-xl font-semibold mb-3">{t('legal.termsOfService.sections.acceptance.title')}</AppText>
        <AppText className="text-base text-gray-700 mb-6 leading-6">
          {t('legal.termsOfService.sections.acceptance.content')}
        </AppText>

        <AppText className="text-xl font-semibold mb-3">
          {t('legal.termsOfService.sections.useOfService.title')}
        </AppText>
        <AppText className="text-base text-gray-700 mb-6 leading-6">
          {t('legal.termsOfService.sections.useOfService.content')}
        </AppText>

        <AppText className="text-xl font-semibold mb-3">
          {t('legal.termsOfService.sections.userAccounts.title')}
        </AppText>
        <AppText className="text-base text-gray-700 mb-6 leading-6">
          {t('legal.termsOfService.sections.userAccounts.content')}
        </AppText>

        <AppText className="text-xl font-semibold mb-3">{t('legal.termsOfService.sections.termination.title')}</AppText>
        <AppText className="text-base text-gray-700 mb-6 leading-6">
          {t('legal.termsOfService.sections.termination.content')}
        </AppText>

        <AppText className="text-xl font-semibold mb-3">
          {t('legal.termsOfService.sections.limitationOfLiability.title')}
        </AppText>
        <AppText className="text-base text-gray-700 mb-6 leading-6">
          {t('legal.termsOfService.sections.limitationOfLiability.content')}
        </AppText>

        <AppText className="text-xl font-semibold mb-3">{t('legal.termsOfService.sections.changes.title')}</AppText>
        <AppText className="text-base text-gray-700 mb-6 leading-6">
          {t('legal.termsOfService.sections.changes.content')}
        </AppText>

        <AppText className="text-xl font-semibold mb-3">{t('legal.termsOfService.sections.contact.title')}</AppText>
        <AppText className="text-base text-gray-700 mb-8 leading-6">
          {t('legal.termsOfService.sections.contact.content')}
        </AppText>

        <Link href="/(auth)/register" asChild>
          <Pressable className="bg-[#007AFF] rounded-md px-5 py-3 mb-4">
            <AppText className="text-white font-semibold text-center text-lg">
              {t('legal.termsOfService.backButton')}
            </AppText>
          </Pressable>
        </Link>
      </View>
    </ScrollView>
  );
}
