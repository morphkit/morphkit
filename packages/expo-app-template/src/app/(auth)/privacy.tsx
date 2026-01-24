import { Link } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppText } from '../../components/AppText';

export default function PrivacyPolicyScreen() {
  const { t } = useTranslation();

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6">
        <AppText className="text-3xl font-bold mb-6">{t('legal.privacyPolicy.title')}</AppText>
        <AppText className="text-sm text-gray-500 mb-8">{t('legal.privacyPolicy.lastUpdated')}</AppText>

        <AppText className="text-xl font-semibold mb-3">
          {t('legal.privacyPolicy.sections.informationCollection.title')}
        </AppText>
        <AppText className="text-base text-gray-700 mb-6 leading-6">
          {t('legal.privacyPolicy.sections.informationCollection.content')}
        </AppText>

        <AppText className="text-xl font-semibold mb-3">
          {t('legal.privacyPolicy.sections.useOfInformation.title')}
        </AppText>
        <AppText className="text-base text-gray-700 mb-6 leading-6">
          {t('legal.privacyPolicy.sections.useOfInformation.content')}
        </AppText>

        <AppText className="text-xl font-semibold mb-3">{t('legal.privacyPolicy.sections.dataSecurity.title')}</AppText>
        <AppText className="text-base text-gray-700 mb-6 leading-6">
          {t('legal.privacyPolicy.sections.dataSecurity.content')}
        </AppText>

        <AppText className="text-xl font-semibold mb-3">{t('legal.privacyPolicy.sections.dataSharing.title')}</AppText>
        <AppText className="text-base text-gray-700 mb-6 leading-6">
          {t('legal.privacyPolicy.sections.dataSharing.content')}
        </AppText>

        <AppText className="text-xl font-semibold mb-3">{t('legal.privacyPolicy.sections.cookies.title')}</AppText>
        <AppText className="text-base text-gray-700 mb-6 leading-6">
          {t('legal.privacyPolicy.sections.cookies.content')}
        </AppText>

        <AppText className="text-xl font-semibold mb-3">{t('legal.privacyPolicy.sections.yourRights.title')}</AppText>
        <AppText className="text-base text-gray-700 mb-6 leading-6">
          {t('legal.privacyPolicy.sections.yourRights.content')}
        </AppText>

        <AppText className="text-xl font-semibold mb-3">{t('legal.privacyPolicy.sections.children.title')}</AppText>
        <AppText className="text-base text-gray-700 mb-6 leading-6">
          {t('legal.privacyPolicy.sections.children.content')}
        </AppText>

        <AppText className="text-xl font-semibold mb-3">{t('legal.privacyPolicy.sections.changes.title')}</AppText>
        <AppText className="text-base text-gray-700 mb-6 leading-6">
          {t('legal.privacyPolicy.sections.changes.content')}
        </AppText>

        <AppText className="text-xl font-semibold mb-3">{t('legal.privacyPolicy.sections.contact.title')}</AppText>
        <AppText className="text-base text-gray-700 mb-8 leading-6">
          {t('legal.privacyPolicy.sections.contact.content')}
        </AppText>

        <Link href="/(auth)/register" asChild>
          <Pressable className="bg-[#007AFF] rounded-md px-5 py-3 mb-4">
            <AppText className="text-white font-semibold text-center text-lg">
              {t('legal.privacyPolicy.backButton')}
            </AppText>
          </Pressable>
        </Link>
      </View>
    </ScrollView>
  );
}
