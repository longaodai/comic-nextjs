'use client';

import React from 'react';
import { Shield, Lock, AlertCircle } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const metadata = {
  title: 'Chính sách bảo mật',
  description: 'Chính sách bảo mật của website chúng tôi',
};

export default function PrivacyPage() {
  const privacy = {
    title: 'Chính sách bảo mật',
    lastUpdated: '15/04/2025',
    sections: [
      {
        id: 'collection',
        title: 'Thu thập thông tin',
        content: `<p>Chúng tôi thu thập thông tin cá nhân khi bạn đăng ký tài khoản, sử dụng dịch vụ của chúng tôi, hoặc liên hệ với chúng tôi. Thông tin cá nhân có thể bao gồm tên, địa chỉ email, số điện thoại, địa chỉ và thông tin thanh toán.</p>
                  <p>Chúng tôi cũng có thể thu thập thông tin không cá nhân, chẳng hạn như loại trình duyệt, thiết bị, thời gian truy cập và các trang đã xem.</p>`,
      },
      {
        id: 'usage',
        title: 'Sử dụng thông tin',
        content: `<p>Chúng tôi sử dụng thông tin thu thập được để:</p>
                  <ul>
                    <li>Cung cấp, duy trì và cải thiện dịch vụ của mình</li>
                    <li>Giao tiếp với bạn và phản hồi các yêu cầu của bạn</li>
                    <li>Cá nhân hóa trải nghiệm của bạn trên website của chúng tôi</li>
                    <li>Gửi cho bạn thông tin về các sản phẩm, dịch vụ và khuyến mãi có thể quan tâm</li>
                    <li>Phân tích và cải thiện hiệu suất của website</li>
                  </ul>`,
      },
      {
        id: 'protection',
        title: 'Bảo vệ thông tin',
        content: `<p>Chúng tôi thực hiện các biện pháp bảo mật hợp lý để bảo vệ thông tin cá nhân của bạn khỏi truy cập, sử dụng, thay đổi hoặc tiết lộ trái phép. Tuy nhiên, không có phương pháp truyền tải qua internet hoặc lưu trữ điện tử nào là 100% an toàn.</p>
                  <p>Chúng tôi sẽ lưu giữ thông tin cá nhân của bạn trong thời gian cần thiết để thực hiện các mục đích được nêu trong Chính sách bảo mật này, trừ khi luật pháp yêu cầu hoặc cho phép thời gian lưu giữ lâu hơn.</p>`,
      },
      {
        id: 'sharing',
        title: 'Chia sẻ thông tin',
        content: `<p>Chúng tôi không bán, trao đổi hoặc chuyển giao thông tin cá nhân của bạn cho bên thứ ba mà không có sự đồng ý của bạn, ngoại trừ trong các trường hợp sau:</p>
                  <ul>
                    <li>Khi cần thiết để cung cấp dịch vụ cho bạn (ví dụ: với các nhà cung cấp dịch vụ hỗ trợ website của chúng tôi)</li>
                    <li>Để tuân thủ luật pháp, quy định, hoặc yêu cầu pháp lý</li>
                    <li>Để bảo vệ quyền, tài sản hoặc sự an toàn của chúng tôi hoặc người khác</li>
                    <li>Trong trường hợp sáp nhập, mua lại hoặc bán tài sản, với điều kiện bên nhận đồng ý bảo vệ thông tin cá nhân của bạn</li>
                  </ul>`,
      },
      {
        id: 'cookies',
        title: 'Cookie và công nghệ theo dõi',
        content: `<p>Website của chúng tôi sử dụng cookie và các công nghệ theo dõi khác để cải thiện trải nghiệm của bạn, phân tích xu hướng và quản lý website. Cookie là các tệp nhỏ được lưu trữ trên thiết bị của bạn khi bạn truy cập một website.</p>
                  <p>Bạn có thể kiểm soát cách trình duyệt của mình xử lý cookie thông qua cài đặt trình duyệt. Tuy nhiên, việc vô hiệu hóa cookie có thể ảnh hưởng đến trải nghiệm của bạn trên website của chúng tôi.</p>`,
      },
      {
        id: 'rights',
        title: 'Quyền của bạn',
        content: `<p>Bạn có quyền:</p>
                  <ul>
                    <li>Truy cập thông tin cá nhân của bạn mà chúng tôi lưu giữ</li>
                    <li>Yêu cầu chỉnh sửa hoặc cập nhật thông tin không chính xác</li>
                    <li>Yêu cầu xóa thông tin cá nhân của bạn trong một số trường hợp</li>
                    <li>Phản đối hoặc hạn chế việc xử lý thông tin cá nhân của bạn</li>
                    <li>Rút lại sự đồng ý của bạn, nếu việc xử lý dựa trên sự đồng ý</li>
                  </ul>
                  <p>Để thực hiện các quyền này, vui lòng liên hệ với chúng tôi qua trang Liên hệ.</p>`,
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary bg-opacity-10 mb-4">
          <Shield className="text-primary" size={28} />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold">{privacy.title}</h1>
        <p className="text-base-content/60 mt-2">
          Cập nhật lần cuối: {privacy.lastUpdated}
        </p>
      </div>

      <div className="alert alert-info mb-6 flex gap-2">
        <AlertCircle />
        <span>
          Chúng tôi tôn trọng quyền riêng tư của bạn và cam kết bảo vệ thông tin
          cá nhân của bạn.
        </span>
      </div>

      <div className="card bg-base-100 shadow-lg border border-base-300">
        <div className="card-body">
          <div className="space-y-8">
            {privacy.sections.map((section) => (
              <div
                key={section.id}
                className="animate-in fade-in slide-in-from-bottom-5 duration-700"
              >
                <h2 className="text-xl md:text-2xl font-bold mb-3 flex items-center gap-2">
                  <Lock className="text-primary" size={20} />
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
          Nếu bạn có thắc mắc về chính sách bảo mật, vui lòng liên hệ với chúng
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
