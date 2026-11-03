import { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';

/**
 * Ícone que "pulsa" (cresce e volta) cada vez que `trigger` aumenta.
 * Bônus: usa Reanimated com withSequence e withSpring.
 */
export function DoneIcon({ children, trigger }) {
  const scale = useSharedValue(1);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    if (trigger > 0) {
      scale.value = withSequence(withSpring(1.4), withSpring(1));
    }
  }, [trigger, scale]);

  return <Animated.View style={style}>{children}</Animated.View>;
}

export default DoneIcon;
