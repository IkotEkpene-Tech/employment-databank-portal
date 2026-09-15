export type ComplaintMode = "choice" | "message" | "chat";

export interface StatusModalState {
  open: boolean;
  title: string;
  message: string;
  type: "success" | "error";
}
