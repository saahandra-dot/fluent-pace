import {
    useLocalSearchParams,
    useRouter,
} from 'expo-router';
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
import { ProficiencyLevel } from '../../types/learner';



type LevelOption = {
    code: ProficiencyLevel;
    title: string;
    description: string;
};

const levels: LevelOption[] = [
    {
        code: 'A1',
        title: 'I’m just starting',
        description:
            'I know a few words or phrases, but I cannot have a conversation yet.',
    },
    {
        code: 'A2',
        title: 'I know the basics',
        description:
            'I can understand and use simple language in familiar everyday situations.',
    },
    {
        code: 'B1',
        title: 'I can hold simple conversations',
        description:
            'I can talk about familiar topics, daily life, work, travel, and experiences.',
    },
    {
        code: 'B2',
        title: 'I can communicate comfortably',
        description:
            'I can have detailed conversations and understand most everyday speech.',
    },
    {
        code: 'C1',
        title: 'I’m already advanced',
        description:
            'I can express complex ideas and understand demanding conversations and texts.',
    },
];

export default function LevelScreen() {
    const colorScheme = useColorScheme();
    const router = useRouter();

    const {
        nativeLanguage,
        targetLanguage,
        region,
    } = useLocalSearchParams<{
        nativeLanguage?: string;
        targetLanguage?: string;
        region?: string;
    }>();

    const colors =
        colorScheme === 'dark'
            ? darkColors
            : lightColors;

    const styles = createStyles(colors);

    const [selectedLevel, setSelectedLevel] =
        useState<ProficiencyLevel | null>(null);

    function handleContinue() {
        if (!selectedLevel) {
            return;
        }

        router.push({
            pathname: '/onboarding/goals',
            params: {
                nativeLanguage,
                targetLanguage,
                region,
                currentLevel: selectedLevel,
            },
        });
    }

    return (
        <SafeAreaView style={styles.screen}>
            <StatusBar
                style={
                    colorScheme === 'dark'
                        ? 'light'
                        : 'dark'
                }
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
                    <Text style={styles.backButtonText}>
                        ‹ Back
                    </Text>
                </Pressable>

                <Text style={styles.stepText}>
                    STEP 3 OF 5
                </Text>

                <Text style={styles.title}>
                    How much {targetLanguage} do you know?
                </Text>

                <Text style={styles.subtitle}>
                    Choose the description that feels closest
                    to your current ability. You can change
                    this later.
                </Text>

                <View style={styles.languageSummary}>
                    <Text style={styles.languageSummaryLabel}>
                        YOU'RE LEARNING
                    </Text>

                    <Text style={styles.languageSummaryText}>
                        {targetLanguage}
                        {region &&
                            region !== 'General' &&
                            ` · ${region}`}
                    </Text>
                </View>

                <View style={styles.options}>
                    {levels.map((level) => {
                        const isSelected =
                            selectedLevel === level.code;

                        return (
                            <Pressable
                                key={level.code}
                                onPress={() =>
                                    setSelectedLevel(level.code)
                                }
                                accessibilityRole="button"
                                accessibilityState={{
                                    selected: isSelected,
                                }}
                                style={({ pressed }) => [
                                    styles.levelCard,

                                    isSelected &&
                                    styles.levelCardSelected,

                                    pressed &&
                                    styles.levelCardPressed,
                                ]}
                            >
                                <View
                                    style={[
                                        styles.levelBadge,

                                        isSelected &&
                                        styles.levelBadgeSelected,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.levelCode,

                                            isSelected &&
                                            styles.levelCodeSelected,
                                        ]}
                                    >
                                        {level.code}
                                    </Text>
                                </View>

                                <View style={styles.levelContent}>
                                    <Text
                                        style={[
                                            styles.levelTitle,

                                            isSelected &&
                                            styles.levelTitleSelected,
                                        ]}
                                    >
                                        {level.title}
                                    </Text>

                                    <Text
                                        style={styles.levelDescription}
                                    >
                                        {level.description}
                                    </Text>
                                </View>

                                <View
                                    style={[
                                        styles.radioOuter,

                                        isSelected &&
                                        styles.radioOuterSelected,
                                    ]}
                                >
                                    {isSelected && (
                                        <View style={styles.radioInner} />
                                    )}
                                </View>
                            </Pressable>
                        );
                    })}
                </View>

                <Text style={styles.helperText}>
                    This is only a starting estimate. The app
                    will adapt as it learns what you understand.
                </Text>

                <Pressable
                    disabled={!selectedLevel}
                    onPress={handleContinue}
                    style={({ pressed }) => [
                        styles.continueButton,

                        !selectedLevel &&
                        styles.continueButtonDisabled,

                        pressed &&
                        selectedLevel !== null &&
                        styles.continueButtonPressed,
                    ]}
                >
                    <Text
                        style={[
                            styles.continueButtonText,

                            !selectedLevel &&
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
        },

        languageSummary: {
            backgroundColor: colors.backgroundSoft,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: radius.lg,
            padding: spacing.md,
            marginTop: spacing.xl,
            marginBottom: spacing.lg,
        },

        languageSummaryLabel: {
            ...typography.caption,
            color: colors.textMuted,
            fontWeight: '700',
            letterSpacing: 0.7,
        },

        languageSummaryText: {
            ...typography.subheading,
            color: colors.textPrimary,
            marginTop: spacing.xs,
        },

        options: {
            gap: spacing.sm,
        },

        levelCard: {
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: radius.lg,
            padding: spacing.md,
            flexDirection: 'row',
            alignItems: 'center',
        },

        levelCardSelected: {
            backgroundColor: colors.surfaceGreen,
            borderColor: colors.primary,
        },

        levelCardPressed: {
            opacity: 0.8,
        },

        levelBadge: {
            width: 46,
            height: 46,
            borderRadius: radius.md,
            backgroundColor: colors.backgroundSoft,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: spacing.md,
        },

        levelBadgeSelected: {
            backgroundColor: colors.primary,
        },

        levelCode: {
            ...typography.bodyStrong,
            color: colors.primary,
        },

        levelCodeSelected: {
            color: colors.textOnPrimary,
        },

        levelContent: {
            flex: 1,
            paddingRight: spacing.sm,
        },

        levelTitle: {
            ...typography.bodyStrong,
            color: colors.textPrimary,
        },

        levelTitleSelected: {
            color: colors.primaryDark,
        },

        levelDescription: {
            ...typography.caption,
            color: colors.textSecondary,
            marginTop: spacing.xs,
        },

        radioOuter: {
            width: 22,
            height: 22,
            borderRadius: 11,
            borderWidth: 2,
            borderColor: colors.borderStrong,
            alignItems: 'center',
            justifyContent: 'center',
        },

        radioOuterSelected: {
            borderColor: colors.primary,
        },

        radioInner: {
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: colors.primary,
        },

        helperText: {
            ...typography.caption,
            color: colors.textMuted,
            marginTop: spacing.md,
            marginBottom: spacing.xl,
        },

        continueButton: {
            minHeight: 54,
            backgroundColor: colors.primary,
            borderRadius: radius.md,
            alignItems: 'center',
            justifyContent: 'center',
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