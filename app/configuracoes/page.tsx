"use client";
import { AppShell } from "@/components/app-shell";
import { useDemoStore, type BackupData } from "@/components/demo-store";
import { Download, RotateCcw, Upload, Database, ShieldCheck, HardDrive } from "lucide-react";
import { useRef, useState } from "react";

export default function Page(){
 const {exportBackup,importBackup,resetDemo,leads,tasks,followups}=useDemoStore(); const input=useRef<HTMLInputElement>(null); const [message,setMessage]=useState("");
 function download(){const blob=new Blob([JSON.stringify(exportBackup(),null,2)],{type:"application/json"});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`backup-crm-galdino-${new Date().toISOString().slice(0,10)}.json`;a.click();URL.revokeObjectURL(url);setMessage('Backup baixado com sucesso.');}
 async function upload(file?:File){if(!file)return;try{const data=JSON.parse(await file.text()) as BackupData;importBackup(data);setMessage('Backup restaurado com sucesso.')}catch(e){setMessage(e instanceof Error?e.message:'Arquivo de backup inválido.')}}
 function reset(){if(confirm('Restaurar os dados de demonstração? Os dados atuais serão substituídos.')){resetDemo();setMessage('Dados de demonstração restaurados.')}}
 return <AppShell title="Configurações" subtitle="Dados locais, segurança e preparação para o banco gratuito">
  {message&&<div className="settingsMessage">{message}</div>}
  <div className="settingsGrid">
   <section className="panel settingsCard"><span className="settingsIcon"><HardDrive size={20}/></span><h2>Armazenamento atual</h2><p>Esta versão salva os dados neste navegador, sem mensalidade e sem enviar informações para serviços externos.</p><dl><div><dt>Leads</dt><dd>{leads.length}</dd></div><div><dt>Tarefas</dt><dd>{tasks.length}</dd></div><div><dt>Follow-ups</dt><dd>{followups.length}</dd></div></dl></section>
   <section className="panel settingsCard"><span className="settingsIcon"><Download size={20}/></span><h2>Backup gratuito</h2><p>Baixe um arquivo com todos os dados. Guarde-o em local seguro para evitar perda das informações.</p><button className="primaryButton" onClick={download}><Download size={16}/>Baixar backup</button></section>
   <section className="panel settingsCard"><span className="settingsIcon"><Upload size={20}/></span><h2>Restaurar backup</h2><p>Importe um backup produzido pela Sprint 4. Os dados atuais serão substituídos pelo conteúdo do arquivo.</p><input ref={input} type="file" accept="application/json" hidden onChange={e=>upload(e.target.files?.[0])}/><button className="secondaryButton" onClick={()=>input.current?.click()}><Upload size={16}/>Selecionar arquivo</button></section>
   <section className="panel settingsCard"><span className="settingsIcon"><RotateCcw size={20}/></span><h2>Restaurar demonstração</h2><p>Volta aos exemplos iniciais. Use apenas para testes, pois esta ação substitui as alterações locais.</p><button className="secondaryButton dangerOutline" onClick={reset}><RotateCcw size={16}/>Restaurar dados</button></section>
   <section className="panel settingsCard wide"><span className="settingsIcon"><Database size={20}/></span><h2>Próxima conexão: Supabase Free</h2><p>O projeto já contém o arquivo <code>supabase/schema.sql</code>. A conexão real exigirá somente um projeto gratuito e duas chaves no arquivo <code>.env.local</code>. Até lá, o aplicativo continua funcional em modo local.</p><div className="connectionSteps"><span>1. Criar projeto gratuito</span><span>2. Executar o SQL</span><span>3. Adicionar as chaves</span><span>4. Migrar o backup local</span></div></section>
   <section className="panel settingsCard wide"><span className="settingsIcon"><ShieldCheck size={20}/></span><h2>Aviso de segurança</h2><p>O modo local é indicado para desenvolvimento e validação. Não use dados pessoais reais de clientes antes da autenticação, das políticas de acesso e do banco centralizado estarem configurados.</p></section>
  </div>
 </AppShell>
}
