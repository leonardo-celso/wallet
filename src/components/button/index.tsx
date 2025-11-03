import { Btn, BtnText } from "./styles";
import { StyleProp, ViewStyle } from "react-native";

export type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  variant?: ButtonVariant;
  label: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Button({
  variant = "primary",
  label,
  onPress,
  disabled = false,
  style,
}: ButtonProps) {
  return (
    <Btn
      style={style}
      testID="save-button"
      variant={variant}
      onPress={() => (!disabled ? onPress() : {})}
      disabled={disabled}
    >
      <BtnText variant={variant} disabled={disabled}>
        {label}
      </BtnText>
    </Btn>
  );
}
