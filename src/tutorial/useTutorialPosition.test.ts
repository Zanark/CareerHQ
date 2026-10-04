import { describe, expect, it } from 'vitest';
import { clampTutorialPosition } from './useTutorialPosition';

describe('tutorial position containment', () => {
  it('keeps a chosen position when there is room', () => {
    expect(clampTutorialPosition({ left: 100, top: 140 }, { width: 440, height: 380 }, { width: 1440, height: 1000 }))
      .toEqual({ left: 100, top: 140 });
  });

  it('clamps every edge with room for the border', () => {
    expect(clampTutorialPosition({ left: -100, top: -200 }, { width: 440, height: 380 }, { width: 1440, height: 1000 }))
      .toEqual({ left: 10, top: 10 });
    expect(clampTutorialPosition({ left: 2000, top: 2000 }, { width: 440, height: 380 }, { width: 1440, height: 1000 }))
      .toEqual({ left: 990, top: 610 });
  });

  it('leaves a full-width mobile coach movable vertically', () => {
    expect(clampTutorialPosition({ left: 200, top: 200 }, { width: 300, height: 450 }, { width: 320, height: 844 }))
      .toEqual({ left: 10, top: 200 });
  });

  it('reclamps after the coach grows or the viewport shrinks', () => {
    expect(clampTutorialPosition({ left: 700, top: 650 }, { width: 440, height: 500 }, { width: 900, height: 700 }))
      .toEqual({ left: 450, top: 190 });
  });

  it('keeps the handle reachable when there is less room than the panel', () => {
    expect(clampTutorialPosition({ left: 100, top: 100 }, { width: 440, height: 400 }, { width: 300, height: 200 }))
      .toEqual({ left: 10, top: 10 });
  });
});
