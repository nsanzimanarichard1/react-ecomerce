import { useTheme } from '../../context/ThemeContext';

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  emptyMessage?: string;
}

export function Table<T extends Record<string, any>>({ 
  data, 
  columns, 
  loading = false, 
  emptyMessage = 'No data available' 
}: TableProps<T>) {
  const { isDark } = useTheme();

  if (loading) {
    return (
      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg`}>
        <div className="animate-pulse">
          <div className={`h-12 ${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-t-lg`}></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`h-16 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t`}></div>
          ))}
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-8 text-center`}>
        <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg overflow-hidden`}>
      <table className={`min-w-full ${isDark ? 'divide-gray-700' : 'divide-gray-200'} divide-y`}>
        <thead className={isDark ? 'bg-gray-900' : 'bg-gray-50'}>
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-700'} uppercase tracking-wider`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={`${isDark ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'} divide-y`}>
          {data.map((item, index) => (
            <tr key={index} className={isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
              {columns.map((column) => (
                <td key={String(column.key)} className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                  {column.render ? column.render(item) : String(item[column.key] || '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}