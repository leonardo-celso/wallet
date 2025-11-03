import { Button } from "@/src/components/button";
import { Container } from "@/src/components/container";
import { RootStackParamList } from "@/src/routes";
import { Content, ShapeBottom, ShapeTop, Text } from "@/src/styles/elements";
import { theme } from "@/src/theme/theme";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useEffect, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export function Home() {
  const [isAnimating, setIsAnimating] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  const shakeAnim = useSharedValue(0);
  const topOffset = useSharedValue(0);
  const bottomOffset = useSharedValue(0);
  const contentOpacity = useSharedValue(1);

  useEffect(() => {
    shakeAnim.value = withSequence(
      withTiming(10, { duration: 100 }),
      withTiming(-10, { duration: 100 }),
      withTiming(6, { duration: 80 }),
      withTiming(-6, { duration: 80 }),
      withTiming(0, { duration: 80 })
    );
  }, []);

  useFocusEffect(
    useCallback(() => {
      topOffset.value = withTiming(0, { duration: 400 });
      bottomOffset.value = withTiming(0, { duration: 400 });
      contentOpacity.value = withTiming(1, { duration: 300 });
      setIsAnimating(false);
    }, [])
  );

  const shapeTopStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: topOffset.value }],
  }));

  const shapeBottomStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bottomOffset.value }],
  }));

  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: shakeAnim.value }],
  }));

  const handleNavigateCards = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    contentOpacity.value = withTiming(0, { duration: 400 });
    topOffset.value = withTiming(150, {
      duration: 600,
      easing: Easing.inOut(Easing.ease),
    });
    bottomOffset.value = withTiming(-150, {
      duration: 600,
      easing: Easing.inOut(Easing.ease),
    });

    setTimeout(() => {
      setIsAnimating(false);
      navigation.navigate("Cards");
    }, 700);
  };

  return (
    <Container>
      <Animated.View style={[shapeTopStyle]}>
        <ShapeTop />
      </Animated.View>

      <Content
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Animated.View style={shakeStyle}>
          <Text
            style={{
              fontSize: theme.fontSizes.xxl,
              paddingVertical: 20,
              color: theme.colors.white,
            }}
          >
            Wallet Test
          </Text>
        </Animated.View>

        <Button label="meus cartões" onPress={handleNavigateCards} />
        <Button
          variant="secondary"
          label="cadastrar cartão"
          onPress={() => navigation.navigate("AddCard")}
        />
      </Content>
      <Animated.View style={[shapeBottomStyle]}>
        <ShapeBottom />
      </Animated.View>
    </Container>
  );
}
