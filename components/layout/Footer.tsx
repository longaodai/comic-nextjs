import {
  COMIC_LIST_CATEGORIES,
  COMIC_LIST_TYPE,
  SITE_NAME,
} from '@/utils/constants';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, BookOpen, Star, Clock, Newspaper } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral text-neutral-content py-10 mt-20">
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Us Column */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4 text-primary-content">
              Về Chúng Tôi
            </h2>
            <div className="flex flex-col items-start space-y-4">
              <div className="relative w-40 h-12">
                <Image
                  src="/assets/images/logo-light.png"
                  alt={`Logo - ${SITE_NAME}`}
                  fill
                  className="object-contain"
                  sizes="160px"
                  priority
                />
              </div>
              <p className="text-sm opacity-85">
                {SITE_NAME} - Trang web đọc truyện tranh miễn phí với hàng nghìn
                bộ truyện hấp dẫn được cập nhật liên tục.
              </p>
            </div>
          </div>

          {/* Categories Column */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4 text-primary-content">
              Thể Loại
            </h2>
            <div className="collapse collapse-arrow bg-base-200 text-base-content rounded-lg">
              <input type="checkbox" className="peer" />
              <div className="collapse-title font-medium flex items-center">
                Xem tất cả thể loại
                <ChevronDown
                  className="ml-2 transition-transform peer-checked:rotate-180"
                  size={16}
                />
              </div>
              <div className="collapse-content">
                <div className="grid grid-cols-2 gap-y-2 gap-x-4 max-h-60 overflow-y-auto pr-2">
                  {COMIC_LIST_CATEGORIES.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/categories/${category.slug}`}
                      className="hover:text-primary transition-colors duration-200 truncate"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {COMIC_LIST_CATEGORIES.slice(0, 6).map((category) => (
                <Link
                  key={`featured-${category.slug}`}
                  href={`/categories/${category.slug}`}
                  className="badge badge-outline hover:badge-primary transition-colors duration-200"
                >
                  {category.name}
                </Link>
              ))}
              <Link href="/categories" className="badge badge-primary">
                Xem tất cả
              </Link>
            </div>
          </div>

          {/* Comic List Column */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4 text-primary-content">
              Danh Mục
            </h2>
            <ul className="menu bg-base-200 w-full rounded-box text-base-content">
              {COMIC_LIST_TYPE.map((item, index) => {
                let IconComponent;
                if (index === 0) IconComponent = Newspaper;
                else if (index === 1) IconComponent = Clock;
                else if (index === 2) IconComponent = Star;
                else IconComponent = BookOpen;

                return (
                  <li key={item.url}>
                    <Link
                      href={item.url}
                      className="flex items-center hover:text-primary"
                    >
                      <IconComponent size={16} className="mr-2" />
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact & Newsletter Column */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4 text-primary-content">
              Liên Hệ & Cập Nhật
            </h2>
            <div className="flex flex-col space-y-2">
              <Link
                href="https://t.me/+OWOn-ypgcrIyMzc1"
                className="btn btn-outline btn-sm w-full"
              >
                Telegram
              </Link>
              <Link
                href="mailto:vcl.helloworld@gmail.com"
                className="btn btn-outline btn-sm w-full"
              >
                Email: vcl.helloworld@gmail.com
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="divider my-6"></div>
        <div className="flex flex-col-reverse md:flex-row justify-between items-center">
          <div className="text-sm opacity-75 mt-4 md:mt-0">
            © {currentYear} {SITE_NAME}. All Rights Reserved.
          </div>
          <div className="flex space-x-4">
            <Link
              href="/terms"
              className="text-sm hover:text-primary transition-colors duration-200"
            >
              Điều khoản sử dụng
            </Link>
            <Link
              href="/privacy"
              className="text-sm hover:text-primary transition-colors duration-200"
            >
              Chính sách bảo mật
            </Link>
            <Link
              href="/contact"
              className="text-sm hover:text-primary transition-colors duration-200"
            >
              Liên hệ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
