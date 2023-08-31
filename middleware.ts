export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/link", "/document", "/note", "/profile"],
};
