import { localDate } from './engine';
import { timestampSchema } from './legacyState';
import type { AppState, MissionId } from './types';

export interface MissionActivitySummary {
  asOfDate: string;
  workedToday: boolean;
  streak: number;
  lastWorkedOn: string | null;
}

function calendarDay(date: Date): number {
  // Put local date components on a UTC axis so DST never changes a day's step size.
  const day = new Date(0);
  day.setUTCFullYear(date.getFullYear(), date.getMonth(), date.getDate());
  return day.getTime() / 86_400_000;
}

export function getMissionActivity(
  state: Pick<AppState, 'evidence' | 'recalls'>,
  missionId: MissionId,
  now: Date = new Date(),
): MissionActivitySummary {
  const asOfDate = localDate(now);
  const today = calendarDay(now);
  const workedDays = new Set<number>();
  let lastDay = -Infinity;
  let lastWorkedOn: string | null = null;

  for (const records of [state.evidence, state.recalls]) {
    for (const record of records) {
      if (record.missionId !== missionId) continue;
      const timestamp = new Date(timestampSchema.parse(record.createdAt));
      const workedOn = localDate(timestamp);
      const day = calendarDay(timestamp);
      // Monotonic save timestamps can be slightly ahead of now on the same day.
      if (day > today) continue;
      workedDays.add(day);
      if (day > lastDay) {
        lastDay = day;
        lastWorkedOn = workedOn;
      }
    }
  }

  const workedToday = workedDays.has(today);
  let cursor = workedToday ? today : today - 1;
  let streak = 0;
  while (workedDays.has(cursor)) {
    streak++;
    cursor--;
  }

  return { asOfDate, workedToday, streak, lastWorkedOn };
}
