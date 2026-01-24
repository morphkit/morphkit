import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import '../../global.css';
import { AuthProvider } from '../contexts/AuthContext';
import '../i18n';

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="auto" />
      <Slot />
    </AuthProvider>
  );
}
