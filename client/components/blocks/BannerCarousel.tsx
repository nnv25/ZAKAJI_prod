// Баннер главной страницы
import React, { useState, useRef, useEffect } from 'react';
import { View, Image, ScrollView, Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

const banners = [
  require('../../assets/images/banner1.png'),
  require('../../assets/images/banner1.png'),
  require('../../assets/images/banner1.png'),
];

export default function BannerCarousel() {
  const scrollRef = useRef<ScrollView>(null);
  const [index, setIndex] = useState(0);

  // автопрокрутка каждые 3 секунды
  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (index + 1) % banners.length;
      scrollRef.current?.scrollTo({ x: width * nextIndex, animated: true });
      setIndex(nextIndex);
    }, 3000);
    return () => clearInterval(timer);
  }, [index]);

  const onScroll = (e: any) => {
    const slide = Math.round(e.nativeEvent.contentOffset.x / width);
    setIndex(slide);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        onScroll={onScroll}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        {banners.map((img, i) => (
          <Image key={i} source={img} style={styles.image} resizeMode="cover" />
        ))}
      </ScrollView>

      <View style={styles.dots}>
        {banners.map((_, i) => (
          <View key={i} style={[styles.dot, index === i && styles.activeDot]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginVertical: 10 },
  image: {
    width,
    height: 150,
    borderRadius: 16,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#CDE589',
  },
});