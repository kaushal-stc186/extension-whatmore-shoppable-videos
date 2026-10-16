import * as React from 'react';
import { View, FlatList } from 'react-native';

// Dependency-free full-page vertical pager (replaces react-native-swiper for
// the reels experience). FlatList pagingEnabled with exact page geometry —
// no clone pages, no broken initial-index math.
//
// loop: circular paging. Instead of cloning pages up front (react-native-swiper's
// approach, which caused wrong-video-on-tap), we grow the data by whole cycles
// on demand — swiping past the last video shows the first again, indefinitely.
// The page at absolute index i renders source item i % N, so the active-index
// bookkeeping stays consistent.
export default function VerticalPager({ data, renderPage, initialIndex = 0, onIndexChanged, onScrollBegin, keyExtractor, loop = false }) {
    const [layout, setLayout] = React.useState(null);
    const N = data?.length ?? 0;
    // how many whole copies of `data` are currently materialised (loop only)
    const [cycles, setCycles] = React.useState(2);

    const pagedData = React.useMemo(() => {
        if (!loop || N === 0) return data ?? [];
        const out = [];
        for (let c = 0; c < cycles; c++) out.push(...data);
        return out;
    }, [data, loop, cycles, N]);

    return (
        <View style={{ flex: 1 }} onLayout={(e) => setLayout(e.nativeEvent.layout)}>
            {layout && (
                <FlatList
                    data={pagedData}
                    keyExtractor={keyExtractor ?? ((item, i) => String(i))}
                    renderItem={({ item, index }) => (
                        <View style={{ width: layout.width, height: layout.height }}>
                            {renderPage(item, index)}
                        </View>
                    )}
                    pagingEnabled
                    initialScrollIndex={Math.min(initialIndex, Math.max(0, (pagedData?.length ?? 1) - 1))}
                    getItemLayout={(_, index) => ({ length: layout.height, offset: layout.height * index, index })}
                    showsVerticalScrollIndicator={false}
                    initialNumToRender={1}
                    maxToRenderPerBatch={2}
                    windowSize={3}
                    onScrollBeginDrag={onScrollBegin}
                    // append another whole cycle before the user reaches the end
                    onEndReachedThreshold={0.5}
                    onEndReached={() => { if (loop && N > 0) setCycles((c) => c + 1); }}
                    onMomentumScrollEnd={(e) => {
                        const index = Math.round(e.nativeEvent.contentOffset.y / layout.height);
                        onIndexChanged?.(Math.max(0, Math.min(index, pagedData.length - 1)));
                    }}
                />
            )}
        </View>
    );
}
