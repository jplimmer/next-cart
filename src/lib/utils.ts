import { clsx, type ClassValue } from 'clsx';
import { converter, formatHex } from 'culori';
import { ComponentType, lazy } from 'react';
import { twMerge } from 'tailwind-merge';
import tailwindColors from 'tailwindcss/colors';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitaliseFirstLetter(str: string) {
  return String(str).charAt(0).toUpperCase() + String(str).slice(1);
}

export function capitaliseWords(str: string) {
  return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

export function splitByQuery(result: string, query: string) {
  const parts = result.toLowerCase().split(query.toLowerCase());
  return {
    before: parts[0],
    query: query.toLowerCase(),
    after: parts.slice(1).join(query.toLowerCase()),
  };
}

export const removeFalsyValues = <T extends object>(obj: T): Partial<T> =>
  Object.fromEntries(
    Object.entries(obj).filter(([, value]) => Boolean(value))
  ) as Partial<T>;

const toRgb = converter('rgb');

export function resolveTailwindColorToHex(
  className: string
): string | undefined {
  const match = className.match(/^(?:text|bg|border)-([a-zA-Z]+)-(\d{2,3})$/);
  if (!match) return;

  const [, colorName, shade] = match;
  const colorGroup = tailwindColors[colorName as keyof typeof tailwindColors];

  if (!colorGroup) return;

  let rawColor: string | undefined;

  if (typeof colorGroup === 'string') {
    rawColor = colorGroup;
  } else if (typeof colorGroup === 'object' && shade in colorGroup) {
    rawColor = (colorGroup as Record<string, string>)[shade];
  }

  if (!rawColor) return;

  // If it's already a hex string, return it
  if (typeof rawColor === 'string' && rawColor.startsWith('#')) {
    return rawColor;
  }

  // If it's an OKLCH string, convert it to RGB then to hex
  if (typeof rawColor === 'string' && rawColor.startsWith('oklch')) {
    const oklchMatch = rawColor.match(/oklch\(([\d.]+)% ([\d.]+) ([\d.]+)\)/);
    if (!oklchMatch) return;

    const [, lStr, cStr, hStr] = oklchMatch;
    const oklchColor = {
      mode: 'oklch',
      l: parseFloat(lStr) / 100,
      c: parseFloat(cStr),
      h: parseFloat(hStr),
    } as const;

    const rgbColor = toRgb(oklchColor);
    return formatHex(rgbColor);
  }

  return undefined;
}

export function normalizeTailwindColor(input: string): string {
  if (input && input.startsWith('text-') && /-\d+$/.test(input)) {
    return resolveTailwindColorToHex(input) ?? input;
  }

  if (input && input.startsWith('text-')) {
    return input.replace(/^text-/, '');
  }

  return input;
}

export const lazyMinLoadTime = <TProps>(
  factory: () => Promise<{ default: ComponentType<TProps> }>,
  minLoadTimeMs = 2000
) =>
  lazy(async () => {
    const [moduleExports] = await Promise.all([
      factory(),
      new Promise<void>((resolve) => setTimeout(resolve, minLoadTimeMs)),
    ]);
    return moduleExports;
  });

export async function IsImageUrl(
  url: string,
  takePlacehold = true
): Promise<string | null> {
  try {
    if (!url || (!takePlacehold && url.toLowerCase().includes('placehold.co')))
      return null;
    const res = await fetch(url, { method: 'HEAD' });
    const type = res.headers.get('Content-Type');
    if (res.ok && type?.startsWith('image/')) {
      return url;
    }
    return null;
  } catch {
    return null;
  }
}

export const isNumeric = (value: string): boolean => !isNaN(Number(value));

export function filterByParam<T, K extends keyof T>(
  items: T[],
  paramValues: T[K][],
  key: K
): T[] {
  const paramSet = new Set(paramValues);
  return items.filter((item) => paramSet.has(item[key]));
}

export const extractFormField = (
  formData: FormData,
  fieldName: string
): string => {
  const value = formData.get(fieldName);
  return typeof value === 'string' ? value : '';
};
