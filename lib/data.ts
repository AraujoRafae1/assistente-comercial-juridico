export type Lead = {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  cidade: string;
  servico: string;
  problema: string;
  etapa: string;
  prioridade: "Baixa" | "Média" | "Alta" | "Urgente";
  responsavel: string;
  ultimoContato: string;
  proximaAcao: string;
  criadoEm: string;
  origem: string;
  usuarioPerfil?: string;
  dataOcorrencia?: string;
  contaComercial?: boolean;
  seguidores?: number;
  prejuizo?: string;
  resumo?: string;
  chance?: number;
  documentacao?: number;
};

export const leads: Lead[] = [
  { id: "1", nome: "João da Silva", telefone: "(44) 99999-1001", email: "joao@lojasaopedro.com.br", cidade: "Umuarama/PR", servico: "Instagram", problema: "Conta invadida", etapa: "Aguardando documentos", prioridade: "Urgente", responsavel: "Rafael Araújo", ultimoContato: "há 2 horas", proximaAcao: "Solicitar e-mail da Meta", criadoEm: "03/08/2026", origem: "Landing page", usuarioPerfil: "@lojasaopedro", dataOcorrencia: "01/08/2026", contaComercial: true, seguidores: 18400, prejuizo: "Aproximadamente R$ 4.000,00", chance: 82, documentacao: 60, resumo: "Cliente relata invasão de conta comercial no Instagram. O e-mail e o telefone foram alterados. A conta era utilizada para vendas e anúncios. Possui prints do perfil e das tentativas de recuperação, mas ainda não enviou o e-mail recebido da Meta nem o documento pessoal." },
  { id: "2", nome: "Mariana Costa", telefone: "(45) 98888-2014", email: "mariana@email.com", cidade: "Toledo/PR", servico: "WhatsApp", problema: "Número banido", etapa: "Diagnóstico", prioridade: "Alta", responsavel: "Luana", ultimoContato: "há 5 horas", proximaAcao: "Completar diagnóstico", criadoEm: "03/08/2026", origem: "Instagram", chance: 64, documentacao: 25 },
  { id: "3", nome: "Loja Horizonte", telefone: "(44) 97777-3040", email: "contato@lojahorizonte.com", cidade: "Cianorte/PR", servico: "Facebook", problema: "Página desativada", etapa: "Proposta enviada", prioridade: "Média", responsavel: "Rafael Araújo", ultimoContato: "ontem", proximaAcao: "Follow-up amanhã", criadoEm: "02/08/2026", origem: "Google", chance: 71, documentacao: 90 },
  { id: "4", nome: "Carlos Henrique", telefone: "(44) 96666-4091", email: "carlos@email.com", cidade: "Umuarama/PR", servico: "Instagram", problema: "Conta suspensa", etapa: "Novo", prioridade: "Alta", responsavel: "Não atribuído", ultimoContato: "há 1 dia", proximaAcao: "Iniciar atendimento", criadoEm: "02/08/2026", origem: "Indicação", chance: 45, documentacao: 10 },
  { id: "5", nome: "Ana Paula", telefone: "(44) 95555-5088", email: "ana@email.com", cidade: "Maringá/PR", servico: "Instagram", problema: "Perda de acesso", etapa: "Negociação", prioridade: "Baixa", responsavel: "Rafael Araújo", ultimoContato: "há 2 dias", proximaAcao: "Retomar proposta", criadoEm: "31/07/2026", origem: "Facebook", chance: 76, documentacao: 100 }
];

export const timeline = [
  { id: "t1", tipo: "mensagem", titulo: "Mensagem recebida", descricao: "O e-mail e o telefone da conta foram alterados e não consigo mais entrar.", horario: "Hoje, 09:14", autor: "João da Silva" },
  { id: "t2", tipo: "documento", titulo: "2 documentos adicionados", descricao: "print-perfil.png e tentativa-recuperacao.pdf", horario: "Hoje, 09:18", autor: "Rafael Araújo" },
  { id: "t3", tipo: "sistema", titulo: "Etapa alterada", descricao: "Diagnóstico → Aguardando documentos", horario: "Hoje, 09:21", autor: "Sistema" },
  { id: "t4", tipo: "nota", titulo: "Nota interna", descricao: "Conta usada como principal canal de vendas da empresa. Priorizar o retorno ainda hoje.", horario: "Hoje, 09:24", autor: "Rafael Araújo" },
  { id: "t5", tipo: "tarefa", titulo: "Tarefa criada", descricao: "Solicitar e-mail recebido da Meta", horario: "Hoje, 09:26", autor: "Rafael Araújo" }
];

export const checklist = [
  { id: "c1", titulo: "Link ou @ do perfil", categoria: "Informações", concluido: true },
  { id: "c2", titulo: "Data aproximada da invasão", categoria: "Informações", concluido: true },
  { id: "c3", titulo: "RG ou CNH do titular", categoria: "Documentos", concluido: false },
  { id: "c4", titulo: "Print do perfil", categoria: "Documentos", concluido: true },
  { id: "c5", titulo: "E-mail recebido da Meta", categoria: "Documentos", concluido: false },
  { id: "c6", titulo: "Comprovante de anúncios", categoria: "Documentos", concluido: false },
  { id: "c7", titulo: "Registrar prejuízo informado", categoria: "Ações internas", concluido: true }
];

export const documents = [
  { id: "d1", nome: "print-perfil.png", tipo: "Print da conta", tamanho: "1,2 MB", data: "Hoje, 09:18", verificado: true },
  { id: "d2", nome: "tentativa-recuperacao.pdf", tipo: "Tentativa de recuperação", tamanho: "840 KB", data: "Hoje, 09:18", verificado: false }
];

export const tasks = [
  { id: "a1", titulo: "Solicitar e-mail recebido da Meta", responsavel: "Rafael Araújo", prazo: "Hoje, 18:00", prioridade: "Alta", status: "Pendente" },
  { id: "a2", titulo: "Validar vínculo da empresa com a conta", responsavel: "Rafael Araújo", prazo: "Amanhã, 10:00", prioridade: "Média", status: "Pendente" }
];
