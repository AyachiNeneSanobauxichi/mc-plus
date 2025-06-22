export function printLogo() {
  if (PROD) {
    console.info("contact us with ayachinenesanobauxichi@gmail.com");
  } else if (DEV) {
    console.log("[mc-plus]: dev mode");
  }
}
