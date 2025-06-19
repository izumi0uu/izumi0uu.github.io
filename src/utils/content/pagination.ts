import type { AnyCollection, PaginationProps } from "@/types/common";
import type { Page } from "astro";

/**
 * 从 Astro Page 对象中提取分页属性
 */
const pickPaginationPropsFromPage = (page: Page<AnyCollection>): PaginationProps => {
  const { url, currentPage, lastPage, start, end, total } = page;

  return {
    url,
    currentPage,
    lastPage,
    start,
    end,
    total,
  };
};

/**
 * 生成页码 URL 的辅助函数
 */
const generatePageUrl = (baseUrl: string, pageNumber: number): string => {
  // 移除末尾的页码（如果有）
  const cleanUrl = baseUrl.replace(/\/\d+\/?$/, "/");

  // 第一页不需要页码
  if (pageNumber === 1) {
    return cleanUrl;
  }

  // 其他页面添加页码
  return `${cleanUrl}${pageNumber}`;
};

/**
 * 检查是否应该显示分页组件
 */
const shouldShowPagination = (
  paginationProps: PaginationProps,
  showIfOnePage: boolean = false
): boolean => {
  return paginationProps.lastPage > 1 || showIfOnePage;
};

/**
 * 获取分页信息摘要
 */
const getPaginationSummary = (paginationProps: PaginationProps): string => {
  const { start, end, total } = paginationProps;
  return `显示 ${start + 1}-${end + 1} 项，共 ${total} 项`;
};

export { pickPaginationPropsFromPage, generatePageUrl, shouldShowPagination, getPaginationSummary };
