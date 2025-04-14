'use client';

import React from 'react';
import { Mail, ExternalLink, MapPin, Phone } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const metadata = {
  title: 'Liên hệ',
  description: 'Thông tin liên hệ của chúng tôi',
};

export default function ContactPage() {
  const contact = {
    title: 'Liên hệ với chúng tôi',
    email: 'vcl.helloworld@gmail.com',
    description:
      'Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Vui lòng liên hệ với chúng tôi nếu bạn có bất kỳ câu hỏi hoặc yêu cầu nào.',
    address: 'Updating..., TP. Hồ Chí Minh, Việt Nam',
    phone: 'Updating...',
    socialMedia: [
      {
        name: 'Facebook',
        url: 'https://facebook.com/',
      },
      {
        name: 'LinkedIn',
        url: '#',
      },
      {
        name: 'Twitter',
        url: '#',
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary bg-opacity-10 mb-4">
          <Mail className="text-primary" size={28} />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold">{contact.title}</h1>
        <p className="text-base-content/60 mt-2 max-w-xl mx-auto">
          {contact.description}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="card bg-base-100 shadow-lg border border-base-300 h-min">
          <div className="card-body">
            <h2 className="text-2xl font-bold mb-4">Thông tin liên hệ</h2>

            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary text-primary-content rounded-full p-3">
                <Mail size={20} />
              </div>
              <div>
                <p className="font-medium">Email</p>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-primary flex items-center gap-1 hover:underline"
                >
                  {contact.email}
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary text-primary-content rounded-full p-3">
                <Phone size={20} />
              </div>
              <div>
                <p className="font-medium">Điện thoại</p>
                <a
                  href={`tel:${contact.phone}`}
                  className="text-primary flex items-center gap-1 hover:underline"
                >
                  {contact.phone}
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-primary text-primary-content rounded-full p-3">
                <MapPin size={20} />
              </div>
              <div>
                <p className="font-medium">Địa chỉ</p>
                <p>{contact.address}</p>
              </div>
            </div>

            {contact.socialMedia.length > 0 && (
              <div className="mt-6">
                <h3 className="font-medium mb-3">Kết nối với chúng tôi</h3>
                <div className="flex gap-2 flex-wrap">
                  {contact.socialMedia.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm gap-2"
                    >
                      {social.name}
                      <ExternalLink size={14} />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg border border-base-300 bg-gradient-to-br from-base-100 to-base-200">
          <div className="card-body">
            <h2 className="text-2xl font-bold mb-6">Gửi email cho chúng tôi</h2>

            <div className="flex flex-col items-center justify-center p-6 text-center">
              <Mail className="mb-4 text-primary" size={48} />
              <p className="mb-6">
                Hãy liên hệ với chúng tôi qua email để được hỗ trợ nhanh nhất.
                Chúng tôi sẽ phản hồi trong vòng 24 giờ làm việc.
              </p>
              <a
                href={`mailto:${contact.email}`}
                className="btn btn-primary btn-lg gap-2"
              >
                <Mail size={18} />
                Gửi email ngay
              </a>
            </div>

            <div className="mt-6 border-t border-base-300 pt-6">
              <h3 className="font-medium mb-3">Giờ làm việc</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-base-200 p-3 rounded-lg">
                  <p className="font-bold">Thứ Hai - Thứ Sáu</p>
                  <p>8:00 - 17:30</p>
                </div>
                <div className="bg-base-200 p-3 rounded-lg">
                  <p className="font-bold">Thứ Bảy</p>
                  <p>8:00 - 12:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
