import axios from 'axios';

export interface PerformanceResultData {
  value: string;
  title: string;
}

export interface PerformanceData {
  types: string[];
  result: {
    files: PerformanceResultData;
    lines: PerformanceResultData;
    nodes: PerformanceResultData;
    identifiers: PerformanceResultData;
    symbols: PerformanceResultData;
    types: PerformanceResultData;
    memory_used: PerformanceResultData;
    'i/o_read': PerformanceResultData;
    'i/o_write': PerformanceResultData;
    parse_time: PerformanceResultData;
    bind_time: PerformanceResultData;
    check_time: PerformanceResultData;
    emit_time: PerformanceResultData;
    total_time: PerformanceResultData;
  };
}

interface PerformanceDateResult {[key: string]: PerformanceData[]; }

interface PerformanceCommitResult {[key: string]: PerformanceDateResult; }

interface PerformanceBranchName {[key: string]: PerformanceCommitResult; }

export type PerformanceListData = PerformanceBranchName;

export interface IPerformanceService {
  get(): Promise<PerformanceListData>;
}

export function PerformanceService(performanceDataUrl: string): IPerformanceService {
    return {
        get: (): Promise<PerformanceListData> => {
            return axios.get(`${performanceDataUrl}performance.json`).then((result: { data: PerformanceListData }) => {
                return result.data;
            });
        },
    };

}
