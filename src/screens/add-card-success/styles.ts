import { StyleSheet } from "react-native";
import { theme } from "@/src/theme/theme";

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: theme.spacing.lg,
  },
  title: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.xl,
    fontFamily: theme.fonts.bold,
    marginBottom: theme.spacing.sm,
    textAlign: "center",
  },
  subtitle: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.sm,
    fontFamily: theme.fonts.regular,
    marginBottom: theme.spacing.xl,
    textAlign: "center",
  },
  cardBox: {
    backgroundColor: theme.colors.black,
    width: "100%",
    borderRadius: 16,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  cardTitle: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.md,
    fontFamily: theme.fonts.bold,
    marginBottom: theme.spacing.sm,
  },
  cardText: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.sm,
    fontFamily: theme.fonts.regular,
    marginBottom: theme.spacing.xs,
  },
});
