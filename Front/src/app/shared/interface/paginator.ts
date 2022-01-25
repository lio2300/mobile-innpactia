export interface PaginatorModel {
    limit: number;
    offset: number;
    count: number;
    pageIndex: number;
    opcion: string | null;
    search: string | null;
}