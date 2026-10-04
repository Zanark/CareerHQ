import { ArrowRight, ArrowUpRight, BookOpen, FileCheck2 } from 'lucide-react';
import { getMissionVersion, recordRoadmapVersion } from '../domain/catalog';
import type { AppState } from '../domain/types';
import { reminders } from './research';
import './perspective.css';

export function Perspective({ state, practice }: { state: AppState; practice: boolean }) {
  const examples = practice || state.sampleData;
  const recent = [...state.evidence]
    .sort((left, right) => Date.parse(right.createdAt) - Date.parse(left.createdAt))
    .slice(0, 3);

  return <div className="perspective-page">
    <section className="perspective-intro" data-tour="perspective-intro" aria-labelledby="perspective-title">
      <span className="eyebrow">KEEP GOING / EVIDENCE, NOT HYPE</span>
      <h1 id="perspective-title">Hard is not the same as <span>hopeless.</span></h1>
      <p>You do not need blind faith that everything will work out. You need a reason to give yourself another useful attempt.</p>
      <p className="perspective-thesis">Not endless struggle. <strong>Practice, feedback, recovery, and a way back in.</strong></p>
      <a className="text-link" href="#/hq">Go to Overview<ArrowRight size={16} /></a>
    </section>

    <section aria-labelledby="perspective-research-title">
      <div className="perspective-section-heading">
        <span className="eyebrow">WHAT THE RESEARCH ACTUALLY SUPPORTS</span>
        <h2 id="perspective-research-title">Reasons to try again, not promises.</h2>
        <p>Each reminder has a source, a boundary, and one practical thing to try.</p>
      </div>
      <div className="perspective-research-grid">
        {reminders.map((reminder, index) => <article className={`perspective-reminder ${['sand', 'blue', 'violet', 'rose'][index]}`} key={reminder.id}>
          <span className="perspective-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <h3>{reminder.title}</h3>
          <p>{reminder.message}</p>
          <div className="perspective-try"><span>TRY THIS</span><p>{reminder.action}</p></div>
          <details className="perspective-source" data-tour={index === 0 ? 'perspective-source' : undefined}>
            <summary><BookOpen size={16} /><span>Evidence &amp; limits</span></summary>
            <div>
              <span className="perspective-source-kind">{reminder.source.kind}</span>
              <p>{reminder.source.finding}</p>
              <p><strong>What this does not mean:</strong> {reminder.source.limit}</p>
              <a href={reminder.source.url} target="_blank" rel="noopener noreferrer">
                {reminder.source.authors} ({reminder.source.year})<ArrowUpRight size={15} />
                <span>{reminder.source.title}</span>
                <small>Read the research / opens a new tab</small>
              </a>
            </div>
          </details>
        </article>)}
      </div>
      <p className="perspective-boundary">These studies describe groups and specific tasks. They cannot promise a job, a deadline, or a life without setbacks. Method, circumstances, resources, and support matter too. The suggested actions are practical adaptations, not interventions tested in CareerHQ.</p>
    </section>

    <section className="perspective-record" aria-labelledby="perspective-record-title" data-tour="perspective-record">
      <div className="perspective-section-heading">
        <span className="eyebrow"><FileCheck2 size={16} />{practice ? 'TUTORIAL RECORD' : state.sampleData ? 'WORKSPACE WITH EXAMPLES' : 'FROM THIS WORKSPACE'}</span>
        <h2 id="perspective-record-title">{practice ? 'Practice, not your real record.' : state.sampleData ? 'This workspace includes examples.' : 'Your record, without the spin.'}</h2>
        <p>{practice
          ? 'These are temporary tutorial records, not evidence about your real progress.'
          : state.sampleData
            ? 'Sample data is enabled here. These entries may mix fictional examples with anything you added; they are not a reliable summary of your personal progress.'
            : 'A difficult day does not delete work you have recorded. These are self-reported entries, not an independent assessment of skill or worth.'}</p>
      </div>
      {recent.length ? <>
        <p className="perspective-record-count"><strong>{state.evidence.length}</strong> {practice ? 'practice' : state.sampleData ? 'workspace' : 'saved'} {state.evidence.length === 1 ? 'entry' : 'entries'}. {recent.length < state.evidence.length ? 'The latest three are below.' : 'Open a record to see what it actually says.'}</p>
        <div className="perspective-receipts">
          {recent.map(item => {
            const mission = getMissionVersion(item.missionId, recordRoadmapVersion(item));
            return <a key={item.id} className={`perspective-receipt ${mission.color}`} href={`#/evidence/${item.id}`}>
              <span className="perspective-receipt-meta">{mission.name} / v{recordRoadmapVersion(item)}</span>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <span className="perspective-receipt-footer">
                <time dateTime={item.createdAt}>{new Date(item.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}</time>
                <ArrowUpRight size={17} />
              </span>
            </a>;
          })}
        </div>
      </> : <div className="perspective-empty">
        <h3>{examples ? 'No entries saved in this workspace yet.' : 'Nothing logged here yet. That is not the same as nothing done.'}</h3>
        <p>{practice ? 'Practice entries will appear here when you save them in the tutorial.' : 'CareerHQ cannot see work you have not recorded, or anything you did before using it. There is no need to invent a win. Save one honest note when you have something to record.'}</p>
      </div>}
      <a className="text-link" href="#/evidence">Open saved work<ArrowRight size={15} /></a>
    </section>

    <section className="perspective-next violet" aria-labelledby="perspective-next-title">
      <span className="eyebrow">MAKE THE NEXT ATTEMPT WORKABLE</span>
      <h2 id="perspective-next-title">You do not have to fix your whole life tonight.</h2>
      <p>Choose one concrete action. Notice what happens. Save what you learned, including what did not work. Adjust before trying again.</p>
      <p className="perspective-permission">If you are exhausted or the same approach keeps failing, reduce the load, ask for help, change the method, or rest. Persistence can include all four.</p>
      <div className="button-row">
        <a href="#/plan" className="button primary">Choose one doable action<ArrowRight size={16} /></a>
        <a href="#/hq" className="button secondary">Back to Overview</a>
      </div>
      <small>No streak to protect. No catch-up debt. Reading this page does not change your progress.</small>
    </section>
  </div>;
}
