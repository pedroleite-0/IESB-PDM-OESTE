// Cores dos modos claro e escuro. As telas escolhem o conjunto com
// useColorScheme() + getTheme(scheme).
export const themes = {
  light: {
    background: '#FFFFFF',
    card: '#EBECF9',
    text: '#1E1E24',
    textSecondary: '#5F6070',
    primary: '#4757B8',
    onPrimary: '#FFFFFF',
    border: '#C9CBE0',
    inputBackground: '#FFFFFF',
    tag: '#D5D8F2',
    tagText: '#2E3A8C',
    danger: '#E31E24',
    overlay: 'rgba(0, 0, 0, 0.4)',
  },
  dark: {
    background: '#1E1E24',
    card: '#2F2F37',
    text: '#F5F5F7',
    textSecondary: '#B4B4C0',
    primary: '#A6ACE4',
    onPrimary: '#1E1E24',
    border: '#4A4A55',
    inputBackground: '#2A2A32',
    tag: '#44445A',
    tagText: '#D5D8F2',
    danger: '#FF6B6B',
    overlay: 'rgba(0, 0, 0, 0.6)',
  },
};

// useColorScheme() pode devolver null; nesse caso usamos o tema claro.
export function getTheme(scheme) {
  return scheme === 'dark' ? themes.dark : themes.light;
}
