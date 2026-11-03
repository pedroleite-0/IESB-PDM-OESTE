import * as Location from 'expo-location';

/**
 * Retorna coordenadas e endereço aproximado do usuário.
 * Devolve null se a permissão de primeiro plano for negada.
 */
export async function getCurrentPlace() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') return null;

  const { coords } = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });

  let address;
  try {
    [address] = await Location.reverseGeocodeAsync({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  } catch {
    // sem endereço (emulador sem posição, sem internet): segue com o texto padrão
    address = undefined;
  }

  const label = address
    ? [address.street, address.district].filter(Boolean).join(' - ')
    : '';

  return {
    latitude: coords.latitude,
    longitude: coords.longitude,
    label: label || 'Local desconhecido',
  };
}
