export function minutesToHoursAndMinutes(totalMinutes: number): {short: string, long: string} {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.round(totalMinutes % 60);
  return {
    short: `${hours === 0 ? '' : hours + ' ч '}${minutes} мин`,
    long: `${hours === 0 ? '' : hours + ' час '}${minutes} мин`,
  };
}