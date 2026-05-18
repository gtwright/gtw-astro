import skinCssUrl from '@videojs/react/video/skin.css?url';
import { createPlayer } from '@videojs/react';
import { Video, VideoSkin, videoFeatures } from '@videojs/react/video';
import { useEffect, useRef } from 'react';

// Skin CSS is only needed once the player hydrates client-side. Loading it
// via injected <link> avoids a render-blocking stylesheet on post pages.
function useVideoSkinCss() {
  useEffect(() => {
    if (document.querySelector(`link[data-videojs-skin="1"]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = skinCssUrl;
    link.dataset.videojsSkin = '1';
    document.head.appendChild(link);
  }, []);
}

const Player = createPlayer({ features: videoFeatures });

declare global {
  interface Window {
    posthog?: {
      capture: (event: string, properties: Record<string, unknown>) => void;
    };
  }
}

interface AnalyticsProps {
  src: string;
  title: string;
}

function Analytics({ src, title }: AnalyticsProps) {
  // Derive the milestone bucket inside the selector. Shallow equality means
  // re-renders only happen when `milestone` actually steps up (0 → 25 → 50 →
  // 75), not on every timeupdate frame. currentTime/duration flow through so
  // the event payload has them; PostHog firing is gated by transition refs.
  const { paused, ended, milestone, currentTime, duration } = Player.usePlayer(
    (s) => {
      const pct = s.duration > 0 ? (s.currentTime / s.duration) * 100 : 0;
      return {
        paused: s.paused,
        ended: s.ended,
        milestone: Math.floor(pct / 25) * 25,
        currentTime: s.currentTime,
        duration: s.duration,
      };
    },
  );

  const startedRef = useRef(false);
  const completedRef = useRef(false);
  const lastMilestoneRef = useRef(0);
  const lastPausedRef = useRef(true);

  const capture = (event: string, extra: Record<string, unknown> = {}) => {
    if (typeof window === 'undefined' || !window.posthog) return;
    window.posthog.capture(event, {
      video_src: src,
      video_title: title,
      post_slug: window.location.pathname,
      current_time_seconds: Math.floor(currentTime || 0),
      duration_seconds: Math.floor(duration || 0),
      ...extra,
    });
  };

  useEffect(() => {
    if (lastPausedRef.current && !paused) {
      if (!startedRef.current) {
        startedRef.current = true;
        capture('video_started');
      } else {
        capture('video_resumed');
      }
    } else if (!lastPausedRef.current && paused && !ended) {
      capture('video_paused');
    }
    lastPausedRef.current = paused;
  }, [paused, ended]);

  useEffect(() => {
    if (ended && !completedRef.current) {
      completedRef.current = true;
      capture('video_completed');
    }
  }, [ended]);

  useEffect(() => {
    if (milestone > lastMilestoneRef.current && milestone > 0 && milestone < 100) {
      lastMilestoneRef.current = milestone;
      capture('video_progress', { milestone_percent: milestone });
    }
  }, [milestone]);

  return null;
}

interface Props {
  src: string;
  poster?: string;
  title: string;
}

export default function VideoIsland({ src, poster, title }: Props) {
  useVideoSkinCss();
  return (
    <Player.Provider>
      <VideoSkin>
        <Video src={src} poster={poster} playsInline preload="metadata" />
        <Analytics src={src} title={title} />
      </VideoSkin>
    </Player.Provider>
  );
}
