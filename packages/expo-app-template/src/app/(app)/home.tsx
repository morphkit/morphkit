import React from 'react';
import { ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppText } from '../../components/AppText';
import { Button } from '../../components/Button';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';
import { useAuth } from '../../contexts/AuthContext';

export default function HomeScreen() {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Get user metadata from Supabase
  const fullName = user?.user_metadata?.full_name;

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6">
        <View className="mb-8 mt-12">
          <AppText className="text-4xl font-bold text-gray-900 mb-2">{t('home.welcomeBack')}</AppText>
          <AppText className="text-lg text-gray-600">
            {fullName || user?.email?.split('@')[0] || t('common.user')}
          </AppText>
        </View>

        <View className="mb-6">
          <LanguageSwitcher />
        </View>

        <View className="bg-blue-50 rounded-xl p-6 mb-6 border border-blue-100">
          <AppText className="text-sm font-semibold text-blue-900 mb-2">{t('home.accountInfo')}</AppText>
          <View className="space-y-2">
            <View className="flex-row">
              <AppText className="text-gray-600 font-medium w-20">{t('home.name')}</AppText>
              <AppText className="text-gray-900 flex-1">{fullName || t('home.notAvailable')}</AppText>
            </View>
            <View className="flex-row">
              <AppText className="text-gray-600 font-medium w-20">{t('home.email')}</AppText>
              <AppText className="text-gray-900 flex-1">{user?.email || t('home.notAvailable')}</AppText>
            </View>
          </View>
        </View>

        <View className="bg-gray-50 rounded-xl p-6 mb-6">
          <AppText className="text-xl font-bold text-gray-900 mb-2">{t('home.gettingStarted')}</AppText>
          <AppText className="text-gray-600 leading-6">{t('home.description')}</AppText>
          <View className="mt-4 space-y-2">
            <View className="flex-row items-start">
              <AppText className="text-blue-600 mr-2">•</AppText>
              <AppText className="text-gray-700 flex-1">{t('home.features.auth')}</AppText>
            </View>
            <View className="flex-row items-start">
              <AppText className="text-blue-600 mr-2">•</AppText>
              <AppText className="text-gray-700 flex-1">{t('home.features.routing')}</AppText>
            </View>
            <View className="flex-row items-start">
              <AppText className="text-blue-600 mr-2">•</AppText>
              <AppText className="text-gray-700 flex-1">{t('home.features.validation')}</AppText>
            </View>
            <View className="flex-row items-start">
              <AppText className="text-blue-600 mr-2">•</AppText>
              <AppText className="text-gray-700 flex-1">{t('home.features.styling')}</AppText>
            </View>
            <View className="flex-row items-start">
              <AppText className="text-blue-600 mr-2">•</AppText>
              <AppText className="text-gray-700 flex-1">{t('home.features.navigation')}</AppText>
            </View>
          </View>
        </View>

        <Button title={t('home.signOutButton')} onPress={handleSignOut} theme="secondary" />
      </View>
    </ScrollView>
  );
}
