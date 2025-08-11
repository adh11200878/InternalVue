// stores/snackbar.ts
import { defineStore } from "pinia";

export const useSnackbarStore = defineStore("snackbar", {
  state: () => ({
    show: false,
    message: "",
    color: "info",
    icon: "mdi-information", // 預設 icon
    iconColor: "blue-darken-4", // 預設 icon 顏色
  }),
  actions: {
    trigger(message: string, color: string) {
      this.message = message;
      this.color = color;
      this.show = true;
      // 根據 color 設定 icon 與 iconColor
      switch (color) {
        case "error":
          this.icon = "mdi-alert-circle";
          this.iconColor = "red-darken-4";
          break;
        case "success":
          this.icon = "mdi-check-circle";
          this.iconColor = "green-darken-4";
          break;
        case "warning":
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
