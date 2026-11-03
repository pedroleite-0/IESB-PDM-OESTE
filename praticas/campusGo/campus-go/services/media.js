import * as ImagePicker from 'expo-image-picker';
import { Alert, Linking } from 'react-native';

/** Abre a galeria e devolve a URI da imagem escolhida (ou null se cancelar). */
export async function pickImage() {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.7,
  });
  return result.canceled ? null : result.assets[0].uri;
}

/** Pede permissão, abre a câmera e devolve a URI da foto (ou null). */
export async function takePhoto() {
  const { granted } = await ImagePicker.requestCameraPermissionsAsync();

  if (!granted) {
    Alert.alert('Permissão negada', 'Libere a câmera nos ajustes para tirar a foto.', [
      { text: 'Agora não', style: 'cancel' },
      { text: 'Abrir ajustes', onPress: () => Linking.openSettings() },
    ]);
    return null;
  }

  const shot = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.7,
  });
  return shot.canceled ? null : shot.assets[0].uri;
}
