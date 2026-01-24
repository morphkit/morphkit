import React, { useState } from 'react';
import { Platform, TextInput, TextInputProps, View } from 'react-native';
import { cn } from '../utils/cn';
import { AppText } from './AppText';

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
  containerClassName?: string;
};

export const Input = React.forwardRef<TextInput, InputProps>(
  ({ label, error, containerClassName, className, onFocus, onBlur, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (e: any) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: any) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    return (
      <View className={cn('mb-4', containerClassName)}>
        {label && <AppText className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">{label}</AppText>}
        <TextInput
          ref={ref}
          className={cn(
            // Base styles
            'rounded-lg text-base bg-white dark:bg-gray-800',
            // Border styles with focus and error states
            'border',
            error
              ? 'border-red-500 dark:border-red-400'
              : isFocused
                ? 'border-blue-500 dark:border-blue-400'
                : 'border-gray-300 dark:border-gray-600',
            // Text color
            'text-gray-900 dark:text-gray-100',
            // Additional custom classes
            className,
          )}
          style={{
            // Fix for RN 0.78+ padding bug and iOS text alignment issues
            paddingHorizontal: 16,
            paddingTop: Platform.OS === 'ios' ? 14 : 12,
            paddingBottom: Platform.OS === 'ios' ? 14 : 12,
            // Match line height to font size for proper vertical alignment
            fontSize: 16,
            lineHeight: Platform.OS === 'ios' ? 20 : 22,
          }}
          placeholderTextColor="#9CA3AF"
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {error && <AppText className="text-red-500 dark:text-red-400 text-sm mt-1.5">{error}</AppText>}
      </View>
    );
  },
);

Input.displayName = 'Input';
