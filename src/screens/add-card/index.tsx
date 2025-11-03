import React, { useState } from "react";
import {
  TextInput,
  View,
  Text,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { Button } from "@/src/components/button";
import { Container } from "@/src/components/container";
import { ShapeTop, ShapeBottom, Content } from "@/src/styles/elements";
import { theme } from "@/src/theme/theme";
import { styles } from "./styles";
import { useCards } from "@/src/context/cards";
import { CardScannerModal } from "@/src/components/cardScannerModal";
import { Ionicons } from "@expo/vector-icons"; // ícone da câmera

export function AddCard() {
  const { save, checkCardType } = useCards();

  const [cardNumber, setCardNumber] = useState("");
  const [holderName, setHolderName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({
    cardNumber: "",
    holderName: "",
    expiry: "",
    cvv: "",
  });
  const [scannerVisible, setScannerVisible] = useState(false);

  const handleCardNumberChange = (text: string) => {
    const cleaned = text.replace(/\D/g, "").slice(0, 16);
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(formatted);

    if (cleaned.length === 16) {
      Keyboard.dismiss();
    }
  };

  const handleExpiryChange = (text: string) => {
    const cleaned = text.replace(/\D/g, "").slice(0, 4);
    const formatted = cleaned.replace(/(\d{2})(?=\d{1,2})/, "$1/");
    setExpiry(formatted);

    if (formatted.length === 5) {
      Keyboard.dismiss();
    }
  };

  const handleCvvChange = (text: string) => {
    const cleaned = text.replace(/\D/g, "").slice(0, 3);
    setCvv(cleaned);

    if (cleaned.length === 3) {
      Keyboard.dismiss();
    }
  };

  const validateFields = () => {
    const newErrors = {
      cardNumber: "",
      holderName: "",
      expiry: "",
      cvv: "",
    };

    if (cardNumber.replace(/\s/g, "").length !== 16)
      newErrors.cardNumber = "Número de cartão inválido.";

    if (holderName.trim().length < 3)
      newErrors.holderName = "Informe o nome completo.";

    if (!/^\d{2}\/\d{2}$/.test(expiry))
      newErrors.expiry = "Data inválida (formato MM/AA).";

    if (cvv.length !== 3) newErrors.cvv = "Código deve ter 3 dígitos.";

    setErrors(newErrors);

    return Object.values(newErrors).every((e) => e === "");
  };

  async function handleNext() {
    if (!validateFields()) return;

    const type = await checkCardType(cardNumber);

    const newCard = {
      id: String(Date.now()),
      name: holderName,
      number: cardNumber,
      cvv,
      type,
      expiry,
    };

    await save(newCard);
  }

  const handlePhotoTaken = (photoUri: string) => {
    console.log("Foto capturada:", photoUri);
  };

  return (
    <Container title="cadastro">
      <ShapeTop />
      <Content style={styles.content}>
        <Text style={styles.title}>Wallet Test</Text>

        <View style={{ width: "100%" }}>
          <Text style={styles.label}>número do cartão</Text>
          <View style={{ position: "relative" }}>
            <TextInput
              style={styles.input}
              placeholder="0000 0000 0000 0000"
              placeholderTextColor={theme.colors.grey}
              keyboardType="number-pad"
              value={cardNumber}
              onChangeText={handleCardNumberChange}
            />
            <TouchableOpacity
              onPress={() => setScannerVisible(true)}
              style={{ position: "absolute", right: 15, top: 10 }}
            >
              <Ionicons
                name="camera-outline"
                size={25}
                color={theme.colors.grey_dark}
              />
            </TouchableOpacity>
          </View>
          {errors.cardNumber ? (
            <Text style={{ color: "red", fontSize: 12 }}>
              {errors.cardNumber}
            </Text>
          ) : null}

          <Text style={[styles.label, { marginTop: 20 }]}>
            nome do titular do cartão
          </Text>
          <TextInput
            style={[
              styles.input,
              errors.holderName && {
                borderColor: theme.colors.green_light,
                backgroundColor: "#ffdddd",
              },
            ]}
            placeholder="João da Silva"
            placeholderTextColor={theme.colors.grey}
            value={holderName}
            onChangeText={setHolderName}
          />
          {errors.holderName ? (
            <Text style={{ color: "red", fontSize: 12 }}>
              {errors.holderName}
            </Text>
          ) : null}

          <View style={[styles.row, { marginTop: 20 }]}>
            <View style={{ flex: 1, marginRight: theme.spacing.sm }}>
              <Text style={styles.label}>vencimento</Text>
              <TextInput
                style={[
                  styles.input,
                  errors.expiry && {
                    borderColor: theme.colors.green_light,
                    backgroundColor: "#ffdddd",
                  },
                ]}
                placeholder="00/00"
                placeholderTextColor={theme.colors.grey}
                keyboardType="number-pad"
                value={expiry}
                onChangeText={handleExpiryChange}
              />
              {errors.expiry ? (
                <Text style={{ color: "red", fontSize: 12 }}>
                  {errors.expiry}
                </Text>
              ) : null}
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.label}>código de segurança</Text>
              <TextInput
                style={[
                  styles.input,
                  errors.cvv && {
                    borderColor: theme.colors.green_light,
                    backgroundColor: "#ffdddd",
                  },
                ]}
                placeholder="***"
                placeholderTextColor={theme.colors.grey}
                keyboardType="number-pad"
                secureTextEntry
                value={cvv}
                onChangeText={handleCvvChange}
              />
              {errors.cvv ? (
                <Text style={{ color: "red", fontSize: 12 }}>{errors.cvv}</Text>
              ) : null}
            </View>
          </View>

          <Button
            label="avançar"
            onPress={handleNext}
            variant="primary"
            style={{ marginTop: 20 }}
          />
        </View>
      </Content>
      <ShapeBottom />
      <CardScannerModal
        visible={scannerVisible}
        onClose={() => setScannerVisible(false)}
        onPhotoTaken={handlePhotoTaken}
      />
    </Container>
  );
}
