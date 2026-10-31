import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Luxurious_Script,
  Noto_Sans,
} from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

const luxuriousScript = Luxurious_Script({
  variable: "--font-luxurious-script",
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Huy Graduation",
  description: "Thân mời bạn tham dự lễ tốt nghiệp của Trường Huy.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${notoSans.variable} ${bricolageGrotesque.variable} ${luxuriousScript.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        </body>
    </html>
  );
}
