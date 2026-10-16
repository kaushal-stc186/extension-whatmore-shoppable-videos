import * as React from 'react';
import { View, StyleSheet, Image, Animated, Easing } from 'react-native';
import { useGlobalState } from '../../globals/useAppState_APP';
import Video, { ViewType } from 'react-native-video';

// Pulsing shimmer sheen (dependency-free). Solid opaque gray when there's
// nothing under it (covers the video's blank surface — no white flash);
// translucent when a poster sits beneath, so the poster shows through a
// gentle shimmer.
function ShimmerSheen({ maxOpacity }) {
    const pulse = React.useRef(new Animated.Value(0.3)).current;
    React.useEffect(() => {
        const loop = Animated.loop(
            Animated.sequence([
                Animated.timing(pulse, { toValue: maxOpacity, duration: 700, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
                Animated.timing(pulse, { toValue: 0.3, duration: 700, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
            ])
        );
        loop.start();
        return () => loop.stop();
    }, [pulse, maxOpacity]);
    return <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, { backgroundColor: '#d8d8de', opacity: pulse }]} />;
}

// Buffering cover — NO spinner/loader:
//   • poster loading or absent → plain shimmer
//   • poster loaded            → poster with a shimmer sheen over it
function BufferingCover({ poster }) {
    const [posterReady, setPosterReady] = React.useState(false);
    return (
        <View pointerEvents="none" style={[StyleSheet.absoluteFill, { backgroundColor: '#e2e2e6' }]}>
            {poster ? (
                <Image
                    source={{ uri: poster }}
                    resizeMode="cover"
                    onLoad={() => setPosterReady(true)}
                    style={StyleSheet.absoluteFill}
                />
            ) : null}
            <ShimmerSheen maxOpacity={posterReady ? 0.5 : 1} />
        </View>
    );
}

// Fullscreen event player.
// Interface kept backward-compatible: {videoUrl, isMuted, isLoading, setIsLoading}.
// Optional props: paused (default false), poster (image shown under shimmer while buffering).
export default function AppVideoPlayer(props) {
    const [isAppMuted] = useGlobalState("isAppMuted");

    const handleLoad = () => {
        props.setIsLoading(false);
    };

    return (
    <>
            <Video
                source={{ uri: props.videoUrl }}
                repeat
                paused={props.paused ?? false}
                muted={isAppMuted ? true : props.isMuted}
                controls={false}
                disableFocus={true}
                resizeMode='cover'
                // force TextureView (rnv6 viewType / rnv7 surfaceType) — SurfaceView ignores borderRadius+overflow and bleeds into the next tile
                viewType={ViewType?.TEXTURE ?? 0}
                surfaceType="texture"
                // start playback as soon as ~0.5s is buffered instead of the
                // conservative ExoPlayer defaults — HLS feels instant
                bufferConfig={{
                    minBufferMs: 2500,
                    maxBufferMs: 30000,
                    bufferForPlaybackMs: 500,
                    bufferForPlaybackAfterRebufferMs: 1500,
                }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    width: '100%', height: '100%'
                }}
                onLoad={handleLoad}
                progressUpdateInterval={250}
                onProgress={(p) => {
                    // ground truth: frames are advancing — clear the cover even
                    // if onLoad was missed (e.g. page mounted paused earlier)
                    if (props.isLoading && p?.currentTime > 0.05) props.setIsLoading(false);
                }}
            />
        {/* cover sits ABOVE the video, unmounts the instant playback starts */}
        {props.isLoading && <BufferingCover poster={props.poster} />}
    </>
    );
}
