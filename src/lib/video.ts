export type VideoProvider = 'youtube' | 'mux' | 'mp4';

export interface ParsedVideoSource {
  provider: VideoProvider;
  id: string;
  raw: string;
}

const YOUTUBE_PATTERNS: RegExp[] = [
  /^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
  /^https?:\/\/youtu\.be\/([a-zA-Z0-9_-]{11})/,
  /^https?:\/\/(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  /^([a-zA-Z0-9_-]{11})$/,
];

const MUX_PATTERNS: RegExp[] = [
  /^mux:([a-zA-Z0-9]+)$/,
  /^https?:\/\/stream\.mux\.com\/([a-zA-Z0-9]+)/,
];

export function parseVideoSource(src: string): ParsedVideoSource {
  for (const pattern of YOUTUBE_PATTERNS) {
    const match = src.match(pattern);
    if (match) return { provider: 'youtube', id: match[1], raw: src };
  }

  for (const pattern of MUX_PATTERNS) {
    const match = src.match(pattern);
    if (match) return { provider: 'mux', id: match[1], raw: src };
  }

  return { provider: 'mp4', id: src, raw: src };
}
