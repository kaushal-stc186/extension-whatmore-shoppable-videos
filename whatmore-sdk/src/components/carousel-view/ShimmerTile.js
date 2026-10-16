import * as React from 'react';
import { Animated, Easing } from 'react-native';

// Dependency-free shimmer placeholder: a soft opacity pulse on a rounded block.
// Rendered for carousel tiles that are outside the viewport so no video
// player exists for them.
export default function ShimmerTile({ width, height, borderRadius = 10 }) {
    const opacity = React.useRef(new Animated.Value(0.35)).current;

    React.useEffect(() => {
        const loop = Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, { toValue: 0.75, duration: 700, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
                Animated.timing(opacity, { toValue: 0.35, duration: 700, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
            ])
        );
        loop.start();
        return () => loop.stop();
    }, [opacity]);

    return (
        <Animated.View
            style={{
                width,
                height,
                borderRadius,
                backgroundColor: '#d8d8de',
                opacity,
            }}
        />
    );
}
