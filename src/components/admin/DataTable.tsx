import { ReactNode, useState } from 'react';
import {
  Search, Filter, Download, Upload, MoreVertical, ChevronDown,
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Settings2
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { cn } from '../../lib/utils';

export interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (item: T) => ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchable?: boolean;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  filterable?: boolean;
  filterSlot?: ReactNode;
  exportable?: boolean;
  onExport?: () => void;
  importable?: boolean;
  onImport?: () => void;
  selectable?: boolean;
  onSelectionChange?: (selectedIds: string[]) => void;
  bulkActions?: ReactNode;
  pagination?: boolean;
  pageSize?: number;
  emptyState?: ReactNode;
  density?: 'comfortable' | 'compact' | 'spacious';
  onRowClick?: (item: T) => void;
  rowActions?: (item: T) => ReactNode;
  className?: string;
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  searchable = true,
  searchPlaceholder = 'Search...',
  onSearch,
  filterable = false,
  filterSlot,
  exportable = false,
  onExport,
  importable = false,
  onImport,
  selectable = false,
  onSelectionChange,
  bulkActions,
  pagination = true,
  pageSize = 10,
  emptyState,
  density = 'comfortable',
  onRowClick,
  rowActions,
  className
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(pageSize);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.map(col => col.key)
  );
  const [showFilters, setShowFilters] = useState(false);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    onSearch?.(query);
  };

  // Handle selection
  const toggleSelectAll = () => {
    if (selectedIds.length === data.length) {
      setSelectedIds([]);
      onSelectionChange?.([]);
    } else {
      const allIds = data.map(item => item.id);
      setSelectedIds(allIds);
      onSelectionChange?.(allIds);
    }
  };

  const toggleSelect = (id: string) => {
    const newSelectedIds = selectedIds.includes(id)
      ? selectedIds.filter(selectedId => selectedId !== id)
      : [...selectedIds, id];
    setSelectedIds(newSelectedIds);
    onSelectionChange?.(newSelectedIds);
  };

  // Handle sorting
  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  // Filter and sort data
  let processedData = [...data];

  // Apply search filter
  if (searchQuery && !onSearch) {
    processedData = processedData.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }

  // Apply sorting
  if (sortColumn) {
    processedData.sort((a, b) => {
      const aValue = (a as any)[sortColumn];
      const bValue = (b as any)[sortColumn];
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // Pagination
  const totalPages = Math.ceil(processedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = pagination ? processedData.slice(startIndex, endIndex) : processedData;

  // Visible columns
  const activeColumns = columns.filter(col => visibleColumns.includes(col.key));

  // Density classes
  const densityClasses = {
    comfortable: 'py-3',
    compact: 'py-2',
    spacious: 'py-4'
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Toolbar */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          {/* Search */}
          {searchable && (
            <div className="flex-1 max-w-sm">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2">
            {filterable && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            )}

            {exportable && (
              <Button variant="outline" size="sm" onClick={onExport}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            )}

            {importable && (
              <Button variant="outline" size="sm" onClick={onImport}>
                <Upload className="w-4 h-4 mr-2" />
                Import
              </Button>
            )}

            {/* Column Visibility */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings2 className="w-4 h-4 mr-2" />
                  Columns
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {columns.map(column => (
                  <DropdownMenuCheckboxItem
                    key={column.key}
                    checked={visibleColumns.includes(column.key)}
                    onCheckedChange={(checked) => {
                      setVisibleColumns(
                        checked
                          ? [...visibleColumns, column.key]
                          : visibleColumns.filter(key => key !== column.key)
                      );
                    }}
                  >
                    {column.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Filter Slot */}
        {filterable && showFilters && filterSlot && (
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            {filterSlot}
          </div>
        )}

        {/* Bulk Actions */}
        {selectable && selectedIds.length > 0 && bulkActions && (
          <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
              {selectedIds.length} item(s) selected
            </span>
            <div className="flex items-center gap-2">
              {bulkActions}
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-gray-800">
                {selectable && (
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedIds.length === data.length && data.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                )}
                {activeColumns.map(column => (
                  <TableHead
                    key={column.key}
                    className={cn(
                      column.width,
                      column.align === 'center' && 'text-center',
                      column.align === 'right' && 'text-right',
                      column.sortable && 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700'
                    )}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className="flex items-center gap-2">
                      <span>{column.label}</span>
                      {column.sortable && sortColumn === column.key && (
                        <ChevronDown
                          className={cn(
                            'w-4 h-4 transition-transform',
                            sortDirection === 'asc' && 'rotate-180'
                          )}
                        />
                      )}
                    </div>
                  </TableHead>
                ))}
                {rowActions && <TableHead className="w-12"></TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={activeColumns.length + (selectable ? 1 : 0) + (rowActions ? 1 : 0)}
                    className="h-64"
                  >
                    {emptyState || (
                      <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                        <p className="text-lg font-medium mb-1">No data found</p>
                        <p className="text-sm">Try adjusting your filters or search query</p>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((item) => (
                  <TableRow
                    key={item.id}
                    className={cn(
                      onRowClick && 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800',
                      selectedIds.includes(item.id) && 'bg-blue-50 dark:bg-blue-900/10'
                    )}
                    onClick={() => onRowClick?.(item)}
                  >
                    {selectable && (
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={selectedIds.includes(item.id)}
                          onCheckedChange={() => toggleSelect(item.id)}
                        />
                      </TableCell>
                    )}
                    {activeColumns.map(column => (
                      <TableCell
                        key={column.key}
                        className={cn(
                          densityClasses[density],
                          column.align === 'center' && 'text-center',
                          column.align === 'right' && 'text-right'
                        )}
                      >
                        {column.render
                          ? column.render(item)
                          : String((item as any)[column.key] || '-')}
                      </TableCell>
                    ))}
                    {rowActions && (
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        {rowActions(item)}
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Showing {startIndex + 1} to {Math.min(endIndex, processedData.length)} of{' '}
              {processedData.length} results
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-700 dark:text-gray-300">Rows per page:</p>
              <Select
                value={String(itemsPerPage)}
                onValueChange={(value) => {
                  setItemsPerPage(Number(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <div className="flex items-center gap-1 px-2">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Page {currentPage} of {totalPages}
                </span>
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
