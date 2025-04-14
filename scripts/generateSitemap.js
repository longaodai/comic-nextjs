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
var DOMAIN = 'https://comicmoi.site';
var API_BASE = 'https://otruyenapi.com/v1/api';
var STATIC_PATHS = [
    '/',
    '/list',
    '/list/sap-ra-mat',
    '/list/truyen-moi',
    '/list/dang-phat-hanh',
    '/list/hoan-thanh',
    '/categories',
    '/contact',
    '/terms',
    '/privacy',
];
// Constants for sitemap size management
var MAX_URLS_PER_SITEMAP = 40000; // Keep under the 50,000 limit
var OUTPUT_DIR = path.join(process.cwd(), 'public');
var api = axios_1.default.create({
    timeout: 10000,
    headers: {
        Connection: 'keep-alive',
    },
});
api.interceptors.response.use(undefined, function (err) { return __awaiter(void 0, void 0, void 0, function () {
    var config, maxRetries, retryDelay;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                config = err.config || {};
                config.retryCount = config.retryCount || 0;
                maxRetries = 3;
                retryDelay = 1000;
                if (config.retryCount >= maxRetries) {
                    return [2 /*return*/, Promise.reject(err)];
                }
                config.retryCount += 1;
                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, retryDelay); })];
            case 1:
                _a.sent();
                return [2 /*return*/, api(config)];
        }
    });
}); });
function escapeXml(unsafe) {
    return unsafe.replace(/[<>&'"]/g, function (c) {
        switch (c) {
            case '<':
                return '&lt;';
            case '>':
                return '&gt;';
            case '&':
                return '&amp;';
            case "'":
                return '&apos;';
            case '"':
                return '&quot;';
            default:
                return c;
        }
    });
}
function createUrlEntry(loc, lastmod, priority, changefreq) {
    if (priority === void 0) { priority = '0.8'; }
    if (changefreq === void 0) { changefreq = 'daily'; }
    return "<url>\n    <loc>".concat(escapeXml(loc), "</loc>\n    <lastmod>").concat(lastmod.split('.')[0], "Z</lastmod>\n    <changefreq>").concat(changefreq, "</changefreq>\n    <priority>").concat(priority, "</priority>\n  </url>");
}
function fetchCategories() {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, api.get("".concat(API_BASE, "/the-loai"))];
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
        var comics, page, totalPages, firstResponse, firstData, pagePromises, responses, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    comics = new Map();
                    page = 1;
                    totalPages = 1;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, api.get("".concat(API_BASE, "/the-loai/").concat(categorySlug, "?page=").concat(page))];
                case 2:
                    firstResponse = _a.sent();
                    firstData = firstResponse.data.data;
                    if (!firstData || !firstData.items)
                        return [2 /*return*/, []];
                    firstData.items.forEach(function (comic) {
                        comics.set(comic.slug, comic.updatedAt);
                    });
                    totalPages = Math.ceil(firstData.params.pagination.totalItems /
                        firstData.params.pagination.totalItemsPerPage);
                    pagePromises = [];
                    for (page = 2; page <= totalPages; page++) {
                        pagePromises.push(api.get("".concat(API_BASE, "/the-loai/").concat(categorySlug, "?page=").concat(page)));
                    }
                    if (!(pagePromises.length > 0)) return [3 /*break*/, 4];
                    return [4 /*yield*/, Promise.allSettled(pagePromises)];
                case 3:
                    responses = _a.sent();
                    responses.forEach(function (result) {
                        if (result.status === 'fulfilled') {
                            var data = result.value.data.data;
                            if (data && data.items) {
                                data.items.forEach(function (comic) {
                                    comics.set(comic.slug, comic.updatedAt);
                                });
                            }
                        }
                    });
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_2 = _a.sent();
                    console.error("Error fetching comics for category ".concat(categorySlug, ":"), error_2);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/, Array.from(comics.entries()).map(function (_a) {
                        var slug = _a[0], updatedAt = _a[1];
                        return ({
                            slug: slug,
                            updatedAt: updatedAt || new Date().toISOString(),
                        });
                    })];
            }
        });
    });
}
// Function to write a sitemap file
function writeSitemap(filename, urls) {
    var content = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n  ".concat(urls.join('\n  '), "\n</urlset>");
    fs.writeFileSync(path.join(OUTPUT_DIR, filename), content);
}
// Function to write the sitemap index file
function writeSitemapIndex(sitemapFiles) {
    var sitemapEntries = sitemapFiles.map(function (file) { return "<sitemap>\n    <loc>".concat(DOMAIN, "/").concat(file.filename, "</loc>\n    <lastmod>").concat(file.lastmod, "</lastmod>\n  </sitemap>"); });
    var indexContent = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<sitemapindex xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n  ".concat(sitemapEntries.join('\n  '), "\n</sitemapindex>");
    fs.writeFileSync(path.join(OUTPUT_DIR, 'sitemap.xml'), indexContent);
}
function generateSitemaps() {
    return __awaiter(this, void 0, void 0, function () {
        var currentDate, sitemapFiles, staticUrlEntries, staticSitemapFile, categories, currentSitemapUrls, currentSitemapIndex, _i, categories_1, category, categoryUrl, comics, _a, comics_1, _b, slug, updatedAt, comicUrl, filename, filename;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    console.time('Sitemap generation');
                    // Ensure output directory exists
                    if (!fs.existsSync(OUTPUT_DIR)) {
                        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
                    }
                    currentDate = new Date().toISOString();
                    sitemapFiles = [];
                    staticUrlEntries = STATIC_PATHS.map(function (staticPath) {
                        return createUrlEntry("".concat(DOMAIN).concat(staticPath), currentDate, '1.0', 'weekly');
                    });
                    staticSitemapFile = 'sitemap-static.xml';
                    writeSitemap(staticSitemapFile, staticUrlEntries);
                    sitemapFiles.push({ filename: staticSitemapFile, lastmod: currentDate });
                    console.log("Created static sitemap with ".concat(staticUrlEntries.length, " URLs"));
                    return [4 /*yield*/, fetchCategories()];
                case 1:
                    categories = _c.sent();
                    console.log("Fetched ".concat(categories.length, " categories"));
                    currentSitemapUrls = [];
                    currentSitemapIndex = 1;
                    _i = 0, categories_1 = categories;
                    _c.label = 2;
                case 2:
                    if (!(_i < categories_1.length)) return [3 /*break*/, 5];
                    category = categories_1[_i];
                    categoryUrl = createUrlEntry("".concat(DOMAIN, "/categories/").concat(category), currentDate, '0.9', 'weekly');
                    currentSitemapUrls.push(categoryUrl);
                    return [4 /*yield*/, fetchComicsByCategory(category)];
                case 3:
                    comics = _c.sent();
                    console.log("Fetched ".concat(comics.length, " comics for category \"").concat(category, "\""));
                    // Create URL entries for comics
                    for (_a = 0, comics_1 = comics; _a < comics_1.length; _a++) {
                        _b = comics_1[_a], slug = _b.slug, updatedAt = _b.updatedAt;
                        comicUrl = createUrlEntry("".concat(DOMAIN, "/comic/").concat(slug), updatedAt, '0.8', 'daily');
                        currentSitemapUrls.push(comicUrl);
                        // If we've reached the limit, write the current sitemap and start a new one
                        if (currentSitemapUrls.length >= MAX_URLS_PER_SITEMAP) {
                            filename = "sitemap-comics-".concat(currentSitemapIndex, ".xml");
                            writeSitemap(filename, currentSitemapUrls);
                            sitemapFiles.push({ filename: filename, lastmod: currentDate });
                            console.log("Created sitemap ".concat(filename, " with ").concat(currentSitemapUrls.length, " URLs"));
                            // Reset for next sitemap
                            currentSitemapUrls = [];
                            currentSitemapIndex++;
                        }
                    }
                    _c.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5:
                    // Write any remaining URLs to a final sitemap
                    if (currentSitemapUrls.length > 0) {
                        filename = "sitemap-comics-".concat(currentSitemapIndex, ".xml");
                        writeSitemap(filename, currentSitemapUrls);
                        sitemapFiles.push({ filename: filename, lastmod: currentDate });
                        console.log("Created sitemap ".concat(filename, " with ").concat(currentSitemapUrls.length, " URLs"));
                    }
                    // Create the sitemap index file
                    writeSitemapIndex(sitemapFiles);
                    console.timeEnd('Sitemap generation');
                    console.log("\u2705 Successfully generated ".concat(sitemapFiles.length, " sitemaps with a sitemap index"));
                    return [2 /*return*/];
            }
        });
    });
}
generateSitemaps().catch(function (error) {
    console.error('Failed to generate sitemaps:', error);
    process.exit(1);
});
