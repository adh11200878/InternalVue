import { defineStore } from "pinia";

export const useSnackbarStore = defineStore("snackbar", {
  state: () => ({
    show: false,
    message: "",
    color: "info",
    icon: "",
  }),
  actions: {
    info(message: string) {
      this.message = message;
      this.color = "info";
      this.icon = "mdi-information";
      this.show = true;
    },
    error(message: string) {
      this.message = message;
      this.color = "error";
      this.icon = "mdi-alert-circle";
      this.show = true;
    },
    success(message: string) {
      this.message = message;
      this.color = "success";
      this.icon = "mdi-check-circle";
      this.show = true;
    },
    warning(message: string) {
      this.message = message;
      this.color = "warning";
      this.icon = "mdi-alert";
      this.show = true;
    },
  },
});
