import { StyleSheet } from "react-native";
import { theme } from "@/src/theme/theme";

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  cardAnimated: {
    position: "absolute",
    width: "90%",
    alignSelf: "center",
  },
  card: {
    borderRadius: 16,
    height: 180,
    padding: theme.spacing.lg,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 6,
  },
  cardTitle: {
    fontSize: theme.fontSizes.md,
    fontFamily: theme.fonts.bold,
  },
  cardText: {
    fontSize: theme.fontSizes.sm,
    fontFamily: theme.fonts.regular,
    marginTop: 4,
  },
});
