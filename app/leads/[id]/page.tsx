"use client";
import { LeadWorkspace } from "@/components/lead-workspace"; import { useDemoStore } from "@/components/demo-store"; import { useParams } from "next/navigation";
export default function Page(){const {leads}=useDemoStore();const p=useParams<{id:string}>();const lead=leads.find(l=>l.id===p.id);if(!lead)return <div style={{padding:40}}>Lead não encontrado.</div>;return <LeadWorkspace lead={lead}/>}
