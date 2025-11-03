import { StyleSheet } from "react-native";
import { theme } from "@/src/theme/theme";

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    marginTop: -20
  },
  title: {
    fontSize: theme.fontSizes.xl,
    color: theme.colors.white,
    textAlign: "center",
    marginBottom: theme.spacing.xl,
  },
  label: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.sm,
    marginBottom: theme.spacing.xs,
    marginTop: theme.spacing.sm,
  },
  input: {
    backgroundColor: theme.colors.white,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    color: theme.colors.black,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: theme.spacing.md,
  },

});
