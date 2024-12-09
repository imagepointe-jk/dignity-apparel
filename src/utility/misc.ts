export function clamp(val: number, min: number, max: number) {
  if (val < min) return min;
  if (val > max) return max;
  return val;
}

export function message(msg: string) {
  return { message: msg };
}

export function bgImage(src: string | null | undefined) {
  return { backgroundImage: src ? `url("${src}")` : undefined };
}
