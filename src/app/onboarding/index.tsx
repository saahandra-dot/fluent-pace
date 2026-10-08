import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
    darkColors,
    lightColors,
    radius,
    spacing,
    typography,
} from '../../constants/theme';

const languages = [
    'English',
    'Spanish',
    'French',
    'Portuguese',
    'German',
    'Italian',
    'Japanese',
    'Korean',
];

export default function LanguageSelectionScreen() {
    const colorScheme = useColorScheme();
    const router = useRouter();

    const colors =
        colorScheme === 'dark'
            ? darkColors
            : lightColors;

    const styles = createStyles(colors);

    const [nativeLanguage, setNativeLanguage] =
        useState<string | null>(null);

    const [targetLanguage, setTargetLanguage] =
        useState<string | null>(null);

    const canContinue =
        nativeLanguage !== null &&
        targetLanguage !== null &&
        nativeLanguage !== targetLanguage;

    function handleContinue() {
        if (!canContinue) {
            return;
        }

        router.push({
            pathname: '/onboarding/region',
            params: {
                nativeLanguage,
                targetLanguage,
            },
        });
    }

    return (
        <SafeAreaView style={styles.screen}>
            <StatusBar
                style={colorScheme === 'dark' ? 'light' : 'dark'}
            />

            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >
                <Pressable
                    onPress={() => router.back()}
                    style={styles.backButton}
                    hitSlop={10}
                >
                    <Text style={styles.backButtonText}>‹ Back</Text>
                </Pressable>

                <Text style={styles.stepText}>
                    STEP 1 OF 5
                </Text>

                <Text style={styles.title}>
                    Let's start with your languages.
                </Text>

                <Text style={styles.subtitle}>
                    Tell us what you already speak and what you want to learn.
                </Text>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        I speak
                    </Text>

                    <View style={styles.languageGrid}>
                        {languages.map((language) => {
                            const isSelected =
                                nativeLanguage === language;

                            const isDisabled =
                                targetLanguage === language;

                            return (
                                <Pressable
                                    key={`native-${language}`}
                                    disabled={isDisabled}
                                    onPress={() =>
                                        setNativeLanguage(language)
                                    }
                                    accessibilityRole="button"
                                    accessibilityState={{
                                        selected: isSelected,
                                        disabled: isDisabled,
                                    }}
                                    style={({ pressed }) => [
                                        styles.languageButton,

                                        isSelected &&
                                        styles.languageButtonSelected,

                                        isDisabled &&
                                        styles.languageButtonDisabled,

                                        pressed &&
                                        !isDisabled &&
                                        styles.languageButtonPressed,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.languageText,

                                            isSelected &&
                                            styles.languageTextSelected,

                                            isDisabled &&
                                            styles.languageTextDisabled,
                                        ]}
                                    >
                                        {language}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        I want to learn
                    </Text>

                    <View style={styles.languageGrid}>
                        {languages.map((language) => {
                            const isSelected =
                                targetLanguage === language;

                            const isDisabled =
                                nativeLanguage === language;

                            return (
                                <Pressable
                                    key={`target-${language}`}
                                    disabled={isDisabled}
                                    onPress={() =>
                                        setTargetLanguage(language)
                                    }
                                    accessibilityRole="button"
                                    accessibilityState={{
                                        selected: isSelected,
                                        disabled: isDisabled,
                                    }}
                                    style={({ pressed }) => [
                                        styles.languageButton,

                                        isSelected &&
                                        styles.languageButtonSelected,

                                        isDisabled &&
                                        styles.languageButtonDisabled,

                                        pressed &&
                                        !isDisabled &&
                                        styles.languageButtonPressed,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.languageText,

                                            isSelected &&
                                            styles.languageTextSelected,

                                            isDisabled &&
                                            styles.languageTextDisabled,
                                        ]}
                                    >
                                        {language}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </View>
                </View>

                <Pressable
                    disabled={!canContinue}
                    onPress={handleContinue}
                    style={({ pressed }) => [
                        styles.continueButton,

                        !canContinue &&
                        styles.continueButtonDisabled,

                        pressed &&
                        canContinue &&
                        styles.continueButtonPressed,
                    ]}
                >
                    <Text
                        style={[
                            styles.continueButtonText,

                            !canContinue &&
                            styles.continueButtonTextDisabled,
                        ]}
                    >
                        Continue
                    </Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}

const createStyles = (
    colors: typeof lightColors,
) =>
    StyleSheet.create({
        screen: {
            flex: 1,
            backgroundColor: colors.background,
        },

        container: {
            flexGrow: 1,
            paddingHorizontal: spacing.lg,
            paddingTop: spacing.sm,
            paddingBottom: spacing.xl,
        },

        backButton: {
            alignSelf: 'flex-start',
            paddingVertical: spacing.sm,
            marginBottom: spacing.lg,
        },

        backButtonText: {
            ...typography.body,
            color: colors.primary,
            fontWeight: '600',
        },

        stepText: {
            ...typography.caption,
            color: colors.primary,
            fontWeight: '700',
            letterSpacing: 0.8,
            marginBottom: spacing.sm,
        },

        title: {
            ...typography.heading,
            color: colors.textPrimary,
        },

        subtitle: {
            ...typography.body,
            color: colors.textSecondary,
            marginTop: spacing.sm,
            marginBottom: spacing.xl,
        },

        section: {
            marginBottom: spacing.xl,
        },

        sectionTitle: {
            ...typography.subheading,
            color: colors.textPrimary,
            marginBottom: spacing.md,
        },

        languageGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: spacing.sm,
        },

        languageButton: {
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: radius.xl,
            paddingHorizontal: spacing.md,
            paddingVertical: 12,
        },

        languageButtonSelected: {
            backgroundColor: colors.primary,
            borderColor: colors.primary,
        },

        languageButtonDisabled: {
            opacity: 0.35,
        },

        languageButtonPressed: {
            opacity: 0.75,
        },

        languageText: {
            ...typography.body,
            color: colors.textPrimary,
        },

        languageTextSelected: {
            color: colors.textOnPrimary,
            fontWeight: '600',
        },

        languageTextDisabled: {
            color: colors.textMuted,
        },

        continueButton: {
            backgroundColor: colors.primary,
            minHeight: 54,
            borderRadius: radius.md,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 'auto',
        },

        continueButtonDisabled: {
            backgroundColor: colors.backgroundMuted,
        },

        continueButtonPressed: {
            opacity: 0.85,
        },

        continueButtonText: {
            ...typography.bodyStrong,
            color: colors.textOnPrimary,
        },

        continueButtonTextDisabled: {
            color: colors.textMuted,
        },
    });