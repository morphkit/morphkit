import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { AppText } from '../../components/AppText';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../../contexts/AuthContext';

const createLoginSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().email(t('auth.login.errors.emailInvalid')),
    password: z.string().min(6, t('auth.login.errors.passwordTooShort')),
  });

export default function LoginScreen() {
  const { t } = useTranslation();
  const { signIn } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loginSchema = createLoginSchema(t);
  type LoginFormData = z.infer<typeof loginSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsSubmitting(true);
      await signIn(data.email, data.password);
    } catch (error: any) {
      console.error('Login error:', error);
      Alert.alert('Login Error', error?.message || JSON.stringify(error) || t('auth.login.errors.loginFailed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
      <ScrollView contentContainerClassName="flex-grow justify-center p-6 bg-white" keyboardShouldPersistTaps="handled">
        <View className="max-w-md w-full mx-auto">
          <AppText className="text-4xl font-bold text-center mb-2">{t('auth.login.title')}</AppText>
          <AppText className="text-base text-gray-600 text-center mb-8">{t('auth.login.subtitle')}</AppText>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={t('auth.login.email')}
                placeholder={t('auth.login.emailPlaceholder')}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.email?.message}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
                containerClassName="mb-6"
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={t('auth.login.password')}
                placeholder={t('auth.login.passwordPlaceholder')}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.password?.message}
                secureTextEntry
                autoComplete="password"
                containerClassName="mb-6"
              />
            )}
          />

          <Button
            title={isSubmitting ? t('auth.login.signingIn') : t('auth.login.signInButton')}
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            theme="primary"
          />

          <View className="flex-row justify-center items-center mt-4">
            <AppText className="text-gray-600">{t('auth.login.noAccount')} </AppText>
            <Link href="/(auth)/register" asChild>
              <Pressable>
                <AppText className="text-[#007AFF] font-semibold">{t('auth.login.signUp')}</AppText>
              </Pressable>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
