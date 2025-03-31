"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var axios_1 = require("axios");
var DOMAIN = 'https://truyentranh.online';
var API_BASE = 'https://otruyenapi.com/v1/api';
var STATIC_PATHS = [
    '/',
    '/list',
    '/list/sap-ra-mat',
    '/list/truyen-moi',
    '/list/dang-phat-hanh',
    '/list/hoan-thanh',
    '/categories',
];
function fetchCategories() {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.get("".concat(API_BASE, "/the-loai"))];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data.data.items.map(function (item) { return item.slug; })];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error fetching categories:', error_1);
                    return [2 /*return*/, []];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function fetchComicsByCategory(categorySlug) {
    return __awaiter(this, void 0, void 0, function () {
        var comics, page, totalPages, response, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    comics = new Map();
                    page = 1;
                    totalPages = 1;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    _a.label = 2;
                case 2:
                    if (!(page <= totalPages)) return [3 /*break*/, 4];
                    return [4 /*yield*/, axios_1.default.get("".concat(API_BASE, "/the-loai/").concat(categorySlug, "?page=").concat(page))];
                case 3:
                    response = _a.sent();
                    data = response.data.data;
                    if (!data || !data.items)
                        return [3 /*break*/, 4];
                    data.items.forEach(function (comic) {
                        comics.set(comic.slug, comic.updatedAt);
                    });
                    totalPages = Math.ceil(data.params.pagination.totalItems /
                        data.params.pagination.totalItemsPerPage);
                    page++;
                    return [3 /*break*/, 2];
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_2 = _a.sent();
                    console.error("Error fetching comics for category ".concat(categorySlug, ":"), error_2);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/, Array.from(comics.entries()).map(function (_a) {
                        var slug = _a[0], updatedAt = _a[1];
                        return ({
                            slug: slug,
                            updatedAt: updatedAt,
                        });
                    })];
            }
        });
    });
}
function generateSitemap() {
    return __awaiter(this, void 0, void 0, function () {
        var urlSet, currentDate, categories, _i, categories_1, category, comics, sitemapContent, sitemapPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    urlSet = new Set();
                    currentDate = new Date().toISOString();
                    STATIC_PATHS.forEach(function (path) {
                        urlSet.add("<url><loc>".concat(DOMAIN).concat(path, "</loc><lastmod>").concat(currentDate, "</lastmod></url>"));
                    });
                    return [4 /*yield*/, fetchCategories()];
                case 1:
                    categories = _a.sent();
                    _i = 0, categories_1 = categories;
                    _a.label = 2;
                case 2:
                    if (!(_i < categories_1.length)) return [3 /*break*/, 5];
                    category = categories_1[_i];
                    urlSet.add("<url><loc>".concat(DOMAIN, "/categories/").concat(category, "</loc><lastmod>").concat(currentDate, "</lastmod></url>"));
                    return [4 /*yield*/, fetchComicsByCategory(category)];
                case 3:
                    comics = _a.sent();
                    comics.forEach(function (_a) {
                        var slug = _a.slug, updatedAt = _a.updatedAt;
                        var lastmod = updatedAt ? updatedAt : currentDate;
                        urlSet.add("<url><loc>".concat(DOMAIN, "/comic/").concat(slug, "</loc><lastmod>").concat(lastmod, "</lastmod></url>"));
                    });
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5:
                    sitemapContent = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n  ".concat(Array.from(urlSet).join('\n  '), "\n</urlset>");
                    sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
                    fs.writeFileSync(sitemapPath, sitemapContent);
                    console.log('✅ Sitemap generated successfully at:', sitemapPath);
                    return [2 /*return*/];
            }
        });
    });
}
generateSitemap();
