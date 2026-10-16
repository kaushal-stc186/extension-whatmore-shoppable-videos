import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

function CartIcon(props) {
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
                <Path d="M4.468 10.266l.024.216.126 1.131c.088.794.164 1.483.298 2.033.143.59.38 1.148.873 1.59.494.441 1.074.615 1.677.692C8.026 16 8.72 16 9.519 16h5.353c.548 0 1.032 0 1.435-.041.438-.044.863-.143 1.271-.389.41-.246.695-.576.94-.941.224-.338.45-.765.707-1.25l2.49-4.702C22.596 7.01 21.387 5 19.5 5H9.399c-.983 0-1.824 0-2.49.093a3.974 3.974 0 00-.976.25L5.79 4.05A2.303 2.303 0 003.5 2H3a1 1 0 100 2h.5c.155 0 .285.116.302.27l.666 5.996z" />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14 19.5a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0zM5 19.5a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0z"
                />
            </G>
        </Svg>
    );
}

export default CartIcon;