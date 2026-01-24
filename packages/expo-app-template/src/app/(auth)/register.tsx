import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { AppText } from '../../components/AppText';
import { Button } from '../../components/Button';
import { Checkbox } from '../../components/Checkbox';
import { Input } from '../../components/Input';
import { useAuth } from '../../contexts/AuthContext';

const createRegisterSchema = (t: (key: string) => string) =>
  z
    .object({
      name: z.string().min(2, t('auth.register.errors.fullNameRequired')),
      email: z.string().email(t('auth.register.errors.emailInvalid')),
      password: z.string().min(6, t('auth.register.errors.passwordTooShort')),
      confirmPassword: z.string(),
      acceptedTerms: z.boolean().refine(value => value === true, {
        message: t('auth.register.errors.tosRequired'),
      }),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: t('auth.register.errors.passwordsDoNotMatch'),
      path: ['confirmPassword'],
    });

export default function RegisterScreen() {
  const { t } = useTranslation();
  const { signUp } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const registerSchema = createRegisterSchema(t);
  type RegisterFormData = z.infer<typeof registerSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptedTerms: false,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsSubmitting(true);
      await signUp(data.email, data.password, data.name);
    } catch (error: any) {
      console.error('Signup error:', error);
      Alert.alert('Signup Error', error?.message || JSON.stringify(error) || t('auth.register.errors.registerFailed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
      <ScrollView contentContainerClassName="flex-grow justify-center p-6 bg-white" keyboardShouldPersistTaps="handled">
        <View className="max-w-md w-full mx-auto">
          <AppText className="text-4xl font-bold text-center mb-2">{t('auth.register.title')}</AppText>
          <AppText className="text-base text-gray-600 text-center mb-8">{t('auth.register.subtitle')}</AppText>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={t('auth.register.fullName')}
                placeholder={t('auth.register.fullNamePlaceholder')}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.name?.message}
                autoCapitalize="words"
                autoComplete="name"
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={t('auth.register.email')}
                placeholder={t('auth.register.emailPlaceholder')}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.email?.message}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={t('auth.register.password')}
                placeholder={t('auth.register.passwordPlaceholder')}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.password?.message}
                secureTextEntry
                autoComplete="password-new"
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={t('auth.register.confirmPassword')}
                placeholder={t('auth.register.confirmPasswordPlaceholder')}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.confirmPassword?.message}
                secureTextEntry
                autoComplete="password-new"
              />
            )}
          />

          <Controller
            control={control}
            name="acceptedTerms"
            render={({ field: { onChange, value } }) => (
              <Checkbox
                checked={value}
                onPress={() => onChange(!value)}
                error={errors.acceptedTerms?.message}
                className="mb-2"
                label={
                  <View className="flex-row flex-wrap">
                    <AppText className="text-gray-900 text-base">I agree to the </AppText>
                    <Link href="/(auth)/terms" asChild>
                      <Pressable>
                        <AppText className="text-[#007AFF] font-semibold text-base underline">
                          {t('auth.register.termsOfService')}
                        </AppText>
                      </Pressable>
                    </Link>
                    <AppText className="text-gray-900 text-base"> and </AppText>
                    <Link href="/(auth)/privacy" asChild>
                      <Pressable>
                        <AppText className="text-[#007AFF] font-semibold text-base underline">
                          {t('auth.register.privacyPolicy')}
                        </AppText>
                      </Pressable>
                    </Link>
                  </View>
                }
              />
            )}
          />

          <Button
            title={isSubmitting ? t('auth.register.signingUp') : t('auth.register.signUpButton')}
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            theme="primary"
          />

          <View className="flex-row justify-center items-center mt-4">
            <AppText className="text-gray-600">{t('auth.register.haveAccount')} </AppText>
            <Link href="/(auth)/login" asChild>
              <Pressable>
                <AppText className="text-[#007AFF] font-semibold">{t('auth.register.signIn')}</AppText>
              </Pressable>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
