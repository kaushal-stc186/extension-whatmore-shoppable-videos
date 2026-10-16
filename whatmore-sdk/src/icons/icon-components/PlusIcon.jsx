import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

function PlusIcon(props) {
    const fillColor = props.color || '#FFFFFF';
    const width = props.size || 40;
    const height = props.size || 40;

    return (
        <Svg 
            width={width} height={height} 
            viewBox="0 0 24 24"
            {...props}
        >
            <G fill={fillColor}>
                <Path fill="#fff" d="M0 0H24V24H0z" />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13 9a1 1 0 10-2 0v2H9a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V9zM7.25 2.388C8.55 2.099 10.124 2 12 2s3.451.1 4.75.388c1.31.291 2.399.788 3.236 1.626.838.837 1.335 1.926 1.626 3.236C21.901 8.55 22 10.124 22 12s-.1 3.451-.388 4.75c-.291 1.31-.788 2.399-1.626 3.236-.837.838-1.926 1.335-3.236 1.626-1.299.289-2.874.388-4.75.388s-3.451-.1-4.75-.388c-1.31-.291-2.399-.788-3.236-1.626-.838-.837-1.335-1.926-1.626-3.236C2.099 15.45 2 13.876 2 12s.1-3.451.388-4.75c.291-1.31.788-2.399 1.626-3.236.837-.838 1.926-1.335 3.236-1.626z"
                />
            </G>
        </Svg>
    );
}

export default PlusIcon;