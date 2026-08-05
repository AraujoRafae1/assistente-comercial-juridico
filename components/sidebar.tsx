"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, KanbanSquare, CheckSquare, Clock3, BookOpen, Settings, LogOut, Scale } from "lucide-react";

const items = [
  ["Dashboard", "/dashboard", LayoutDashboard], ["Leads", "/leads", Users],
  ["Funil", "/funil", KanbanSquare], ["Tarefas", "/tarefas", CheckSquare], ["Follow-ups", "/followups", Clock3],
  ["Base de conhecimento", "/base-conhecimento", BookOpen], ["Configurações", "/configuracoes", Settings]
] as const;

export function Sidebar() {
  const pathname = usePathname();
  return <aside className="sidebar">
    <div className="brand"><span className="brandIcon"><Scale size={21}/></span><div><strong>Galdino</strong><small>Comercial</small></div></div>
    <nav>{items.map(([label, href, Icon]) => {
      const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
      return <Link href={href} key={label} className={`navItem ${active ? "active" : ""}`}><Icon size={19}/><span>{label}</span></Link>;
    })}</nav>
    <div className="userBox"><div className="avatar">RA</div><div className="userMeta"><strong>Rafael Araújo</strong><small>Administrador</small></div><Link href="/login" aria-label="Sair"><LogOut size={18}/></Link></div>
  </aside>;
}
