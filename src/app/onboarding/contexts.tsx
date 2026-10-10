import {
    useLocalSearchParams,
    useRouter,
} from 'expo-router';
import {
    useSQLiteContext,
} from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
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
import {
    LearnerProfile,
    LearningGoal,
    ProficiencyLevel,
} from '../../types/learner';

import {
    saveLearnerProfile,
} from '../../services/learnerProfileService';

const contextOptions = [
    'Grocery shopping',
    'Restaurants & cafés',
    'School pickup',
    'Work conversations',
    'Commuting & transport',
    'Deliveries',
    'Building security',
    'Healthcare & pharmacy',
    'Appointments & services',
    'Friends & small talk',
    'Home & family',
    'Exercise & hobbies',
    'Books & media',
    'Travel',
];

function parseStringArray(
    value: string | string[] | undefined,
): string[] {
    if (!value) {
        return [];
    }

    const stringValue =
        Array.isArray(value)
            ? value[0]
            : value;

    try {
        const parsed =
            JSON.parse(stringValue);

        return Array.isArray(parsed)
            ? parsed
            : [];
    } catch {
        return [];
    }
}

export default function ContextsScreen() {
    const colorScheme = useColorScheme();
    const router = useRouter();
    const db = useSQLiteContext();

    const {
        nativeLanguage,
        targetLanguage,
        region,
        currentLevel,
        goals,
    } = useLocalSearchParams<{
        nativeLanguage?: string;
        targetLanguage?: string;
        region?: string;
        currentLevel?: string;
        goals?: string | string[];
    }>();


    const colors =
        colorScheme === 'dark'
            ? darkColors
            : lightColors;

    const styles = createStyles(colors);

    const [selectedContexts, setSelectedContexts] =
        useState<string[]>([]);

    const [customContext, setCustomContext] =
        useState('');

    const [isSaving, setIsSaving] =
        useState(false);

    const [saveError, setSaveError] =
        useState<string | null>(null);

    function toggleContext(context: string) {
        setSelectedContexts((currentContexts) => {
            const isSelected =
                currentContexts.includes(context);

            if (isSelected) {
                return currentContexts.filter(
                    (item) => item !== context,
                );
            }

            return [...currentContexts, context];
        });
    }

    function handleAddCustomContext() {
        const cleanedContext =
            customContext.trim();

        if (!cleanedContext) {
            return;
        }

        const alreadyExists =
            selectedContexts.some(
                (context) =>
                    context.toLowerCase() ===
                    cleanedContext.toLowerCase(),
            );

        if (!alreadyExists) {
            setSelectedContexts(
                (currentContexts) => [
                    ...currentContexts,
                    cleanedContext,
                ],
            );
        }

        setCustomContext('');
    }

    async function handleContinue() {
        if (
            selectedContexts.length === 0 ||
            !nativeLanguage ||
            !targetLanguage ||
            !currentLevel
        ) {
            return;
        }

        setIsSaving(true);
        setSaveError(null);

        try {
            const parsedGoals =
                parseStringArray(goals);

            const learnerProfile: LearnerProfile = {
                nativeLanguage,

                targetLanguage,

                region:
                    region ?? 'General',

                currentLevel:
                    currentLevel as ProficiencyLevel,

                goals:
                    parsedGoals as LearningGoal[],

                contexts:
                    selectedContexts,
            };

            await saveLearnerProfile(
                db,
                learnerProfile,
            );

            router.replace(
                '/onboarding/complete',
            );
        } catch (error) {
            console.error(
                'Failed to save learner profile:',
                error,
            );

            setSaveError(
                'We could not save your profile. Please try again.',
            );
        } finally {
            setIsSaving(false);
        }
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
                contentContainerStyle={
                    styles.container
                }
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
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
                    STEP 5 OF 5
                </Text>

                <Text style={styles.title}>
                    Where do you need{' '}
                    {targetLanguage} in real life?
                </Text>

                <Text style={styles.subtitle}>
                    Choose situations you regularly
                    experience. These will help shape
                    your future lessons.
                </Text>

                <View style={styles.contextGrid}>
                    {contextOptions.map((context) => {
                        const isSelected =
                            selectedContexts.includes(
                                context,
                            );

                        return (
                            <Pressable
                                key={context}
                                onPress={() =>
                                    toggleContext(context)
                                }
                                accessibilityRole="checkbox"
                                accessibilityState={{
                                    checked: isSelected,
                                }}
                                style={({ pressed }) => [
                                    styles.contextChip,

                                    isSelected &&
                                    styles.contextChipSelected,

                                    pressed &&
                                    styles.contextChipPressed,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.contextText,

                                        isSelected &&
                                        styles.contextTextSelected,
                                    ]}
                                >
                                    {isSelected
                                        ? `✓ ${context}`
                                        : context}
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>

                <View style={styles.customSection}>
                    <Text style={styles.customTitle}>
                        Something more specific?
                    </Text>

                    <Text style={styles.customDescription}>
                        Add a situation you regularly
                        encounter.
                    </Text>

                    <View style={styles.inputRow}>
                        <TextInput
                            value={customContext}
                            onChangeText={
                                setCustomContext
                            }
                            onSubmitEditing={
                                handleAddCustomContext
                            }
                            placeholder="e.g. Talking to my child's teacher"
                            placeholderTextColor={
                                colors.textMuted
                            }
                            returnKeyType="done"
                            style={styles.input}
                        />

                        <Pressable
                            disabled={
                                customContext.trim().length ===
                                0
                            }
                            onPress={
                                handleAddCustomContext
                            }
                            style={({ pressed }) => [
                                styles.addButton,

                                customContext.trim().length ===
                                0 &&
                                styles.addButtonDisabled,

                                pressed &&
                                customContext.trim().length >
                                0 &&
                                styles.addButtonPressed,
                            ]}
                        >
                            <Text
                                style={styles.addButtonText}
                            >
                                Add
                            </Text>
                        </Pressable>
                    </View>
                </View>

                {selectedContexts.length > 0 && (
                    <View style={styles.selectedSection}>
                        <Text style={styles.selectedTitle}>
                            Your situations
                        </Text>

                        {selectedContexts.map(
                            (context) => (
                                <View
                                    key={context}
                                    style={
                                        styles.selectedContextRow
                                    }
                                >
                                    <Text
                                        style={
                                            styles.selectedContextText
                                        }
                                    >
                                        {context}
                                    </Text>

                                    <Pressable
                                        onPress={() =>
                                            toggleContext(context)
                                        }
                                        hitSlop={10}
                                    >
                                        <Text
                                            style={
                                                styles.removeText
                                            }
                                        >
                                            Remove
                                        </Text>
                                    </Pressable>
                                </View>
                            ),
                        )}
                    </View>
                )}

                <Text style={styles.selectionText}>
                    {selectedContexts.length === 0
                        ? 'Select at least one situation.'
                        : `${selectedContexts.length} ${selectedContexts.length === 1
                            ? 'situation'
                            : 'situations'
                        } selected`}
                </Text>

                {saveError && (
                    <Text style={styles.errorText}>
                        {saveError}
                    </Text>
                )}

                <Pressable
                    disabled={
                        selectedContexts.length === 0 || isSaving
                    }
                    onPress={handleContinue}
                    style={({ pressed }) => [
                        styles.continueButton,

                        selectedContexts.length === 0 &&
                        styles.continueButtonDisabled,

                        pressed &&
                        selectedContexts.length > 0 &&
                        styles.continueButtonPressed,
                    ]}
                >
                    <Text
                        style={[
                            styles.continueButtonText,

                            selectedContexts.length ===
                            0 &&
                            styles.continueButtonTextDisabled,
                        ]}
                    >
                        {isSaving ? 'Saving...' : 'Finish Setup'}
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

        contextGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: spacing.sm,
        },

        contextChip: {
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: radius.xl,
            paddingHorizontal: spacing.md,
            paddingVertical: 12,
        },

        contextChipSelected: {
            backgroundColor: colors.surfaceGreen,
            borderColor: colors.primary,
        },

        contextChipPressed: {
            opacity: 0.75,
        },

        contextText: {
            ...typography.body,
            color: colors.textPrimary,
        },

        contextTextSelected: {
            color: colors.primaryDark,
            fontWeight: '600',
        },

        customSection: {
            marginTop: spacing.xl,
        },

        customTitle: {
            ...typography.subheading,
            color: colors.textPrimary,
        },

        customDescription: {
            ...typography.body,
            color: colors.textSecondary,
            marginTop: spacing.xs,
        },

        inputRow: {
            flexDirection: 'row',
            gap: spacing.sm,
            marginTop: spacing.md,
        },

        input: {
            flex: 1,
            minHeight: 50,
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: radius.md,
            paddingHorizontal: spacing.md,
            color: colors.textPrimary,
            ...typography.body,
        },

        addButton: {
            minWidth: 68,
            minHeight: 50,
            backgroundColor: colors.primary,
            borderRadius: radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: spacing.md,
        },

        addButtonDisabled: {
            backgroundColor:
                colors.backgroundMuted,
        },

        addButtonPressed: {
            opacity: 0.85,
        },

        addButtonText: {
            ...typography.bodyStrong,
            color: colors.textOnPrimary,
        },

        selectedSection: {
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: radius.lg,
            padding: spacing.md,
            marginTop: spacing.xl,
        },

        selectedTitle: {
            ...typography.bodyStrong,
            color: colors.textPrimary,
            marginBottom: spacing.sm,
        },

        selectedContextRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: spacing.sm,
            borderBottomWidth:
                StyleSheet.hairlineWidth,
            borderBottomColor: colors.border,
            gap: spacing.md,
        },

        selectedContextText: {
            ...typography.body,
            color: colors.textPrimary,
            flex: 1,
        },

        removeText: {
            ...typography.caption,
            color: colors.error,
            fontWeight: '600',
        },

        selectionText: {
            ...typography.caption,
            color: colors.textMuted,
            marginTop: spacing.md,
            marginBottom: spacing.xl,
        },

        errorText: {
            ...typography.caption,
            color: colors.error,
            marginBottom: spacing.md,
            textAlign: 'center',
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
            backgroundColor:
                colors.backgroundMuted,
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