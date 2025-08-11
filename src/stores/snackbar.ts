import { defineStore } from "pinia";

//枚舉 TS要使用as const方式使用枚舉
export const MessageType = {
  Info: "info",
  Error: "error",
  Success: "success",
  Warning: "warning",
} as const;
export type MessageTypeEnum = (typeof MessageType)[keyof typeof MessageType];

export const useSnackbarStore = defineStore("snackbar", {
  state: () => ({
    show: false,
    message: "",
    color: "info",
    icon: "mdi-information",
    iconColor: "blue-darken-4",
  }),
  actions: {
    trigger(message: string, level: MessageTypeEnum) {
      this.message = message;
      this.color = level;
      this.show = true;
      switch (level) {
        case MessageType.Error:
          this.icon = "mdi-alert-circle";
          this.iconColor = "red-darken-4";
          break;
        case MessageType.Success:
          this.icon = "mdi-check-circle";
          this.iconColor = "green-darken-4";
          break;
        case MessageType.Warning:
          this.icon = "mdi-alert";
          this.iconColor = "orange-darken-4";
          break;
        default:
          this.icon = "mdi-information";
          this.iconColor = "blue-darken-4";
      }
    },
  },
});
