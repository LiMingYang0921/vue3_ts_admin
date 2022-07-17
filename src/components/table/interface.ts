interface IPaginationData {
  page: number,
  limit: number,
  total?: number,
}

interface ITableColumn {
  label: string,
  prop: string,
  type?: string,
  index?: string | ((index: number) => void),
  columnKey?: string,
  width?: string | number,
  minWidth?: string | number,
  fixed?: string | boolean,
  sortable?: boolean | string,
  sortMethod?: (a: number, b: number) => number,
  align?: 'left' | 'center' | 'right',
  className?: string
}

export { IPaginationData, ITableColumn }
