'use client';

import * as React from 'react';

import { EditorModal } from '@/app/components/editorModal';
import { useGlobalContext } from '@/app/context/data.context';
import { emojisWithColors } from '@/constant/emojis';

export default function EditorPage() {
  const { data } = useGlobalContext();

  const [emoji, setEmoji] = React.useState<Record<string, string>>({
    color: '#ffffff',
  });
  const [radialGradient, setRadialGradient] = React.useState<string>('');

  const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getPastelWithHueVariation = (
    hue: number,
    saturation: number,
    lightness: number,
    hueVariation: number,
    lightnessVariation: number
  ) => {
    const pastelLightness =
      lightness + ((100 - lightness) * lightnessVariation) / 100;

    const hueWithVariation = (hue + hueVariation + 360) % 360;

    return `hsl(${hueWithVariation}, ${saturation}%, ${pastelLightness}%)`;
  };

  const getPastelWithSaturationVariation = (
    hue: number,
    saturation: number,
    lightness: number,
    saturationVariation: number,
    lightnessVariation: number
  ) => {
    const pastelLightness =
      lightness + ((100 - lightness) * lightnessVariation) / 100;

    const saturationWithVariation = Math.min(
      100,
      saturation + saturation * (saturationVariation / 100)
    );

    return `hsl(${hue}, ${saturationWithVariation}%, ${pastelLightness}%)`;
  };

  const hexToHSL = (hex: string) => {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);

    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;

    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);

    const L = (max + min) / 2;

    let S;
    if (L < 0.5) {
      S = (max - min) / (max + min);
    } else {
      S = (max - min) / (2 - max - min);
    }

    let H;
    if (max === min) {
      H = 0; // Hue is undefined (achromatic)
    } else if (max === rNorm) {
      H = ((gNorm - bNorm) / (6 * (max - min))) % 1;
    } else if (max === gNorm) {
      H = (2 + (bNorm - rNorm) / (6 * (max - min))) % 1;
    } else {
      H = (4 + (rNorm - gNorm) / (6 * (max - min))) % 1;
    }

    const hueDegrees = Math.round(H * 360);

    return {
      hue: hueDegrees,
      saturation: Math.round(S * 100),
      lightness: Math.round(L * 100),
    };
  };

  React.useEffect(() => {
    const index = getRandomNumber(0, emojisWithColors.length - 1);
    setEmoji(emojisWithColors[index]);
  }, []);

  React.useEffect(() => {
    const hsl = hexToHSL(emoji.color);

    const avgColorWithWhiteAndHue = getPastelWithHueVariation(
      hsl.hue,
      hsl.saturation,
      hsl.lightness,
      -20,
      40
    );
    const avgColor = emoji.color;
    const avgColorWithWhiteAndSaturation = getPastelWithSaturationVariation(
      hsl.hue,
      hsl.saturation,
      hsl.lightness,
      80,
      20
    );

    const radialGradient = `
    linear-gradient(
      ${avgColorWithWhiteAndHue},
      ${avgColor},
      ${avgColorWithWhiteAndSaturation}
    )
  `;
    setRadialGradient(radialGradient);
  }, [emoji]);

  return (
    <div className=' h-screen w-screen bg-black'>
      <EditorModal emoji={emoji} gradient={radialGradient} data={data} />
    </div>
  );
}
