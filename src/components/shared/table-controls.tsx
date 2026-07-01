'use client';

import { ChevronLeftIcon, ChevronRightIcon, RefreshCwIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Button, Input, Label, Skeleton, TableCell, TableHead, TableRow } from '@/components/ui';
import { cn } from '@/lib';

import { NativeSelect } from './native-select';

const pageSizeOptions = ['10', '25', '50'];
const defaultTablePageSize = 10;
const maxPageButtons = 7;
const searchDebounceMs = 800;

export type SortDirection = 'asc' | 'desc';

export interface UrlTableState<TSortBy extends string> {
  page: number;
  pageSize: number;
  search: string;
  sortBy: TSortBy;
  sortDir: SortDirection;
  toggleSort: (sortBy: TSortBy) => void;
  update: (nextState: Partial<UrlTableStateUpdate<TSortBy>>) => void;
}

interface UrlTableStateUpdate<TSortBy extends string> {
  page: number;
  pageSize: number;
  search: string;
  sortBy: TSortBy;
  sortDir: SortDirection;
}

export function useUrlTableState<TSortBy extends string>({
  defaultSortBy,
  sortFields,
}: {
  defaultSortBy: TSortBy;
  sortFields: TSortBy[];
}): UrlTableState<TSortBy> {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parsePositiveInteger(searchParams.get('page'), 1);
  const pageSize = parsePageSize(searchParams.get('pageSize'));
  const search = searchParams.get('search') ?? '';
  const sortBy = parseSortBy(searchParams.get('sortBy'), sortFields, defaultSortBy);
  const sortDir = parseSortDirection(searchParams.get('sortDir'));

  const update = useCallback(
    (nextState: Partial<UrlTableStateUpdate<TSortBy>>) => {
      const params = new URLSearchParams(searchParams.toString());
      const resolvedSearch = nextState.search ?? search;

      params.set('page', String(nextState.page ?? page));
      params.set('pageSize', String(nextState.pageSize ?? pageSize));
      params.set('sortBy', nextState.sortBy ?? sortBy);
      params.set('sortDir', nextState.sortDir ?? sortDir);

      if (resolvedSearch.trim()) {
        params.set('search', resolvedSearch);
      } else {
        params.delete('search');
      }

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [page, pageSize, pathname, router, search, searchParams, sortBy, sortDir],
  );

  const toggleSort = useCallback(
    (nextSortBy: TSortBy) => {
      update({
        page: 1,
        sortBy: nextSortBy,
        sortDir: sortBy === nextSortBy && sortDir === 'asc' ? 'desc' : 'asc',
      });
    },
    [sortBy, sortDir, update],
  );

  return {
    page,
    pageSize,
    search,
    sortBy,
    sortDir,
    toggleSort,
    update,
  };
}

export function SortableTableHead<TSortBy extends string>({
  label,
  sortBy,
  tableState,
}: {
  label: string;
  sortBy: TSortBy;
  tableState: UrlTableState<TSortBy>;
}) {
  const isActive = tableState.sortBy === sortBy;

  return (
    <TableHead>
      <button
        type="button"
        className="inline-flex items-center gap-2 font-medium text-foreground"
        onClick={() => tableState.toggleSort(sortBy)}
      >
        {label}
        <span className="text-[11px] text-muted-foreground">
          {isActive ? tableState.sortDir.toUpperCase() : 'Sort'}
        </span>
      </button>
    </TableHead>
  );
}

export function TableActions({
  isLoading,
  onRefresh,
  onSearchChange,
  search,
  searchPlaceholder,
}: {
  isLoading: boolean;
  onRefresh: () => Promise<void>;
  onSearchChange: (value: string) => void;
  search: string;
  searchPlaceholder: string;
}) {
  const [searchInput, setSearchInput] = useState(search);

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  useEffect(() => {
    if (searchInput === search) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      onSearchChange(searchInput);
    }, searchDebounceMs);

    return () => window.clearTimeout(timeoutId);
  }, [onSearchChange, search, searchInput]);

  return (
    <div className="flex flex-wrap gap-2">
      <Input
        className="w-full sm:w-60"
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
        placeholder={searchPlaceholder}
      />
      <Button variant="outline" disabled={isLoading} onClick={() => void onRefresh()}>
        <RefreshCwIcon className={cn('size-4', isLoading && 'animate-spin')} />
        Refresh
      </Button>
    </div>
  );
}

export function TablePaginator({
  limit,
  onLimitChange,
  onPageChange,
  page,
  total,
  visibleCount,
}: {
  limit: number;
  onLimitChange: (limit: number) => void;
  onPageChange: (page: number) => void;
  page: number;
  total: number;
  visibleCount: number;
}) {
  const pageCount = Math.max(1, Math.ceil(total / limit));
  const currentPage = Math.min(page, pageCount);
  const start = total === 0 ? 0 : (currentPage - 1) * limit + 1;
  const end = total === 0 ? 0 : start + visibleCount - 1;
  const pageNumbers = useMemo(
    () => getVisiblePageNumbers(currentPage, pageCount),
    [currentPage, pageCount],
  );
  const [pageInput, setPageInput] = useState(String(currentPage));

  useEffect(() => {
    setPageInput(String(currentPage));
  }, [currentPage]);

  function handlePageInputSubmit(event: SubmitEvent) {
    event.preventDefault();
    const nextPage = clampPage(parsePositiveInteger(pageInput, currentPage), pageCount);
    setPageInput(String(nextPage));
    onPageChange(nextPage);
  }

  return (
    <div className="mt-4 flex flex-col gap-3 border-t border-gray-200 pt-4 text-sm text-muted-foreground">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p>
          Showing {start}-{end} of {total}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Label className="text-muted-foreground" htmlFor="table-page-size">
            Rows
          </Label>
          <NativeSelect
            id="table-page-size"
            value={String(limit)}
            onChange={(value) => onLimitChange(Number(value))}
            options={pageSizeOptions}
          />
          <Button
            size="icon-sm"
            variant="outline"
            disabled={currentPage <= 1}
            aria-label="Previous page"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          >
            <ChevronLeftIcon className="size-4" />
          </Button>
          <div className="flex items-center gap-1">
            {pageNumbers.map((item, index) =>
              item === 'ellipsis' ? (
                <span key={`${item}-${index}`} className="px-2 text-muted-foreground">
                  ...
                </span>
              ) : (
                <Button
                  key={item}
                  size="sm"
                  variant={item === currentPage ? 'default' : 'outline'}
                  onClick={() => onPageChange(item)}
                >
                  {item}
                </Button>
              ),
            )}
          </div>
          <Button
            size="icon-sm"
            variant="outline"
            disabled={currentPage >= pageCount}
            aria-label="Next page"
            onClick={() => onPageChange(Math.min(pageCount, currentPage + 1))}
          >
            <ChevronRightIcon className="size-4" />
          </Button>
        </div>
      </div>
      <form
        className="flex flex-wrap items-center gap-2 md:justify-end"
        onSubmit={(event) => void handlePageInputSubmit(event.nativeEvent as SubmitEvent)}
      >
        <Label className="text-muted-foreground" htmlFor="table-page-input">
          Go to page
        </Label>
        <Input
          id="table-page-input"
          className="w-20"
          inputMode="numeric"
          min={1}
          max={pageCount}
          type="number"
          value={pageInput}
          onChange={(event) => setPageInput(event.target.value)}
        />
        <span className="text-muted-foreground">of {pageCount}</span>
        <Button size="sm" type="submit" variant="outline">
          Go
        </Button>
      </form>
    </div>
  );
}

export function EmptyTableRow({ colSpan, label }: { colSpan: number; label: string }) {
  return (
    <TableRow>
      <TableCell className="text-muted-foreground" colSpan={colSpan}>
        {label}
      </TableCell>
    </TableRow>
  );
}

export function LoadingTableRow({
  colSpan,
  label = 'Loading data...',
}: {
  colSpan: number;
  label?: string;
}) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan}>
        <div className="flex flex-col gap-3 py-2">
          <div className="text-sm text-muted-foreground">{label}</div>
          <div className="grid gap-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}

type PageWindowItem = number | 'ellipsis';

function getVisiblePageNumbers(currentPage: number, pageCount: number): PageWindowItem[] {
  if (pageCount <= maxPageButtons) {
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  const pages = new Set<number>([1, pageCount]);
  const start = Math.max(2, currentPage - 2);
  const end = Math.min(pageCount - 1, currentPage + 2);

  for (let pageNumber = start; pageNumber <= end; pageNumber += 1) {
    pages.add(pageNumber);
  }

  return Array.from(pages)
    .sort((a, b) => a - b)
    .flatMap<PageWindowItem>((pageNumber, index, sortedPages) => {
      const previous = sortedPages[index - 1];
      if (previous && pageNumber - previous > 1) {
        return ['ellipsis', pageNumber];
      }

      return [pageNumber];
    });
}

function clampPage(page: number, pageCount: number): number {
  return Math.min(Math.max(page, 1), pageCount);
}

function parsePositiveInteger(value: string | null, fallback: number): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function parsePageSize(value: string | null): number {
  const parsed = parsePositiveInteger(value, defaultTablePageSize);
  return pageSizeOptions.includes(String(parsed)) ? parsed : defaultTablePageSize;
}

function parseSortBy<TSortBy extends string>(
  value: string | null,
  sortFields: TSortBy[],
  fallback: TSortBy,
): TSortBy {
  return sortFields.includes(value as TSortBy) ? (value as TSortBy) : fallback;
}

function parseSortDirection(value: string | null): SortDirection {
  return value === 'asc' ? 'asc' : 'desc';
}
