import { useEffect, useState } from "react";

export function useStatistics(dataPointCount: number): Statistics[] {
  const [value, setValue] = useState<Statistics[]>([]);

  useEffect(() => {
    const unsub = window.electron.subscribeStatistics((stats) =>
      setValue((prev) => {
        const newData = [...prev, stats];
        if (newData.length > dataPointCount) { // 最大数量dataPointCount，超过就删除
          newData.shift();
        }
        return newData;
      })
    );
    return unsub;
  }, [dataPointCount]);

  return value;
}
