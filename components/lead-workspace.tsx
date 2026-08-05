"use client";
import { useMemo, useState } from "react";
import { AppShell } from "./app-shell";
import type { Lead } from "@/lib/data";
import { documents } from "@/lib/data";
import { useDemoStore } from "./demo-store";
import { ArrowLeft, AtSign, BriefcaseBusiness, CalendarDays, Check, CheckCircle2, ChevronDown, Circle, ClipboardCheck, Clock3, Copy, FileText, Mail, MessageSquareText, MoreHorizontal, Phone, Plus, Sparkles, Upload, UserRound, WandSparkles } from "lucide-react";
import Link from "next/link";

type Tab = "timeline" | "diagnostico" | "checklist" | "documentos" | "tarefas";

export function LeadWorkspace({ lead }: { lead: Lead }) {
  const [tab, setTab] = useState<Tab>("timeline");
  const { tasks: allTasks, timeline: allTimeline, checklist: allChecklist, toggleTask, toggleChecklist: persistChecklist, addTimelineEvent, addTask } = useDemoStore();
  const [note, setNote] = useState("");
  const items = allChecklist.filter(i => i.leadId === lead.id);
  const events = allTimeline.filter(e => e.leadId === lead.id);
  const tasks = allTasks.filter(t => t.leadId === lead.id);
  const progress = useMemo(() => items.length ? Math.round(items.filter(i => i.concluido).length / items.length * 100) : 0, [items]);

  function toggleChecklist(id: string) { persistChecklist(lead.id, id); }
  function addNote() {
    if (!note.trim()) return;
    addTimelineEvent({ id: crypto.randomUUID(), leadId: lead.id, tipo: "nota", titulo: "Nota interna", descricao: note.trim(), horario: "Agora", autor: "Rafael Araújo" });
    setNote("");
  }
  function createTask(){
    const titulo=window.prompt("Qual tarefa precisa ser realizada?"); if(!titulo?.trim()) return;
    addTask({id:crypto.randomUUID(),leadId:lead.id,titulo:titulo.trim(),responsavel:"Rafael Araújo",prazo:"Sem prazo",prioridade:"Média",status:"Pendente"});
    addTimelineEvent({id:crypto.randomUUID(),leadId:lead.id,tipo:"tarefa",titulo:"Tarefa criada",descricao:titulo.trim(),horario:"Agora",autor:"Rafael Araújo"});
  }

  return <AppShell title={lead.nome} subtitle={`${lead.servico} · ${lead.problema}`}>
    <div className="leadPageHeader">
      <Link href="/leads" className="backLink"><ArrowLeft size={16}/>Voltar para leads</Link>
      <div className="leadHeaderActions"><button className="secondaryButton"><Phone size={16}/>Registrar contato</button><button className="secondaryButton"><Clock3 size={16}/>Follow-up</button><button className="primaryButton"><Sparkles size={16}/>Assistente</button></div>
    </div>

    <section className="leadHero panel">
      <div className="leadIdentity"><div className="leadAvatar">JS</div><div><div className="leadTitleRow"><h2>{lead.nome}</h2><span className={`priorityBadge ${lead.prioridade.toLowerCase().replace("é","e")}`}>{lead.prioridade}</span></div><p>{lead.problema} · Entrada em {lead.criadoEm}</p></div></div>
      <div className="heroStats"><div><small>Etapa atual</small><strong>{lead.etapa}</strong></div><div><small>Responsável</small><strong>{lead.responsavel}</strong></div><div><small>Chance de contratação</small><strong>{lead.chance ?? 0}%</strong></div><div><small>Documentação</small><strong>{progress}%</strong></div></div>
      <button className="iconButton"><MoreHorizontal size={18}/></button>
    </section>

    <div className="leadWorkspace">
      <aside className="leadSidebar panel">
        <div className="sectionTitle"><span>Contato</span><button>Editar</button></div>
        <div className="contactList"><div><Phone size={15}/><span>{lead.telefone}</span><button title="Copiar"><Copy size={14}/></button></div><div><Mail size={15}/><span>{lead.email}</span></div><div><UserRound size={15}/><span>{lead.cidade}</span></div><div><AtSign size={15}/><span>{lead.usuarioPerfil || "Não informado"}</span></div></div>
        <div className="divider"/>
        <div className="sectionTitle"><span>Organização</span><button>Editar</button></div>
        <dl className="metaList"><div><dt>Origem</dt><dd>{lead.origem}</dd></div><div><dt>Serviço</dt><dd>{lead.servico}</dd></div><div><dt>Último contato</dt><dd>{lead.ultimoContato}</dd></div><div><dt>Próxima ação</dt><dd>{lead.proximaAcao}</dd></div></dl>
        <div className="divider"/>
        <div className="sectionTitle"><span>Progresso documental</span><strong>{progress}%</strong></div><div className="progressTrack"><i style={{width: `${progress}%`}}/></div><p className="mutedSmall">{items.filter(i=>i.concluido).length} de {items.length} itens concluídos</p>
      </aside>

      <main className="leadMain panel">
        <div className="leadTabs">
          <button className={tab==="timeline"?"active":""} onClick={()=>setTab("timeline")}>Timeline</button>
          <button className={tab==="diagnostico"?"active":""} onClick={()=>setTab("diagnostico")}>Diagnóstico</button>
          <button className={tab==="checklist"?"active":""} onClick={()=>setTab("checklist")}>Checklist <span>{items.filter(i=>!i.concluido).length}</span></button>
          <button className={tab==="documentos"?"active":""} onClick={()=>setTab("documentos")}>Documentos <span>{documents.length}</span></button>
          <button className={tab==="tarefas"?"active":""} onClick={()=>setTab("tarefas")}>Tarefas <span>{tasks.length}</span></button>
        </div>

        {tab === "timeline" && <div className="tabContent"><div className="composer"><textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Adicione uma nota interna ou registre uma interação..."/><div><span>Visível apenas para a equipe</span><button className="primaryButton" onClick={addNote}><Plus size={16}/>Adicionar nota</button></div></div><div className="timelineList">{events.map(event=><article className="timelineEvent" key={event.id}><span className={`eventIcon ${event.tipo}`}>{event.tipo === "documento" ? <FileText size={16}/> : event.tipo === "tarefa" ? <ClipboardCheck size={16}/> : event.tipo === "mensagem" ? <MessageSquareText size={16}/> : event.tipo === "sistema" ? <Check size={16}/> : <BriefcaseBusiness size={16}/>}</span><div><div className="eventHead"><strong>{event.titulo}</strong><small>{event.horario}</small></div><p>{event.descricao}</p><small>por {event.autor}</small></div></article>)}</div></div>}

        {tab === "diagnostico" && <div className="tabContent"><div className="contentHeader"><div><h3>Diagnóstico do caso</h3><p>Informações utilizadas para avaliar a situação inicial.</p></div><button className="secondaryButton">Editar diagnóstico</button></div><div className="diagnosticGrid"><Info label="Rede social" value={lead.servico}/><Info label="Tipo de problema" value={lead.problema}/><Info label="Data do ocorrido" value={lead.dataOcorrencia || "Não informada"}/><Info label="Conta comercial" value={lead.contaComercial ? "Sim" : "Não informado"}/><Info label="Seguidores" value={lead.seguidores?.toLocaleString("pt-BR") || "Não informado"}/><Info label="Prejuízo informado" value={lead.prejuizo || "Não informado"}/></div><div className="answerCard"><strong>Tentativas de recuperação</strong><p>O cliente utilizou o fluxo de recuperação da plataforma, enviou vídeo-selfie e recebeu uma resposta automática, sem restabelecimento do acesso.</p></div></div>}

        {tab === "checklist" && <div className="tabContent"><div className="contentHeader"><div><h3>Checklist de triagem</h3><p>Marque os dados e documentos já recebidos.</p></div><span className="completionBadge"><CheckCircle2 size={16}/>{progress}% completo</span></div>{["Informações","Documentos","Ações internas"].map(category=><section className="checkGroup" key={category}><h4>{category}</h4>{items.filter(i=>i.categoria===category).map(item=><button className={`checkItem ${item.concluido?"done":""}`} key={item.id} onClick={()=>toggleChecklist(item.id)}>{item.concluido?<CheckCircle2 size={19}/>:<Circle size={19}/>}<span>{item.titulo}</span><ChevronDown size={15}/></button>)}</section>)}</div>}

        {tab === "documentos" && <div className="tabContent"><div className="contentHeader"><div><h3>Documentos do lead</h3><p>Arquivos recebidos durante o atendimento.</p></div><button className="primaryButton"><Upload size={16}/>Adicionar arquivo</button></div><div className="documentList">{documents.map(doc=><article key={doc.id}><span className="fileIcon"><FileText size={20}/></span><div><strong>{doc.nome}</strong><p>{doc.tipo} · {doc.tamanho} · {doc.data}</p></div><span className={doc.verificado?"verified":"pending"}>{doc.verificado?"Verificado":"Pendente"}</span><button className="iconButton"><MoreHorizontal size={17}/></button></article>)}</div><div className="uploadDrop"><Upload size={22}/><strong>Arraste arquivos para cá</strong><span>PDF, JPG ou PNG — máximo de 10 MB</span></div></div>}

        {tab === "tarefas" && <div className="tabContent"><div className="contentHeader"><div><h3>Tarefas relacionadas</h3><p>Próximas ações necessárias para avançar o lead.</p></div><button className="primaryButton" onClick={createTask}><Plus size={16}/>Nova tarefa</button></div><div className="taskList">{tasks.map(task=><article key={task.id} className={task.status==="Concluída"?"completedItem":""}><button className="taskCheck" onClick={()=>toggleTask(task.id)}>{task.status==="Concluída"?<CheckCircle2 size={20}/>:<Circle size={20}/>}</button><div><strong>{task.titulo}</strong><p>{task.responsavel} · Prazo: {task.prazo}</p></div><span className={`priorityBadge ${task.prioridade.toLowerCase()}`}>{task.prioridade}</span></article>)}</div></div>}
      </main>

      <aside className="aiSidebar">
        <section className="aiCard"><div className="aiTitle"><span><WandSparkles size={17}/></span><div><strong>Resumo inteligente</strong><small>Atualizado hoje, 09:25</small></div></div><p>{lead.resumo || "Resumo ainda não gerado para este lead."}</p><button className="aiLink"><Sparkles size={15}/>Atualizar resumo</button></section>
        <section className="attentionCard"><span className="attentionLabel">PRÓXIMA AÇÃO</span><h3>{lead.proximaAcao}</h3><p>Há documentos obrigatórios pendentes. O retorno ideal deve ocorrer ainda hoje.</p><button className="primaryButton"><MessageSquareText size={16}/>Gerar mensagem</button></section>
        <section className="scoreCard panel"><div><small>Urgência</small><strong>Alta</strong></div><div><small>Temperatura</small><strong>Quente</strong></div><div><small>Complexidade</small><strong>Moderada</strong></div><div><small>Chance</small><strong>{lead.chance}%</strong></div></section>
      </aside>
    </div>
  </AppShell>;
}

function Info({label,value}:{label:string;value:string}){return <div className="infoField"><small>{label}</small><strong>{value}</strong></div>}
