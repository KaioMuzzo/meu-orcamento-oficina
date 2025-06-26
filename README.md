## 📂 Estrutura de Arquivos

Aqui está a organização das pastas e principais arquivos do projeto:
```text
meu-orcamento-oficina/
├── 📁 assets/
│   ├── 📁 css/
│   │   └── style.css           (Estilo geral)
│   ├── 📁 js/
│   │   ├── auth.js             (Lógica de login e cadastro)
│   │   ├── dashboard.js        (Dashboard da oficina)
│   │   ├── orcamentos.js       (CRUD dos orçamentos)
│   │   ├── estoque.js          (Controle de estoque)
│   │   ├── relatorios.js       (Relatórios financeiros)
│   │   └── cliente.js          (Tela do cliente ver orçamento)
│   └── 📁 libs/                 (Bibliotecas externas)
│
├── 📁 pages/
│   ├── login.html              (Tela de login)
│   ├── cadastro.html           (Tela de cadastro)
│   ├── dashboard.html          (Painel principal da oficina)
│   ├── orcamentos.html         (Listagem de orçamentos)
│   ├── criar-orcamento.html    (Painel para criar orçamento)
│   ├── estoque.html            (Tela de estoque)
│   ├── relatorios.html         (Tela de relatórios financeiros)
│   └── cliente-orcamento.html  (Tela para o cliente ver e aceitar/rejeitar)
│
├── index.html                   
├── README.md                    (Documentação do projeto)
└── firebase.json
```
### 🎨 Paleta Profissional e Moderna
```text
Cor			Código HEX		Uso
Verde suave		#10B981			Sucesso / orçamentos aprovados
Vermelho alaranjado	#F87171			Erros / pendências / recusas
Amarelo escuro		#FBBF24			Avisos ou “em andamento”
```

### 🗺️ Telas do App (Mobile)
```text
	🔑 Autenticação
		Login
		Cadastro
		Esqueceu senha

	🏠 Dashboard da Oficina
		Total de orçamentos no mês
		Quantos estão pendentes
		Quantos foram aprovados
		Valor total vendido
	
	📜 Listagem de Orçamentos
		Filtros: pendentes, aprovados, recusados, finalizados
		Ver detalhes
		Editar (enquanto pendente)
		Finalizar orçamento
		Cancelar
	
	📝 Criar Orçamento
		Dados do cliente (nome, CPF/CNPJ, contato)
		Descrição do serviço
		Itens e peças (com valor, quantidade, mão de obra, etc.)
		Total automático
		Gerar link para envio ao cliente (aceitar ou recusar)
	
	📦 Estoque
		Lista de peças e ferramentas
		Controle simples: adicionar, remover, editar quantidade
		Marcar itens como indisponíveis ou esgotados
	
	💰 Relatório Financeiro
		Filtros por data
		Total vendido no período
		Listagem de orçamentos finalizados
		Exportar em PDF ou Excel (opcional)
	
	✅ Tela do Cliente (Link de Orçamento)
		Ver detalhes do orçamento
		Botão para "Aceitar" ou "Recusar"
		Espaço para observações ou dúvidas (opcional)
	
	⚙️ Ferramentas
		Front: HTML + CSS + JS
		Backend: Node.js + Firebase
		Banco: Firestore
```
