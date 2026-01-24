import React from 'react';
import { Pressable, View, ViewProps } from 'react-native';
import { cn } from '../utils/cn';
import { AppText } from './AppText';

type CheckboxProps = ViewProps & {
  checked: boolean;
  onPress?: () => void;
  label?: string | React.ReactNode;
  error?: string;
  disabled?: boolean;
};

export function Checkbox({ checked, onPress, label, error, disabled, className, ...rest }: CheckboxProps) {
  return (
    <View className={cn('mb-4', className)} {...rest}>
      <Pressable onPress={onPress} disabled={disabled} className="flex-row items-start">
        <View
          className={cn(
            'w-6 h-6 rounded border-2 mr-3 items-center justify-center flex-shrink-0',
            checked ? 'bg-[#007AFF] border-[#007AFF]' : 'bg-white border-gray-400',
            error && 'border-red-500',
            disabled && 'opacity-50',
          )}
        >
          {checked && <AppText className="text-white text-base font-bold">✓</AppText>}
        </View>
        {typeof label === 'string' ? (
          <AppText className={cn('flex-1 text-gray-900 text-base', disabled && 'opacity-50')}>{label}</AppText>
        ) : (
          <View className="flex-1">{label}</View>
        )}
      </Pressable>
      {error && <AppText className="text-red-500 text-sm mt-1 ml-9">{error}</AppText>}
    </View>
  );
}
