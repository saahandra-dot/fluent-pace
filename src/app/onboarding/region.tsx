import {
    useLocalSearchParams,
    useRouter,
} from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
    useEffect,
    useState,
} from 'react';
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

const regionOptions: Record<string, string[]> = {
    Spanish: [
        'Mexico',
        'Spain',
        'Colombia',
        'Argentina',
        'Latin America',
    ],

    English: [
        'United States',
        'United Kingdom',
        'Canada',
        'Australia',
    ],

    Portuguese: [
        'Brazil',
        'Portugal',
    ],

    French: [
        'France',
        'Canada',
    ],
};

export default function RegionScreen() {
    const colorScheme = useColorScheme();
    const router = useRouter();

    const {
        nativeLanguage,
        targetLanguage,
    } = useLocalSearchParams<{
        nativeLanguage?: string;
        targetLanguage?: string;
    }>();

    const colors =
        colorScheme === 'dark'
            ? darkColors
            : lightColors;

    const styles = createStyles(colors);

    const [selectedRegion, setSelectedRegion] =
        useState<string | null>(null);

    const availableRegions =
        targetLanguage
            ? regionOptions[targetLanguage] ?? []
            : [];

    const needsRegionSelection =
        availableRegions.length > 0;

    useEffect(() => {
        if (!targetLanguage) {
            return;
        }

        if (!needsRegionSelection) {
            router.replace({
                pathname: '/onboarding/level',
                params: {
                    nativeLanguage,
                    targetLanguage,
                    region: 'General',
                },
            });
        }
    }, [
        nativeLanguage,
        targetLanguage,
        needsRegionSelection,
        router,
    ]);

    function handleContinue() {
        if (!selectedRegion) {
            return;
        }

        router.push({
            pathname: '/onboarding/level',
            params: {
                nativeLanguage,
                targetLanguage,
                region: selectedRegion,
            },
        });
    }

    if (!needsRegionSelection) {
        return (
            <SafeAreaView style={styles.screen}>
                <StatusBar
                    style={
                        colorScheme === 'dark'
                            ? 'light'
                            : 'dark'
                    }
                />

                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>
                        Preparing your learning preferences...
                    </Text>
                </View>
            </SafeAreaView>
        );
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
                    STEP 2 OF 5
                </Text>

                <Text style={styles.title}>
                    Which variety would you like to learn?
                </Text>

                <Text style={styles.subtitle}>
                    We'll use this to make vocabulary,
                    expressions, and conversations sound
                    more natural for you.
                </Text>

                <View style={styles.languageSummary}>
                    <Text style={styles.languageSummaryLabel}>
                        LEARNING
                    </Text>

                    <Text style={styles.languageSummaryText}>
                        {targetLanguage}
                    </Text>
                </View>

                <View style={styles.options}>
                    {availableRegions.map((region) => {
                        const isSelected =
                            selectedRegion === region;

                        return (
                            <Pressable
                                key={region}
                                onPress={() =>
                                    setSelectedRegion(region)
                                }
                                accessibilityRole="button"
                                accessibilityState={{
                                    selected: isSelected,
                                }}
                                style={({ pressed }) => [
                                    styles.option,

                                    isSelected &&
                                    styles.optionSelected,

                                    pressed &&
                                    styles.optionPressed,
                                ]}
                            >
                                <View>
                                    <Text
                                        style={[
                                            styles.optionText,

                                            isSelected &&
                                            styles.optionTextSelected,
                                        ]}
                                    >
                                        {region}
                                    </Text>

                                    {isSelected && (
                                        <Text
                                            style={
                                                styles.selectedText
                                            }
                                        >
                                            Selected
                                        </Text>
                                    )}
                                </View>

                                <View
                                    style={[
                                        styles.radioOuter,

                                        isSelected &&
                                        styles.radioOuterSelected,
                                    ]}
                                >
                                    {isSelected && (
                                        <View
                                            style={
                                                styles.radioInner
                                            }
                                        />
                                    )}
                                </View>
                            </Pressable>
                        );
                    })}
                </View>

                <Text style={styles.helperText}>
                    You can still understand and practice
                    other regional varieties later.
                </Text>

                <Pressable
                    disabled={!selectedRegion}
                    onPress={handleContinue}
                    style={({ pressed }) => [
                        styles.continueButton,

                        !selectedRegion &&
                        styles.continueButtonDisabled,

                        pressed &&
                        selectedRegion !== null &&
                        styles.continueButtonPressed,
                    ]}
                >
                    <Text
                        style={[
                            styles.continueButtonText,

                            !selectedRegion &&
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
            borderRadius: radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
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

        option: {
            minHeight: 68,
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: radius.md,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.md,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },

        optionSelected: {
            backgroundColor: colors.surfaceGreen,
            borderColor: colors.primary,
        },

        optionPressed: {
            opacity: 0.8,
        },

        optionText: {
            ...typography.bodyStrong,
            color: colors.textPrimary,
        },

        optionTextSelected: {
            color: colors.primaryDark,
        },

        selectedText: {
            ...typography.caption,
            color: colors.primary,
            marginTop: spacing.xs,
        },

        radioOuter: {
            width: 22,
            height: 22,
            borderRadius: 11,
            borderWidth: 2,
            borderColor: colors.borderStrong,
            justifyContent: 'center',
            alignItems: 'center',
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

        loadingContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: spacing.lg,
        },

        loadingText: {
            ...typography.body,
            color: colors.textSecondary,
            textAlign: 'center',
        },
    });