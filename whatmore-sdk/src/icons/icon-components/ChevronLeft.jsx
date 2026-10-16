import React from 'react';
import { Svg, Circle, Path } from 'react-native-svg';

const ChevronLeftIcon = ({ width, height, color }) => (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
                <Circle cx="12" cy="12" r="12" fill="white" />
        <Path d="M15.7071 7.70711C16.0976 7.31658 16.0976 6.68342 15.7071 6.29289C15.3166 5.90237 14.6834 5.90237 14.2929 6.29289L9.29289 11.2929C8.90237 11.6834 8.90237 12.3166 9.29289 12.7071L14.2929 17.7071C14.6834 18.0976 15.3166 18.0976 15.7071 17.7071C16.0976 17.3166 16.0976 16.6834 15.7071 16.2929L11.4142 12L15.7071 7.70711Z" fill={'black'} />
    </Svg>
);

export default ChevronLeftIcon;
