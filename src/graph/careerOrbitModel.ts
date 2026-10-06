import { checkpointIdentity, getMission } from '../domain/catalog';
import { freelanceVerdicts, missionIds, opportunityStages } from '../domain/types';
import type { AppState, Mission, MissionProgress } from '../domain/types';
import type { CareerGraphNode } from './careerGraphModel';
import type { CareerOrbit, CareerOrbitSegment } from './careerOrbitTypes';
import { COLLECTION_COLORS, missionColor } from '../missionVisuals';
import { getMissionActivity } from '../domain/missionActivity';
import type { MissionActivitySummary } from '../domain/missionActivity';

function members(nodes: readonly CareerGraphNode[]): CareerOrbitSegment['members'] {
  return nodes.map(node => ({ nodeId: node.id, status: node.status, current: node.current === true }));
}

function memberIds(segments: readonly CareerOrbitSegment[]): string[] {
  return segments.flatMap(segment => segment.members.map(member => member.nodeId));
}

function recordCount(count: number): string {
  return `${count} ${count === 1 ? 'record' : 'records'}`;
}

function missionOrbit(
  mission: Mission, progress: MissionProgress, index: number, nodes: ReadonlyMap<string, CareerGraphNode>,
  activity: MissionActivitySummary,
): CareerOrbit {
  const id = `orbit:mission:${mission.id}`;
  const href = `#/mission/${mission.id}`;
  const tracked = new Map<string, CareerGraphNode>();
  for (const checkpoint of mission.checkpoints) {
    const node = nodes.get(`checkpoint:${checkpointIdentity(mission.id, checkpoint.id, mission.roadmapVersion)}`);
    if (node?.kind === 'checkpoint' && !node.archived && node.roadmapVersion === mission.roadmapVersion) {
      tracked.set(checkpoint.id, node);
    }
  }

  const assigned = new Set<string>();
  const segments: CareerOrbitSegment[] = [];
  function addStage(key: string, label: string, checkpointIds: readonly string[]) {
    const stageNodes: CareerGraphNode[] = [];
    for (const checkpointId of checkpointIds) {
      const node = tracked.get(checkpointId);
      if (node && !assigned.has(node.id)) {
        assigned.add(node.id);
        stageNodes.push(node);
      }
    }
    if (!stageNodes.length) return;
    const completed = stageNodes.filter(node => node.status === 'complete').length;
    const current = stageNodes.find(node => node.current);
    segments.push({
      id: `${id}:${mission.roadmapVersion}:${key}`, label, href,
      summary: `${completed}/${stageNodes.length} checkpoints marked complete${current ? ` · Current: ${current.label}` : ''}`,
      detail: [
        `Saved roadmap v${mission.roadmapVersion}: ${stageNodes.length} tracked checkpoints grouped by their defined stage.`,
        'Stage membership is navigation, not an additional prerequisite or a mastery assessment.',
        'Completion is user-recorded; optional reference material is outside this count.',
      ].join(' '),
      members: members(stageNodes),
    });
  }

  for (const stage of mission.stages ?? []) {
    addStage(`stage:${encodeURIComponent(stage.id)}`, stage.title, stage.checkpointIds);
  }
  const remainingStages = new Map<string, string[]>();
  for (const checkpoint of mission.checkpoints) {
    const node = tracked.get(checkpoint.id);
    if (!node || assigned.has(node.id)) continue;
    const group = remainingStages.get(checkpoint.stage) ?? [];
    group.push(checkpoint.id);
    remainingStages.set(checkpoint.stage, group);
  }
  for (const [label, checkpointIds] of remainingStages) {
    addStage(`checkpoint-stage:${encodeURIComponent(label)}`, label, checkpointIds);
  }

  const ids = memberIds(segments);
  const completed = [...tracked.values()].filter(node => node.status === 'complete').length;
  const current = tracked.get(progress.checkpointId);
  const currentNode = current?.current ? current : undefined;
  const currentStage = currentNode && segments.find(segment => segment.members.some(member => member.nodeId === currentNode.id));
  const context = currentNode
    ? `Current: ${currentStage ? `${currentStage.label} — ` : ''}${currentNode.label}`
    : ids.length && completed === ids.length ? 'All tracked checkpoints marked complete' : 'No current saved checkpoint';
  return {
    id, index, kind: 'mission', label: mission.name, href, hubNodeId: `mission:${mission.id}`,
    missionId: mission.id, missionMode: progress.mode, roadmapVersion: mission.roadmapVersion,
    color: missionColor(mission.id), activity,
    summary: ids.length ? `${completed}/${ids.length} checkpoints marked complete · ${context}` : 'No tracked checkpoints · reference only',
    detail: [
      `Saved ${mission.name} roadmap v${mission.roadmapVersion} · ${progress.mode} · ${progress.status}.`,
      progress.mode === 'active'
        ? 'Active mission: a colored outer ring that revolves while animation is enabled.'
        : 'Background or planned mission: a smaller ring in its mission color near the core, with no independent animation.',
      ids.length
        ? `${completed} of ${ids.length} tracked checkpoints have user-recorded completion; this is not assessed mastery. ${context}.`
        : 'This saved definition is planned/reference material, with no tracked checkpoints or completion percentage.',
      'Archived completions, unadopted editions and optional references do not add credit to this saved tracker.',
    ].join(' '),
    ...(ids.length ? { progress: { completed, total: ids.length } } : {}),
    ...(currentNode ? { currentNodeId: currentNode.id } : {}),
    memberIds: ids, segments,
  };
}

type CollectionKind = Exclude<CareerOrbit['kind'], 'mission'>;

const collections: readonly {
  kind: CollectionKind; label: string; href: string; color: string; detail: string;
}[] = [
  {
    kind: 'action', label: 'Daily work', href: '#/plan', color: COLLECTION_COLORS.action,
    detail: 'Today’s saved actions and completed actions from earlier days, grouped by recorded status. Future plans and unfinished past actions are outside this graph. Done actions are not checkpoint completion or assessed mastery.',
  },
  {
    kind: 'evidence', label: 'Saved evidence', href: '#/evidence', color: COLLECTION_COLORS.evidence,
    detail: 'Saved evidence grouped by its recorded mission, including records from older roadmap versions. These are supporting references, not an automatic mastery assessment or additional checkpoint credit.',
  },
  {
    kind: 'opportunity', label: 'Applications', href: '#/pipeline', color: COLLECTION_COLORS.opportunity,
    detail: 'Saved application pipeline records grouped by their actual stage. Accepted is a recorded outcome; Rejected and Withdrawn remain closed references. No stage is checkpoint credit or assessed mastery.',
  },
  {
    kind: 'freelance', label: 'Freelance leads', href: '#/freelance', color: COLLECTION_COLORS.freelance,
    detail: 'Saved research leads grouped by their actual verdict. Ignore is a reference classification; every other verdict remains unfinished research. These records do not establish paid work, income or checkpoint completion.',
  },
  {
    kind: 'history', label: 'Past accomplishments', href: '#/perspective', color: COLLECTION_COLORS.history,
    detail: 'User-reviewed past accomplishment records, kept together without inferring dates, source credibility or current ability. Recorded past work grants no checkpoint credit and is not a current mastery assessment.',
  },
  {
    kind: 'curriculum', label: 'Untracked curriculum', href: '#/sources', color: COLLECTION_COLORS.curriculum,
    detail: 'Latest curriculum checkpoint references not represented by the saved tracker or completed archives, grouped by mission. Browsing does not adopt a roadmap, add work or grant completion credit.',
  },
];

/** Derive views before display filters; activity reads actual records without altering saved dates or state. */
export function buildCareerOrbits(state: AppState, nodes: readonly CareerGraphNode[]): CareerOrbit[] {
  const byId = new Map(nodes.map(node => [node.id, node]));
  const byKind = new Map<CareerGraphNode['kind'], CareerGraphNode[]>();
  for (const node of byId.values()) {
    const group = byKind.get(node.kind) ?? [];
    group.push(node);
    byKind.set(node.kind, group);
  }
  const missions = missionIds.map(id => getMission(id, state));
  const now = new Date();
  const orbits = missions.map((mission, index) => missionOrbit(
    mission, state.missions[mission.id], index, byId, getMissionActivity(state, mission.id, now),
  ));
  // These keys use the same kind + encoded raw ID namespace as the graph's recordNodeId.
  const opportunityStage = new Map(state.opportunities.map(record => [`opportunity:${encodeURIComponent(record.id)}`, record.stage]));
  const freelanceVerdict = new Map(state.freelanceOpportunities.map(record => [`freelance:${encodeURIComponent(record.id)}`, record.verdict]));

  for (const [index, collection] of collections.entries()) {
    const { kind, label, href, color, detail } = collection;
    const id = `orbit:${kind}`;
    const collectionNodes = byKind.get(kind) ?? [];
    const segments: CareerOrbitSegment[] = [];
    let summary = collectionNodes.length ? recordCount(collectionNodes.length) : 'No records';
    function addGroup(key: string, label: string, group: CareerGraphNode[], explanation: string, groupHref = href) {
      if (!group.length) return;
      segments.push({
        id: `${id}:${key}`, label, href: groupHref, members: members(group),
        summary: kind === 'curriculum' ? `${group.length} untracked checkpoints · reference only` : recordCount(group.length),
        detail: `${kind === 'curriculum' ? `${group.length} untracked checkpoint references` : recordCount(group.length)}. ${explanation}`,
      });
    }
    switch (kind) {
      case 'action': {
        const done = collectionNodes.filter(node => node.status === 'complete');
        const unfinished = collectionNodes.filter(node => node.status === 'incomplete');
        addGroup('status:complete', 'Done', done, 'Actions marked done in the saved plan, including earlier days. This is action status, not checkpoint completion or mastery.');
        addGroup('status:incomplete', 'Unfinished', unfinished, 'Today’s represented actions not marked done. This grouping adds no tasks or prerequisites.');
        if (collectionNodes.length) summary += ` · ${done.length} done · ${unfinished.length} unfinished`;
        break;
      }
      case 'evidence':
      case 'curriculum':
        for (const mission of missions) {
          const group = collectionNodes.filter(node => node.missionId === mission.id);
          addGroup(`mission:${mission.id}`, mission.name, group, kind === 'evidence'
            ? `Evidence linked to ${mission.name} across its recorded roadmap versions. Supporting references only; this group does not assess mastery or add completion credit.`
            : `Latest ${mission.name} definitions shown only as untracked references. Their saved tracker version is unchanged; no adoption, progress or new prerequisites are implied.`,
          kind === 'curriculum' ? `#/sources/${mission.id}` : href);
        }
        summary = kind === 'curriculum'
          ? collectionNodes.length ? `${collectionNodes.length} untracked checkpoints · reference only` : 'No untracked curriculum'
          : collectionNodes.length ? `${summary} · saved references` : summary;
        break;
      case 'opportunity': {
        for (const stage of opportunityStages) {
          const group = collectionNodes.filter(node => opportunityStage.get(node.id) === stage);
          const meaning = stage === 'Accepted'
            ? 'Accepted is a user-recorded pipeline outcome, not assessed mastery or checkpoint completion.'
            : stage === 'Rejected' || stage === 'Withdrawn'
              ? `${stage} records are closed references, not achievements or active backlog.`
              : `${stage} is the saved pipeline stage, not a completed outcome or checkpoint credit.`;
          addGroup(`stage:${encodeURIComponent(stage)}`, stage, group, `Grouped only by the recorded ${stage} stage. ${meaning}`);
        }
        if (collectionNodes.length) {
          const accepted = collectionNodes.filter(node => opportunityStage.get(node.id) === 'Accepted').length;
          const closed = collectionNodes.filter(node => ['Rejected', 'Withdrawn'].includes(opportunityStage.get(node.id) ?? '')).length;
          summary += ` · ${accepted} accepted · ${closed} closed references`;
        }
        break;
      }
      case 'freelance':
        for (const verdict of freelanceVerdicts) {
          const group = collectionNodes.filter(node => freelanceVerdict.get(node.id) === verdict);
          addGroup(`verdict:${encodeURIComponent(verdict)}`, verdict, group,
            `Grouped only by the recorded ${verdict} verdict. ${verdict === 'Ignore' ? 'Ignored leads remain references.' : 'These leads remain unfinished research.'} No paid work, income or checkpoint completion is inferred.`);
        }
        if (collectionNodes.length) {
          const ignored = collectionNodes.filter(node => freelanceVerdict.get(node.id) === 'Ignore').length;
          summary += ` · ${ignored} ignored ${ignored === 1 ? 'reference' : 'references'}`;
        }
        break;
      case 'history':
        addGroup('reviewed', 'User-reviewed past work', collectionNodes,
          'Past accomplishments explicitly reviewed by the user. No dates or source credibility are inferred; these records grant no checkpoint credit or current mastery assessment.');
        if (collectionNodes.length) summary += ' · user-reviewed past work';
        break;
    }
    orbits.push({
      id, index: missionIds.length + index, kind, label, href, color, detail, summary,
      hubNodeId: 'core:careerhq', memberIds: memberIds(segments), segments,
    });
  }
  return orbits;
}
