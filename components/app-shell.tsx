import { Bell, Search, Plus } from "lucide-react";
import Link from "next/link";
import { Sidebar } from "./sidebar";

export function AppShell({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return <div className="app"><Sidebar/><main className="main"><header className="topbar"><div><h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div><div className="topActions"><label className="search"><Search size={17}/><input placeholder="Buscar lead..."/></label><button className="iconButton"><Bell size={19}/></button><Link className="primaryButton" href="/leads/novo"><Plus size={18}/>Novo lead</Link></div></header><section className="content">{children}</section></main></div>;
}
