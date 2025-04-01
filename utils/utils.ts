import { COMING_SOON, COMPLETED, ONGOING } from './constants';

export function timeAgo(dateString: string): string {
  const now = new Date();
  const updatedDate = new Date(dateString);
  const diffInSeconds = Math.floor(
    (now.getTime() - updatedDate.getTime()) / 1000
  );

  if (diffInSeconds < 60) return 'Just now';
  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes < 60) return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years > 1 ? 's' : ''} ago`;
}

interface Chapter {
  chapter_name: string;
}

export function getLatestChapter(chapters: Chapter[]): number | string {
  if (!chapters || chapters.length === 0) return '?';

  const parsedChapters = chapters
    .map((chap) => parseInt(chap.chapter_name, 10))
    .filter((num) => !isNaN(num));

  return parsedChapters.length > 0 ? Math.max(...parsedChapters) : '?';
}

export function getComicStatus(status: string): string {
  switch (status) {
    case ONGOING:
      return 'Đang cập nhật';

    case COMPLETED:
      return 'Hoàn thành';
    case COMING_SOON:
    default:
      return 'Hot';
  }
}
