export interface Product{
    id: number;
    name: string;
    price: number;
    description?: string | null,
}

export interface Category {
    id: number;
    name : string;
    description?: string | null,

}