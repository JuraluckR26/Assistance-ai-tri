export type RequestSearchHistory = {
    assistantName: string;
    date: {
        start: string;
        end: string;
    }
};

export type ResponseHistory = {
    result_history: ResultHistoryItem[];
};

export type ResultHistoryItem = {
    id: string;
    type: string;
    assistantName: string;
    createdDate: string;
    createdBy: string;
    updatedDate: string;
    updatedBy: string;
    loginId: string;
    searchText: string;
    resultText: string;
    document: string;
    documentLocation: string;
    feedback: string;
    feedbackDetail: string;
    system: string;
    module: string;
    function: string;
    ticket: string;
    aiResult: string;
    custom1: string;
    custom2: string;
    custom3: string;
};

// API Response Types
export type ApiResponse<T> = {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
};

export type HistoryApiResponse = ApiResponse<ResponseHistory>;

// Error Types
export type ApiError = {
    message: string;
    status: number;
    details?: string;
};

// Request Validation Types
export type HistoryRequestValidation = {
    isValid: boolean;
    errors: string[];
};

// Filter Types
export type HistoryFilter = {
    assistantName?: string;
    dateRange?: {
        start: string;
        end: string;
    };
    searchText?: string;
    feedback?: string;
    system?: string;
    module?: string;
};

// Pagination Types
export type PaginationParams = {
    page: number;
    limit: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
};

export type PaginatedResponse<T> = {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
};
  