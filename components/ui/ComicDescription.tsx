'use client';

import { useState, useEffect } from 'react';

export default function ComicDescription({
  content,
}: {
  content: string | null;
}) {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    setHtmlContent(content || '');
  }, [content]);

  return (
    <div className="mt-4 text-base-content text-sm line-clamp-5">
      {htmlContent ? (
        <p dangerouslySetInnerHTML={{ __html: htmlContent }} />
      ) : (
        <p>Đang cập nhật</p>
      )}
    </div>
  );
}
