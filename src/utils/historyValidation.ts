import { RequestSearchHistory, HistoryRequestValidation } from '@/types/history.type';

export function validateHistoryRequest(value: RequestSearchHistory): HistoryRequestValidation {
    const errors: string[] = [];

    // Validate assistantName
    if (!value.assistantName || value.assistantName.trim() === '') {
        errors.push('Assistant name is required');
    }

    // Validate date object
    if (!value.date) {
        errors.push('Date range is required');
    } else {
        // Validate start date
        if (!value.date.start || value.date.start.trim() === '') {
            errors.push('Start date is required');
        } else if (!isValidDate(value.date.start)) {
            errors.push('Start date must be a valid date (YYYY-MM-DD format)');
        }

        // Validate end date
        if (!value.date.end || value.date.end.trim() === '') {
            errors.push('End date is required');
        } else if (!isValidDate(value.date.end)) {
            errors.push('End date must be a valid date (YYYY-MM-DD format)');
        }

        // Validate date range
        if (value.date.start && value.date.end && isValidDate(value.date.start) && isValidDate(value.date.end)) {
            const startDate = new Date(value.date.start);
            const endDate = new Date(value.date.end);
            
            if (startDate > endDate) {
                errors.push('Start date must be before or equal to end date');
            }

            // Check if date range is not too far in the future
            const today = new Date();
            if (startDate > today) {
                errors.push('Start date cannot be in the future');
            }

            // Check if date range is not too old (e.g., more than 2 years)
            const twoYearsAgo = new Date();
            twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
            if (endDate < twoYearsAgo) {
                errors.push('Date range cannot be older than 2 years');
            }
        }
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

function isValidDate(dateString: string): boolean {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime()) && /^\d{4}-\d{2}-\d{2}$/.test(dateString);
}

export function sanitizeHistoryRequest(value: RequestSearchHistory): RequestSearchHistory {
    return {
        assistantName: value.assistantName?.trim() || '',
        date: {
            start: value.date?.start?.trim() || '',
            end: value.date?.end?.trim() || ''
        }
    };
}

export function formatDateRange(startDate: string, endDate: string): string {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const startFormatted = start.toLocaleDateString('th-TH');
    const endFormatted = end.toLocaleDateString('th-TH');
    
    return `${startFormatted} - ${endFormatted}`;
}
