import React, { useEffect, useRef, useState } from "react";
import { Modal, View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { theme } from "@/src/theme/theme";

type Props = {
  visible: boolean;
  onClose: () => void;
  onPhotoTaken: (uri: string) => void;
};

export function CardScannerModal({ visible, onClose, onPhotoTaken }: Props) {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!permission) requestPermission();
  }, [permission]);

  const takePhoto = async () => {
    if (!cameraRef.current || loading) return;
    setLoading(true);
    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.7,
      });
      onPhotoTaken(photo.uri);
      onClose();
    } catch (err) {
      console.warn("Erro ao tirar foto:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!permission?.granted) {
    return (
      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.center}>
          <Text style={{ color: "#fff", marginBottom: 16 }}>
            Permissão da câmera necessária
          </Text>
          <TouchableOpacity style={styles.button} onPress={requestPermission}>
            <Text style={styles.buttonText}>Permitir acesso</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <CameraView ref={cameraRef} style={styles.camera} facing="back" />
        <View style={styles.controls}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.buttonText}>Fechar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
            <Text style={styles.buttonText}>
              {loading ? "..." : "Capturar"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  camera: {
    flex: 1,
  },
  controls: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: theme.colors.blue_light,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  closeButton: {
    backgroundColor: theme.colors.grey_dark,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  captureButton: {
    backgroundColor: theme.colors.green_light,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
});
