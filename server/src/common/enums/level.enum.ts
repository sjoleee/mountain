export enum Level {
  HIGH = '상',
  MID = '중',
  LOW = '하',
}

export function levelToPoint(level: string) {
  if (level === Level.HIGH) return 5;
  else if (level === Level.MID) return 3;
  else if (level === Level.LOW) return 1;
  return 0;
}
