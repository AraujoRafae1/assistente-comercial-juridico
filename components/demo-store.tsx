"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { leads as seedLeads, checklist as seedChecklist, timeline as seedTimeline, type Lead } from "@/lib/data";

export type Task = { id:string; leadId:string; titulo:string; responsavel:string; prazo:string; prioridade:string; status:"Pendente"|"Concluída" };
export type Followup = { id:string; leadId:string; data:string; motivo:string; mensagem:string; status:"Pendente"|"Realizado" };
export type TimelineEvent = { id:string; leadId:string; tipo:string; titulo:string; descricao:string; horario:string; autor:string };
export type ChecklistItem = { id:string; leadId:string; titulo:string; categoria:string; concluido:boolean };
export type BackupData = { version:4; exportedAt:string; leads:Lead[]; tasks:Task[]; followups:Followup[]; timeline:TimelineEvent[]; checklist:ChecklistItem[] };

type Store = {
 leads:Lead[]; tasks:Task[]; followups:Followup[]; timeline:TimelineEvent[]; checklist:ChecklistItem[]; ready:boolean;
 moveLead:(id:string,etapa:string)=>void; addLead:(lead:Lead)=>void; updateLead:(id:string,patch:Partial<Lead>)=>void;
 toggleTask:(id:string)=>void; addTask:(t:Task)=>void; completeFollowup:(id:string)=>void; addFollowup:(f:Followup)=>void;
 addTimelineEvent:(event:TimelineEvent)=>void; toggleChecklist:(leadId:string,itemId:string)=>void;
 exportBackup:()=>BackupData; importBackup:(data:BackupData)=>void; resetDemo:()=>void;
};

const initialTasks:Task[]=[
{id:"t1",leadId:"1",titulo:"Solicitar e-mail recebido da Meta",responsavel:"Rafael Araújo",prazo:"Hoje, 18:00",prioridade:"Alta",status:"Pendente"},
{id:"t2",leadId:"2",titulo:"Completar diagnóstico do banimento",responsavel:"Luana",prazo:"Amanhã, 10:00",prioridade:"Média",status:"Pendente"},
{id:"t3",leadId:"3",titulo:"Retomar proposta enviada",responsavel:"Rafael Araújo",prazo:"05/08/2026, 09:00",prioridade:"Alta",status:"Pendente"}
];
const initialFollowups:Followup[]=[
{id:"f1",leadId:"3",data:"Hoje, 16:00",motivo:"Proposta sem retorno",mensagem:"Olá! Conseguiu analisar a proposta que encaminhamos? Posso esclarecer alguma dúvida.",status:"Pendente"},
{id:"f2",leadId:"5",data:"Amanhã, 09:30",motivo:"Retomar negociação",mensagem:"Olá, Ana. Estou retomando nosso contato para saber se deseja avançar com o atendimento.",status:"Pendente"}
];
const initialTimeline:TimelineEvent[]=seedTimeline.map(e=>({...e,leadId:"1"}));
const initialChecklist:ChecklistItem[]=seedLeads.flatMap(l=>seedChecklist.map(i=>({...i,id:`${l.id}-${i.id}`,leadId:l.id,concluido:l.id==="1"?i.concluido:false})));
const C=createContext<Store|null>(null);
function load<T>(key:string,fallback:T):T{if(typeof window==='undefined')return fallback;try{const raw=localStorage.getItem(key);return raw?JSON.parse(raw):fallback}catch{return fallback}}
function save(key:string,value:unknown){localStorage.setItem(key,JSON.stringify(value))}
export function DemoStoreProvider({children}:{children:React.ReactNode}){
 const [leads,setLeads]=useState<Lead[]>(seedLeads); const [tasks,setTasks]=useState<Task[]>(initialTasks); const [followups,setFollowups]=useState<Followup[]>(initialFollowups); const [timeline,setTimeline]=useState<TimelineEvent[]>(initialTimeline); const [checklist,setChecklist]=useState<ChecklistItem[]>(initialChecklist); const [ready,setReady]=useState(false);
 useEffect(()=>{setLeads(load('acj-leads',seedLeads));setTasks(load('acj-tasks',initialTasks));setFollowups(load('acj-followups',initialFollowups));setTimeline(load('acj-timeline',initialTimeline));setChecklist(load('acj-checklist',initialChecklist));setReady(true)},[]);
 useEffect(()=>{if(ready)save('acj-leads',leads)},[leads,ready]); useEffect(()=>{if(ready)save('acj-tasks',tasks)},[tasks,ready]); useEffect(()=>{if(ready)save('acj-followups',followups)},[followups,ready]); useEffect(()=>{if(ready)save('acj-timeline',timeline)},[timeline,ready]); useEffect(()=>{if(ready)save('acj-checklist',checklist)},[checklist,ready]);
 const value=useMemo<Store>(()=>({
  leads,tasks,followups,timeline,checklist,ready,
  moveLead:(id,etapa)=>{setLeads(x=>x.map(l=>l.id===id?{...l,etapa}:l));setTimeline(x=>[{id:crypto.randomUUID(),leadId:id,tipo:'sistema',titulo:'Etapa alterada',descricao:`Lead movido para ${etapa}`,horario:'Agora',autor:'Sistema'},...x])},
  addLead:l=>{setLeads(x=>[l,...x]);setChecklist(x=>[...seedChecklist.map(i=>({...i,id:`${l.id}-${i.id}`,leadId:l.id,concluido:false})),...x]);setTimeline(x=>[{id:crypto.randomUUID(),leadId:l.id,tipo:'sistema',titulo:'Lead criado',descricao:`Cadastro iniciado para ${l.servico}`,horario:'Agora',autor:'Sistema'},...x])},
  updateLead:(id,patch)=>setLeads(x=>x.map(l=>l.id===id?{...l,...patch}:l)),
  toggleTask:id=>setTasks(x=>x.map(t=>t.id===id?{...t,status:t.status==='Pendente'?'Concluída':'Pendente'}:t)), addTask:t=>setTasks(x=>[t,...x]),
  completeFollowup:id=>setFollowups(x=>x.map(f=>f.id===id?{...f,status:'Realizado'}:f)), addFollowup:f=>setFollowups(x=>[f,...x]),
  addTimelineEvent:event=>setTimeline(x=>[event,...x]), toggleChecklist:(leadId,itemId)=>setChecklist(x=>x.map(i=>i.leadId===leadId&&i.id===itemId?{...i,concluido:!i.concluido}:i)),
  exportBackup:()=>({version:4,exportedAt:new Date().toISOString(),leads,tasks,followups,timeline,checklist}),
  importBackup:data=>{if(data.version!==4)throw new Error('Backup incompatível.');setLeads(data.leads);setTasks(data.tasks);setFollowups(data.followups);setTimeline(data.timeline);setChecklist(data.checklist)},
  resetDemo:()=>{setLeads(seedLeads);setTasks(initialTasks);setFollowups(initialFollowups);setTimeline(initialTimeline);setChecklist(initialChecklist)}
 }),[leads,tasks,followups,timeline,checklist,ready]);
 return <C.Provider value={value}>{children}</C.Provider>
}
export function useDemoStore(){const v=useContext(C);if(!v)throw new Error('DemoStoreProvider ausente');return v}
