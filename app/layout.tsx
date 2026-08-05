import "./globals.css";
import { DemoStoreProvider } from "@/components/demo-store";
export const metadata={title:"Assistente Comercial Jurídico",description:"CRM interno do escritório"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body><DemoStoreProvider>{children}</DemoStoreProvider></body></html>}
