import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Container } from "@/src/components/container";
import { Text } from "@/src/styles/elements";
import { theme } from "@/src/theme/theme";
import { useNavigation } from "@react-navigation/native";
import { useCards } from "@/src/context/cards";
import { CardItem } from "./components/card-item";
import { useSharedValue } from "react-native-reanimated";

export function CardsList() {
  const navigation = useNavigation();
  const { cards, get } = useCards();
  const selectedIndex = useSharedValue<number | null>(null);
  const [cardOrder, setCardOrder] = useState<number[]>([]);

  useEffect(() => {
    get();
  }, []);

  useEffect(() => {
    setCardOrder(cards.map((_, index) => index));
  }, [cards]);

  function moveCardToBack(fromIndex: number) {
    setCardOrder((prev) => {
      const reordered = prev.filter((i) => i !== fromIndex).concat(fromIndex);
      return reordered;
    });
    selectedIndex.value = null;
  }

  return (
    <Container
      title="Wallet Test"
      screenName="Meus cartões"
      backgroundColor={theme.colors.white}
      onAdd={() => navigation.navigate("AddCard" as never)}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {cardOrder?.length ? (
          cardOrder.map((cardIndex, visualIndex) => (
            <CardItem
              key={cardIndex}
              index={cardIndex}
              order={visualIndex}
              selectedIndex={selectedIndex}
              onCardReset={() => moveCardToBack(cardIndex)}
              data={cards[cardIndex]}
            />
          ))
        ) : (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: theme.fontSizes.sm, color: theme.colors.grey_dark }}>
              não há cartões adicionados
            </Text>
          </View>
        )}
      </ScrollView>
    </Container>
  );
}
