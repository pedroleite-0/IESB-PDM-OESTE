import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pickImage, takePhoto } from '../../services/media';

const PHOTO_KEY = '@profile-photo';
const PRIMARY = '#4757B8';

// troque pelos seus dados
const NAME = 'Aluno CampusGo';
const COURSE = 'Engenharia de Software · Noturno';

/** Perfil: foto da galeria ou da câmera, guardada no AsyncStorage. */
export default function ProfileScreen() {
  const [photoUri, setPhotoUri] = useState(null);

  // ao abrir a tela, relê a foto salva
  useEffect(() => {
    AsyncStorage.getItem(PHOTO_KEY)
      .then((saved) => {
        if (saved) setPhotoUri(saved);
      })
      .catch(() => {});
  }, []);

  async function savePhoto(uri) {
    if (!uri) return; // cancelou ou permissão negada: mantém a foto atual
    setPhotoUri(uri);
    await AsyncStorage.setItem(PHOTO_KEY, uri);
  }

  async function handleChangePhoto() {
    await savePhoto(await pickImage());
  }

  async function handleTakePhoto() {
    await savePhoto(await takePhoto());
  }

  const avatar = photoUri ? { uri: photoUri } : require('../../assets/icon.png');

  return (
    <View style={styles.screen}>
      <Pressable onPress={handleChangePhoto} style={({ pressed }) => pressed && styles.pressed}>
        <Image source={avatar} style={styles.avatar} />
      </Pressable>
      <Text style={styles.hint}>Toque na foto para trocar pela galeria</Text>

      <Text style={styles.name}>{NAME}</Text>
      <Text style={styles.course}>{COURSE}</Text>

      <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={handleTakePhoto}>
        <Text style={styles.buttonText}>Tirar foto com a câmera</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center', padding: 24, paddingTop: 40, backgroundColor: '#FFFFFF' },
  // sem largura, altura e borderRadius a imagem não aparece
  avatar: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#EBECF9' },
  hint: { color: '#5F6070', fontSize: 12, marginTop: 8 },
  name: { fontSize: 20, fontWeight: 'bold', marginTop: 16 },
  course: { color: '#5F6070', marginTop: 4, marginBottom: 24 },
  button: { backgroundColor: PRIMARY, borderRadius: 8, paddingVertical: 12, paddingHorizontal: 24 },
  buttonText: { color: '#FFFFFF', fontWeight: '600', fontSize: 16 },
  pressed: { opacity: 0.6 },
});
