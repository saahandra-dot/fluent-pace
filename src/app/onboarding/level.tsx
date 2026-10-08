import {
    useLocalSearchParams,
    useRouter,
} from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
    Pressable,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
    darkColors,
    lightColors,
    spacing,
    typography,
} from '../../constants/theme';

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

    return (
        <SafeAreaView style={styles.screen}>
            <StatusBar
                style={
                    colorScheme === 'dark'
                        ? 'light'
                        : 'dark'
                }
            />

            <View style={styles.container}>
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
                    Language preferences complete.
                </Text>

                <View style={styles.summary}>
                    <Text style={styles.label}>
                        I SPEAK
                    </Text>

                    <Text style={styles.value}>
                        {nativeLanguage}
                    </Text>

                    <Text style={styles.label}>
                        I'M LEARNING
                    </Text>

                    <Text style={styles.value}>
                        {targetLanguage}
                    </Text>

                    <Text style={styles.label}>
                        REGIONAL PREFERENCE
                    </Text>

                    <Text style={styles.value}>
                        {region}
                    </Text>
                </View>

                <Text style={styles.nextText}>
                    We'll choose your current proficiency
                    level in Step 7.
                </Text>
            </View>
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
            flex: 1,
            padding: spacing.lg,
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

        summary: {
            backgroundColor: colors.surface,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: colors.border,
            padding: spacing.lg,
            marginTop: spacing.xl,
            gap: spacing.xs,
        },

        label: {
            ...typography.caption,
            color: colors.textMuted,
            fontWeight: '700',
            letterSpacing: 0.7,
            marginTop: spacing.md,
        },

        value: {
            ...typography.subheading,
            color: colors.textPrimary,
        },

        nextText: {
            ...typography.body,
            color: colors.textSecondary,
            marginTop: spacing.lg,
        },
    });