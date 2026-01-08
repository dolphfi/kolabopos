export interface Category {
    id: string;
    name: string;
    category_slug: string;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface SubCategory {
    id: string;
    image: string;
    category_id: string;
    name: string;
    description: string;
    status: string;
    created_at: string;
    updated_at: string;
}

export const category: Category[] = [
    {
        id: "1",
        name: "Category 1",
        category_slug: "category-1",
        status: "Active",
        created_at: "2022-01-01",
        updated_at: "2022-01-01",
    },
    {
        id: "2",
        name: "Category 2",
        category_slug: "category-2",
        status: "Active",
        created_at: "2022-01-01",
        updated_at: "2022-01-01",
    },
    {
        id: "3",
        name: "Category 3",
        category_slug: "category-3",
        status: "Active",
        created_at: "2022-01-01",
        updated_at: "2022-01-01",
    },
    {
        id: "4",
        name: "Category 4",
        category_slug: "category-4",
        status: "Inactive",
        created_at: "2022-01-01",
        updated_at: "2022-01-01",
    },
];

export const subCategory: SubCategory[] = [
    {
        id: "1",
        image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=100&h=100&fit=crop',
        category_id: "1",
        name: "Sub Category 1",
        description: "Sub Category 1",
        status: "Inactive",
        created_at: "2022-01-01",
        updated_at: "2022-01-01",
    },
    {
        id: "2",
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=100&h=100&fit=crop",
        category_id: "1",
        name: "Sub Category 2",
        description: "Sub Category 2",
        status: "Active",
        created_at: "2022-01-01",
        updated_at: "2022-01-01",
    },
    {
        id: "3",
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=100&h=100&fit=crop",
        category_id: "1",
        name: "Sub Category 3",
        description: "Sub Category 3",
        status: "Active",
        created_at: "2022-01-01",
        updated_at: "2022-01-01",
    },
]