import React, { useMemo } from 'react';
import { Svg, Rect } from 'react-native-svg';
import MersenneTwister from 'mersenne-twister';
import Color from 'color';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';

export interface IJazziconProps {
  size?: number;
  borderRadius?: number;
  address?: string;
  seed?: number;
  containerStyle?: StyleProp<ViewStyle>;
  colors?: string[];
}

export const COLORS = [
  '#01888C', // teal
  '#FC7500', // bright orange
  '#034F5D', // dark teal
  '#F73F01', // orangered
  '#FC1960', // magenta
  '#C7144C', // raspberry
  '#F3C100', // goldenrod
  '#1598F2', // lightning blue
  '#2465E1', // sail blue
  '#F19E02', // gold
];

export const wobble = 30;
export const shapeCount = 3;

const Jazzicon = ({
  size = 50,
  borderRadius,
  address,
  seed,
  containerStyle,
  colors = COLORS,
}: IJazziconProps) => {
  const { generator, jazzColors } = useMemo(() => {
    const hash = address
      ? address.toLowerCase()
      : '0x00000000000000000000000000000000';
    if (!seed) {
      seed = hashCode(hash);
    }

    const generator = new MersenneTwister(seed);
    const amount = generator.random() * 30 - wobble / 2;
    return {
      generator,
      jazzColors: colors.map((hex) => new Color(hex).rotate(amount).hex()),
    };
  }, [address, size, seed]);

  const randomColor = () => {
    return jazzColors.splice(
      Math.floor(jazzColors.length * generator.random()),
      1
    )[0];
  };

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          backgroundColor: randomColor(),
          borderRadius: borderRadius ? borderRadius : size / 2,
        },
        containerStyle,
      ]}
    >
      <Svg width={size} height={size}>
        {Array(shapeCount)
          .fill(0)
          .map((_, index) => {
            const center = size / 2;

            const firstRot = generator.random();
            const angle = Math.PI * 2 * firstRot;
            const velocity =
              (size / shapeCount) * generator.random() +
              (index * size) / shapeCount;

            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;

            const secondRot = generator.random();
            const rot = firstRot * 360 + secondRot * 180;

            return (
              <Rect
                key={`shape_${index}`}
                x={0}
                y={0}
                width={size}
                height={size}
                fill={randomColor()}
                transform={`translate(${tx} ${ty}) rotate(${rot.toFixed(
                  1
                )} ${center} ${center})`}
              />
            );
          })}
      </Svg>
    </View>
  );
};

const hashCode = (str: string) => {
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});

export default React.memo(Jazzicon);
