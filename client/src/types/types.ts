export type SnackbarType = "success" | "error" | null;
export interface SleepChartProps {
  userName: string;
}

export interface SleepChartModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  userName: string | null;
}
