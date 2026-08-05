"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Scale, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter(); const [show, setShow] = useState(false); const [loading, setLoading] = useState(false);
  function submit(e: React.FormEvent) { e.preventDefault(); setLoading(true); setTimeout(() => router.push("/dashboard"), 350); }
  return <main className="loginPage"><section className="loginPanel"><div className="loginBrand"><span className="brandIcon large"><Scale size={26}/></span><div><strong>Galdino</strong><small>Comercial</small></div></div><div className="loginCopy"><span className="eyebrow">ASSISTENTE COMERCIAL JURÍDICO</span><h1>Organize cada oportunidade. Não perca nenhum lead.</h1><p>Centralize o diagnóstico, as próximas ações e o acompanhamento comercial do escritório.</p></div><div className="featureStrip"><span>Diagnóstico estruturado</span><span>Follow-ups organizados</span><span>Visão completa do funil</span></div></section><section className="loginFormWrap"><form className="loginCard" onSubmit={submit}><div><h2>Bem-vindo</h2><p>Entre com seus dados para acessar o sistema.</p></div><label>E-mail<input type="email" defaultValue="admin@galdino.adv.br" required/></label><label>Senha<div className="passwordField"><input type={show ? "text" : "password"} defaultValue="demonstracao" required/><button type="button" onClick={() => setShow(!show)}>{show ? <EyeOff size={18}/> : <Eye size={18}/>}</button></div></label><div className="formRow"><label className="checkbox"><input type="checkbox" defaultChecked/>Manter conectado</label><a href="#">Esqueci minha senha</a></div><button className="submitButton" disabled={loading}>{loading ? "Entrando..." : "Entrar"}</button><p className="demoNote">Modo demonstração: qualquer e-mail e senha válidos permitem entrar.</p></form></section></main>;
}
