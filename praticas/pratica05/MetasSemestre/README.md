# MetasSemestre

Atividade — Estado, Props, Componentização, Eventos, useEffect e AsyncStorage
Disciplina: Programação para Dispositivos Móveis (React Native / Expo) — IESB
Aulas relacionadas: 05 e 06

## Comando usado para criar o projeto

```bash
npx create-expo-app@latest MetasSemestre --template blank
```

## Dependências extras

```bash
npx expo install @react-native-async-storage/async-storage react-native-safe-area-context
```

## Como rodar

```bash
cd MetasSemestre
npx expo start
```
## Onde está cada useEffect (persistência) — em App.js

- **useEffect de CARGA** (logo no início do componente `App`): roda uma
  única vez, quando o app abre (array de dependências `[]`).

## Prints

![lista vazia](./assets/print2.jpeg)
![lista com itens](./assets/print1.jpeg)
![depois de reabrir o app](./assets/print3.jpeg)
