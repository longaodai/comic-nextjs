// /app/terms/page.tsx
'use client';

import React from 'react';
import { FileText, CheckCircle } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const metadata = {
  title: 'Điều khoản sử dụng',
  description: 'Điều khoản sử dụng của website chúng tôi',
};

export default function TermsPage() {
  // Data hardcode trực tiếp
  const terms = {
    title: 'Điều khoản sử dụng',
    lastUpdated: '15/04/2025',
    sections: [
      {
        id: 'first',
        title: 'Muc đích',
        content: `<p>Website này tạo ra nhằm mục đích học tập, những phần dưới là nội dung bổ sung cho trang term :v.</p>`,
      },
      {
        id: 'intro',
        title: 'Giới thiệu',
        content: `<p>Chào mừng bạn đến với dịch vụ của chúng tôi. Khi bạn sử dụng dịch vụ này, bạn đồng ý tuân theo các điều khoản và điều kiện được nêu trong tài liệu này. Vui lòng đọc kỹ trước khi sử dụng.</p>`,
      },
      {
        id: 'ip',
        title: 'Quyền sở hữu trí tuệ',
        content: `<p>Tất cả nội dung trên website này, bao gồm nhưng không giới hạn ở văn bản, hình ảnh, đồ họa, logo, biểu tượng, âm thanh, video và phần mềm, đều thuộc quyền sở hữu của chúng tôi hoặc các bên cấp phép cho chúng tôi.</p>
                  <p>Bạn không được sao chép, phân phối, sửa đổi, hiển thị công khai, trình diễn công khai, tái xuất bản, tải xuống, lưu trữ hoặc truyền bất kỳ nội dung nào trên website này, trừ khi được cho phép rõ ràng bằng văn bản từ chúng tôi.</p>`,
      },
      {
        id: 'limitation',
        title: 'Giới hạn trách nhiệm',
        content: `<p>Trong phạm vi tối đa được pháp luật cho phép, chúng tôi không chịu trách nhiệm về bất kỳ thiệt hại trực tiếp, gián tiếp, ngẫu nhiên, đặc biệt hoặc hậu quả nào phát sinh từ việc sử dụng hoặc không thể sử dụng dịch vụ của chúng tôi.</p>
                  <p>Chúng tôi không đảm bảo rằng dịch vụ sẽ không bị gián đoạn, không có lỗi hoặc không có thành phần có hại.</p>`,
      },
      {
        id: 'termination',
        title: 'Chấm dứt dịch vụ',
        content: `<p>Chúng tôi có thể chấm dứt hoặc tạm ngưng quyền truy cập của bạn vào website của chúng tôi mà không cần thông báo trước nếu bạn vi phạm các điều khoản sử dụng này hoặc tham gia vào bất kỳ hành vi nào mà chúng tôi xác định là có hại cho dịch vụ của chúng tôi hoặc người dùng khác.</p>`,
      },
      {
        id: 'law',
        title: 'Luật áp dụng',
        content: `<p>Các điều khoản sử dụng này được điều chỉnh bởi và diễn giải theo luật pháp Việt Nam. Bất kỳ tranh chấp nào phát sinh từ việc sử dụng website của chúng tôi sẽ được giải quyết tại các tòa án có thẩm quyền ở Việt Nam.</p>`,
      },
      {
        id: 'changes',
        title: 'Thay đổi điều khoản',
        content: `<p>Chúng tôi có thể thay đổi các điều khoản này vào bất kỳ lúc nào. Việc tiếp tục sử dụng website của chúng tôi sau khi thay đổi được đăng tải đồng nghĩa với việc bạn chấp nhận những thay đổi đó.</p>
                  <p>Chúng tôi sẽ cố gắng thông báo cho bạn về những thay đổi quan trọng đối với các điều khoản này, nhưng bạn nên kiểm tra trang này thường xuyên để biết bất kỳ cập nhật nào.</p>`,
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary bg-opacity-10 mb-4">
          <FileText className="text-primary" size={28} />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold">{terms.title}</h1>
        <p className="text-base-content/60 mt-2">
          Cập nhật lần cuối: {terms.lastUpdated}
        </p>
      </div>

      <div className="card bg-base-100 shadow-lg border border-base-300">
        <div className="card-body">
          <div className="space-y-8">
            {terms.sections.map((section) => (
              <div
                key={section.id}
                className="animate-in fade-in slide-in-from-bottom-5 duration-700"
              >
                <h2 className="text-xl md:text-2xl font-bold mb-3 flex items-center gap-2">
                  <CheckCircle className="text-primary" size={20} />
                  {section.title}
                </h2>
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-accent text-accent-content rounded-lg shadow-sm">
        <p className="text-sm">
          Nếu bạn có thắc mắc về điều khoản sử dụng, vui lòng liên hệ với chúng
          tôi qua{' '}
          <a href="/contact" className="underline font-medium">
            trang liên hệ
          </a>
          .
        </p>
      </div>
    </div>
  );
}
