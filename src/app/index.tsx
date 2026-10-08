import { useRouter } from 'expo-router';
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
  radius,
  spacing,
  typography,
} from '../constants/theme';

export default function WelcomeScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const colors =
    colorScheme === 'dark'
      ? darkColors
      : lightColors;

  const styles = createStyles(colors);

  function handleGetStarted() {
    router.push('/onboarding');
  }

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar
        style={colorScheme === 'dark' ? 'light' : 'dark'}
      />

      <View style={styles.container}>
        <View style={styles.topSection}>
          <View style={styles.brandBadge}>
            <Text style={styles.brandText}>
              LANGUAGE, MADE PERSONAL
            </Text>
          </View>

          <Text style={styles.title}>
            Learn what you'll actually say.
          </Text>

          <Text style={styles.subtitle}>
            Personalized lessons, conversations, and stories built
            around your everyday life.
          </Text>
        </View>

        <View style={styles.exampleSection}>
          <View style={styles.exampleCard}>
            <Text style={styles.exampleLabel}>
              YOUR REAL LIFE
            </Text>

            <Text style={styles.exampleSource}>
              “I'm here to pick up my daughter.”
            </Text>
          </View>

          <View style={styles.lessonCard}>
            <Text style={styles.lessonLabel}>
              YOUR LESSON
            </Text>

            <Text style={styles.lessonTarget}>
              Vengo a recoger a mi hija.
            </Text>

            <Text style={styles.lessonHint}>
              Spanish · Everyday conversation
            </Text>
          </View>
        </View>

        <View style={styles.bottomSection}>
          <Text style={styles.bottomText}>
            Your lessons become more useful as the app learns what
            matters to you.
          </Text>

          <Pressable
            onPress={handleGetStarted}
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.primaryButtonPressed,
            ]}
          >
            <Text style={styles.primaryButtonText}>
              Get Started
            </Text>
          </Pressable>

          <Text style={styles.timeText}>
            Setup takes about 2 minutes
          </Text>
        </View>
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
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.lg,
      paddingBottom: spacing.md,
    },

    topSection: {
      marginTop: spacing.lg,
    },

    brandBadge: {
      alignSelf: 'flex-start',
      backgroundColor: colors.backgroundMuted,
      borderRadius: radius.xl,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      marginBottom: spacing.lg,
    },

    brandText: {
      ...typography.caption,
      color: colors.primaryDark,
      fontWeight: '700',
      letterSpacing: 0.8,
    },

    title: {
      ...typography.title,
      color: colors.textPrimary,
      maxWidth: 330,
    },

    subtitle: {
      ...typography.body,
      color: colors.textSecondary,
      marginTop: spacing.md,
      maxWidth: 350,
    },

    exampleSection: {
      flex: 1,
      justifyContent: 'center',
      gap: spacing.md,
    },

    exampleCard: {
      backgroundColor: colors.backgroundSoft,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      padding: spacing.lg,
      marginRight: spacing.xl,
    },

    exampleLabel: {
      ...typography.caption,
      color: colors.textMuted,
      fontWeight: '700',
      letterSpacing: 0.7,
      marginBottom: spacing.sm,
    },

    exampleSource: {
      ...typography.subheading,
      color: colors.textPrimary,
    },

    lessonCard: {
      backgroundColor: colors.surfaceGreen,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: colors.borderStrong,
      padding: spacing.lg,
      marginLeft: spacing.xl,
    },

    lessonLabel: {
      ...typography.caption,
      color: colors.primary,
      fontWeight: '700',
      letterSpacing: 0.7,
      marginBottom: spacing.sm,
    },

    lessonTarget: {
      ...typography.heading,
      color: colors.textPrimary,
    },

    lessonHint: {
      ...typography.caption,
      color: colors.textSecondary,
      marginTop: spacing.sm,
    },

    bottomSection: {
      paddingTop: spacing.md,
    },

    bottomText: {
      ...typography.body,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: spacing.lg,
    },

    primaryButton: {
      backgroundColor: colors.primary,
      minHeight: 54,
      borderRadius: radius.md,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: spacing.lg,
    },

    primaryButtonPressed: {
      opacity: 0.85,
    },

    primaryButtonText: {
      ...typography.bodyStrong,
      color: colors.textOnPrimary,
    },

    timeText: {
      ...typography.caption,
      color: colors.textMuted,
      textAlign: 'center',
      marginTop: spacing.md,
    },
  });