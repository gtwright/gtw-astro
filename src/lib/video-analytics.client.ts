import type Plyr from 'plyr';

declare global {
  interface Window {
    posthog?: {
      capture: (event: string, properties: Record<string, unknown>) => void;
    };
  }
}

function capture(event: string, wrapper: HTMLElement, extra: Record<string, unknown> = {}) {
  if (typeof window === 'undefined' || !window.posthog) return;
  window.posthog.capture(event, {
    video_provider: wrapper.dataset.videoProvider,
    video_id: wrapper.dataset.videoSrcId,
    video_title: wrapper.dataset.videoTitle,
    post_slug: window.location.pathname,
    ...extra,
  });
}

export function attachPlyrAnalytics(wrapper: HTMLElement, player: Plyr): void {
  if (wrapper.dataset.analyticsAttached === '1') return;
  wrapper.dataset.analyticsAttached = '1';

  let started = false;
  let lastMilestone = 0;

  const common = () => ({
    current_time_seconds: Math.floor(player.currentTime || 0),
    duration_seconds: Math.floor(player.duration || 0),
  });

  player.on('playing', () => {
    if (!started) {
      started = true;
      capture('video_started', wrapper, common());
    } else {
      capture('video_resumed', wrapper, common());
    }
  });

  player.on('pause', () => {
    capture('video_paused', wrapper, common());
  });

  player.on('ended', () => {
    capture('video_completed', wrapper, common());
  });

  player.on('timeupdate', () => {
    const duration = player.duration;
    if (!duration) return;
    const pct = (player.currentTime / duration) * 100;
    const milestone = Math.floor(pct / 25) * 25;
    if (milestone > lastMilestone && milestone > 0 && milestone < 100) {
      lastMilestone = milestone;
      capture('video_progress', wrapper, {
        ...common(),
        milestone_percent: milestone,
      });
    }
  });
}
