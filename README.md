# Assistente Comercial Jurídico — Sprint 1

MVP interno para organizar leads do escritório, construído com Next.js e preparado para Supabase.

## O que já está pronto

- Login em modo demonstração
- Layout responsivo com menu lateral
- Dashboard com indicadores e prioridades
- Lista de leads com dados simulados
- Cadastro de novo lead em três etapas
- Schema inicial do Supabase com RLS
- Modo demonstração sem serviços externos

## Executar localmente

1. Instale Node.js LTS.
2. Abra o terminal nesta pasta.
3. Execute:

```bash
npm install
npm run dev
```

4. Abra `http://localhost:3000`.

No modo demonstração, use qualquer e-mail e senha válidos.

## Conectar ao Supabase gratuito

1. Crie um projeto no Supabase.
2. Abra o SQL Editor e execute `supabase/schema.sql`.
3. Copie `.env.example` para `.env.local`.
4. Preencha:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
```

A Sprint 2 substituirá os dados simulados por operações reais no banco.

## Hospedagem gratuita

Para testes, use uma plataforma gratuita que permita o uso pretendido. Atenção: o plano Hobby da Vercel é restrito a projetos pessoais e não comerciais; para uso comercial do escritório, avalie Cloudflare Pages/Workers, Netlify conforme os termos vigentes, ou hospedagem própria.

## Próxima Sprint

- Persistência real dos leads no Supabase
- Página individual do lead
- Timeline
- Diagnóstico e checklist
- Upload de documentos

## Sprint 2

A Sprint 2 adiciona a página individual do lead com:

- timeline interativa e inclusão de notas;
- diagnóstico estruturado;
- checklist clicável com progresso;
- documentos de demonstração;
- tarefas do lead;
- resumo inteligente e próxima ação;
- navegação real ao clicar nos leads;
- estado ativo no menu lateral;
- páginas preparadas para os próximos módulos.

### Teste rápido

1. Execute `npm run dev`.
2. Abra `http://localhost:3000`.
3. Entre no modo demonstração.
4. Acesse **Leads**.
5. Clique em **João da Silva** ou abra `http://localhost:3000/leads/1`.

Os dados continuam demonstrativos e locais. A persistência no Supabase será conectada em etapa posterior.


## Sprint 3
- Funil Kanban funcional com alteração de etapas.
- Tarefas e follow-ups interativos.
- Base de conhecimento pesquisável.
- Cadastro de leads persistido no navegador.
- Dados salvos em localStorage no modo demonstração.

## Sprint 4

- Timeline, checklist e tarefas da página do lead agora persistem no navegador.
- Novas tarefas podem ser criadas diretamente no lead.
- Alterações de etapa são registradas automaticamente na timeline.
- Tela de Configurações com backup completo em JSON.
- Restauração de backup e reposição dos dados de demonstração.
- Preparação visual para a futura migração ao Supabase Free.

### Recomendação de segurança

O modo local é apenas para desenvolvimento e validação. Não insira dados pessoais reais de clientes até a autenticação e o banco centralizado estarem configurados.
