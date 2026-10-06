import { CalendarDays } from 'lucide-react';
import { getMissionActivity } from './domain/missionActivity';
import type { AppState, Mission } from './domain/types';
import { missionAccentStyle } from './missionVisuals';
import './mission-activity.css';

export function MissionWorkStreak({ mission, state }: { mission: Mission; state: AppState }) {
  const activity = getMissionActivity(state, mission.id);
  return <section className="mission-work-streak" style={missionAccentStyle(mission.id)}
    aria-label={`${mission.name} recorded work streak`} data-mission-id={mission.id}
    data-worked-today={activity.workedToday} data-work-streak={activity.streak}>
    <CalendarDays size={22} aria-hidden="true" />
    <div className="mission-work-streak-summary">
      <strong>{activity.streak} {activity.streak === 1 ? 'day' : 'days'} <span>recorded-work streak</span></strong>
      <p>{activity.workedToday ? 'Work recorded today' : 'No work recorded today'}
        {activity.lastWorkedOn && !activity.workedToday ? ` · Last recorded day: ${activity.lastWorkedOn}` : ''}</p>
    </div>
    <details><summary>How this is counted</summary>
      <p>Saving progress/evidence or any recall review counts as work for this mission. Multiple records
        on one local calendar day count once. Browsing, timers, settings and plan creation do not count.</p>
      <p>If today has no record yet, a streak ending yesterday remains available until today ends.
        This measures recorded work days, not attention or mastery.</p>
    </details>
  </section>;
}
