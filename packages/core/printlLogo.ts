export default function () {
  if (PROD) {
    console.info("contact us with ayachinenesanobauxichi@gmai.com");
  } else if (DEV) {
    console.log("[mc-plus]: dev mode");
  }
}
