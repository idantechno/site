// ⚙️ נוצר אוטומטית מהמדיה של עידן (scripts/posters). אל תערוך ידנית — הרץ מחדש.
export type MediaImage = { src: string; w: number; h: number };
export type MediaVideo = { src: string; poster: string; w: number; h: number };

export const MEDIA_IMAGES: MediaImage[] = [
  {
    "src": "/gallery/media/images/01.webp",
    "w": 1072,
    "h": 1920
  },
  {
    "src": "/gallery/media/images/02.webp",
    "w": 1920,
    "h": 1920
  },
  {
    "src": "/gallery/media/images/03.webp",
    "w": 1920,
    "h": 1920
  },
  {
    "src": "/gallery/media/images/04.webp",
    "w": 1072,
    "h": 1920
  },
  {
    "src": "/gallery/media/images/05.webp",
    "w": 1920,
    "h": 1920
  },
  {
    "src": "/gallery/media/images/06.webp",
    "w": 1920,
    "h": 1280
  }
];

export const MEDIA_VIDEOS: MediaVideo[] = [
  {
    "src": "/gallery/media/videos/01.mp4",
    "poster": "/gallery/media/videos/01-poster.webp",
    "w": 2156,
    "h": 3840
  },
  {
    "src": "/gallery/media/videos/02.mp4",
    "poster": "/gallery/media/videos/02-poster.webp",
    "w": 2160,
    "h": 3836
  },
  {
    "src": "/gallery/media/videos/03.mp4",
    "poster": "/gallery/media/videos/03-poster.webp",
    "w": 2148,
    "h": 3856
  },
  {
    "src": "/gallery/media/videos/04.mp4",
    "poster": "/gallery/media/videos/04-poster.webp",
    "w": 2156,
    "h": 3840
  },
  {
    "src": "/gallery/media/videos/05.mp4",
    "poster": "/gallery/media/videos/05-poster.webp",
    "w": 2160,
    "h": 3836
  },
  {
    "src": "/gallery/media/videos/06.mp4",
    "poster": "/gallery/media/videos/06-poster.webp",
    "w": 2156,
    "h": 3840
  },
  {
    "src": "/gallery/media/videos/07.mp4",
    "poster": "/gallery/media/videos/07-poster.webp",
    "w": 3528,
    "h": 2348
  }
];
