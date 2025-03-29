export interface SEOData {
  titleHead: string;
  descriptionHead: string;
  og_type: string;
  og_image: string[];
}

export interface ChapterNavigation {
  chapter_name?: string;
}

export interface ImageDetail {
  image_page: string;
  image_file: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Chapter {
  _id: string;
  filename: string;
  chapter_name: string;
  chapter_title: string;
  chapter_api_data: string;
  chapter_path?: string;
  chapter_image?: ImageDetail[];
}

export interface ChapterData {
  server_data: Chapter[];
}

export interface Comic {
  _id: string;
  name: string;
  content?: string;
  slug: string;
  origin_name: string[];
  status: string;
  thumb_url: string;
  sub_docquyen: boolean;
  category: Category[];
  updatedAt: string;
  chaptersLatest: Chapter[];
  chapters?: ChapterData[];
}

export interface Pagination {
  totalItems: number;
  totalItemsPerPage: number;
  currentPage: number;
  pageRanges: number;
}

export interface Params {
  type_slug: string;
  sortField: string;
  pagination: Pagination;
  itemsUpdateInDay: number;
}

export interface ComicsResponse {
  status: string;
  message: string;
  data: {
    seoOnPage: SEOData;
    items: Comic[];
    params: Params;
    type_list: string;
    APP_DOMAIN_FRONTEND: string;
    APP_DOMAIN_CDN_IMAGE: string;
  };
}
