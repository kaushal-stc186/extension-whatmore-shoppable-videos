import * as React from 'react';
import Svg, {Line} from 'react-native-svg';

function CrossIcon({size = 24, color = 'white' }) {
    return (
        <Svg height={size} width={size} viewBox="0 0 24 24">
            <Line x1="1" y1="1" x2="23" y2="23" stroke={color} strokeWidth="2" />
            <Line x1="23" y1="1" x2="1" y2="23" stroke={color} strokeWidth="2" />
        </Svg>
    );
}

export default CrossIcon;