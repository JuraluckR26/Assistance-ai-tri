import { getHistory, validateDateRange, formatDateForAPI } from '@/lib/api/historyService';
import { RequestSearchHistory } from '@/types/history.type';

// ตัวอย่างการใช้งาน History Service
export async function exampleHistoryUsage() {
    try {
        // 1. สร้าง request object
        const historyRequest: RequestSearchHistory = {
            assistantName: "KhunJaiDee",
            date: {
                start: "2024-01-01",
                end: "2024-12-31"
            }
        };

        // 2. ตรวจสอบ date range
        const isValidRange = validateDateRange(
            historyRequest.date.start, 
            historyRequest.date.end
        );
        
        if (!isValidRange) {
            console.error("Invalid date range");
            return;
        }

        // 3. เรียก API
        const historyData = await getHistory(historyRequest);
        
        if (historyData) {
            console.log("History data received:", historyData);
            console.log("Total records:", historyData.result_history.length);
            
            // 4. ประมวลผลข้อมูล
            historyData.result_history.forEach((item, index) => {
                console.log(`Record ${index + 1}:`, {
                    id: item.id,
                    searchText: item.searchText,
                    createdDate: item.createdDate,
                    feedback: item.feedback
                });
            });
        }

    } catch (error) {
        console.error("Error in history usage:", error);
    }
}

// ตัวอย่างการใช้งานกับ React Component
export const useHistoryData = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<ResponseHistory | null>(null);

    const fetchHistory = async (request: RequestSearchHistory) => {
        setLoading(true);
        setError(null);
        
        try {
            const result = await getHistory(request);
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, data, fetchHistory };
};

// ตัวอย่างการใช้งานใน Component
/*
import { useHistoryData } from '@/examples/historyUsage';

function HistoryComponent() {
    const { loading, error, data, fetchHistory } = useHistoryData();

    const handleSearch = () => {
        fetchHistory({
            assistantName: "KhunJaiDee",
            date: {
                start: "2024-01-01",
                end: "2024-12-31"
            }
        });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <button onClick={handleSearch}>Load History</button>
            {data && (
                <div>
                    <h3>History Records: {data.result_history.length}</h3>
                    {data.result_history.map((item) => (
                        <div key={item.id}>
                            <p>Search: {item.searchText}</p>
                            <p>Date: {item.createdDate}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
*/

