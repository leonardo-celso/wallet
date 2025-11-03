import React from "react";
import { View } from "react-native";
import { Container } from "@/src/components/container";
import { Button } from "@/src/components/button";
import { ShapeTop, ShapeBottom, Text, Content } from "@/src/styles/elements";
import { styles } from "./styles";
import { theme } from "@/src/theme/theme";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";

type RouteParams = {
  Success: {
    card: any;
  };
};

export function AddCardSuccess() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RouteParams, "Success">>();
  const { card } = route.params; // 👈 vem do context.save()

  const handleNext = () => {
    navigation.navigate("Home" as never);
  };

  const maskCardNumber = (num: string) => num.replace(/\d(?=\d{4})/g, "•");

  return (
    <Container>
      <ShapeTop />
      <Content style={styles.content}>
        <Text style={styles.title}>Wallet Test</Text>
        <Text style={styles.subtitle}>cartão cadastrado com sucesso</Text>

        <View style={styles.cardBox}>
          <Text style={styles.cardTitle}>{card?.type || "Green Card"}</Text>
          <Text style={styles.cardText}>{card?.name}</Text>
          <Text style={styles.cardText}>{maskCardNumber(card?.number)}</Text>
          <Text style={styles.cardText}>CVV {card?.cvv}</Text>
        </View>

        <Button
          label="avançar"
          onPress={handleNext}
          style={{ marginTop: theme.spacing.xl }}
        />
      </Content>
      <ShapeBottom />
    </Container>
  );
}
