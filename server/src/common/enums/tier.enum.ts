export enum Tier {
  브론즈 = '브론즈',
  실버 = '실버',
  골드 = '골드',
  플래티넘 = '플래티넘',
  다이아몬드 = '다이아몬드',
  엄홍길 = '엄홍길',
}

export function tierOrder(tier: Tier) {
  const tierList = [
    '브론즈',
    '실버',
    '골드',
    '플래티넘',
    '다이아몬드',
    '엄홍길',
  ];
  return tierList.slice(tierList.indexOf(tier));
}

export function pointToTier(point: number) {
  if (point < 10) return Tier.브론즈;
  else if (point < 20) return Tier.실버;
  else if (point < 30) return Tier.골드;
  else if (point < 40) return Tier.플래티넘;
  else if (point < 50) return Tier.다이아몬드;
  else if (point < 60) return Tier.엄홍길;
}
