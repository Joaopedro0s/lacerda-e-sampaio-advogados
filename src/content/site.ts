/**
 * Fonte única de conteúdo do site. TODOS os dados são fictícios (demonstração).
 * Para adaptar a um escritório real, edite apenas este arquivo.
 */
import {
  Briefcase,
  Building2,
  CalendarCheck,
  Clock,
  FileText,
  MessagesSquare,
  ShieldCheck,
  ShoppingBag,
  Users,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* 1. SEGMENTO: ponto único de configuração                            */
/* Para trocar de segmento, altere este bloco e os textos abaixo.      */
/* contabilidade → registry "CRC", schemaType "AccountingService"      */
/* engenharia    → registry "CREA", schemaType "ProfessionalService"   */
/* ------------------------------------------------------------------ */
export const segment = {
  key: "advocacia",
  label: "Advocacia",
  registry: "OAB",
  schemaType: "LegalService",
} as const;

const name = "Lacerda & Sampaio Advogados";
const shortName = "Lacerda & Sampaio"; // wordmark do cabeçalho e do rodapé
const city = "São Paulo";
const state = "SP";
const cityState = `${city}/${state}`;
const registryNumber = `${segment.registry}/${state} 000.000 (fictício)`;

export type Faq = { question: string; answer: string };

export type Area = {
  slug: string;
  title: string;
  icon: LucideIcon;
  summary: string;
  lead: string;
  services: string[];
  audience: string;
  situations: string[];
  faq: Faq[];
};

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  readingMinutes: number;
  area: string;
  sections: { heading: string; paragraphs: string[] }[];
};

const areas: Area[] = [
  {
    slug: "direito-de-familia",
    title: "Direito de Família",
    icon: Users,
    summary:
      "Divórcio, guarda, pensão alimentícia e inventário, conduzidos com discrição e respeito ao momento de cada família.",
    lead: `Questões de família pedem cuidado e conversa franca. Em ${city}, orientamos cada passo em linguagem simples, buscando acordo sempre que ele for possível.`,
    services: [
      "Divórcio consensual (em acordo) e litigioso (quando não há acordo)",
      "Guarda e regime de convivência com os filhos",
      "Pensão alimentícia: pedido, revisão e cobrança",
      "Inventário e partilha de bens, em cartório ou na Justiça",
      "Reconhecimento e dissolução de união estável",
    ],
    audience:
      "Pessoas que estão passando por uma separação, pais e mães que precisam organizar a rotina dos filhos e famílias que perderam um ente querido e precisam fazer a partilha dos bens.",
    situations: [
      "O casal decidiu se separar e quer entender as opções",
      "A pensão combinada deixou de ser paga ou ficou desatualizada",
      "É preciso definir com quem os filhos moram e como serão as visitas",
      "Um familiar faleceu e os herdeiros precisam abrir o inventário",
    ],
    faq: [
      {
        question: "O divórcio pode ser feito em cartório?",
        answer:
          "Em muitos casos, sim. Quando o casal está de acordo sobre todos os pontos, o divórcio pode ser feito por escritura em cartório, com a presença de advogado. Na consulta avaliamos se o seu caso se enquadra.",
      },
      {
        question: "Como o valor da pensão alimentícia é definido?",
        answer:
          "A lei não fixa um percentual único. O valor considera o que a criança precisa e o que quem paga pode oferecer. Cada caso é analisado com base em documentos e na realidade da família.",
      },
      {
        question: "Guarda compartilhada significa dividir o tempo pela metade?",
        answer:
          "Não necessariamente. Guarda compartilhada significa que pai e mãe decidem juntos as questões importantes da vida dos filhos. A divisão do tempo de convivência é combinada à parte.",
      },
    ],
  },
  {
    slug: "direito-trabalhista",
    title: "Direito Trabalhista",
    icon: Briefcase,
    summary:
      "Orientação para trabalhadores e empregadores sobre contratos, rescisões, verbas e prevenção de conflitos.",
    lead: `Relações de trabalho geram dúvidas dos dois lados. Atendemos trabalhadores e empresas de ${city}, explicando direitos e deveres antes de qualquer medida.`,
    services: [
      "Conferência de verbas rescisórias (valores devidos no fim do contrato)",
      "Reconhecimento de vínculo de emprego",
      "Horas extras, adicionais e equiparação salarial",
      "Consultoria preventiva para empresas e revisão de contratos",
      "Acompanhamento de acordos e audiências",
    ],
    audience:
      "Trabalhadores que foram desligados ou têm dúvidas sobre seus direitos e empresas que querem organizar suas rotinas de pessoal e reduzir riscos.",
    situations: [
      "Você foi demitido e quer conferir se os valores pagos estão corretos",
      "Trabalhou sem registro em carteira",
      "Fez horas extras que não apareceram no pagamento",
      "A empresa recebeu uma notificação ou reclamação trabalhista",
    ],
    faq: [
      {
        question: "Até quando posso procurar meus direitos após a demissão?",
        answer:
          "Em regra, o prazo para entrar com ação é de até dois anos após o fim do contrato, e é possível discutir os últimos cinco anos trabalhados. Como há exceções, vale conversar o quanto antes.",
      },
      {
        question: "Preciso de testemunhas?",
        answer:
          "Depende do que será discutido. Documentos como holerites, mensagens e registros de ponto costumam ajudar bastante. Na consulta indicamos quais provas fazem sentido para o seu caso.",
      },
      {
        question: "O escritório atende empresas também?",
        answer:
          "Sim. Atuamos de forma preventiva, revisando contratos e rotinas, e também na defesa em processos trabalhistas.",
      },
    ],
  },
  {
    slug: "direito-empresarial",
    title: "Direito Empresarial",
    icon: Building2,
    summary:
      "Apoio jurídico para pequenas e médias empresas: contratos, sociedades e rotinas que evitam problemas futuros.",
    lead: `Empresas tomam decisões jurídicas todos os dias, muitas vezes sem perceber. Ajudamos negócios de ${city} a formalizar acordos e a crescer com segurança.`,
    services: [
      "Elaboração e revisão de contratos comerciais",
      "Abertura, alteração e encerramento de sociedades",
      "Acordo de sócios (regras combinadas entre os donos da empresa)",
      "Cobrança e recuperação de crédito",
      "Consultoria jurídica contínua para a gestão",
    ],
    audience:
      "Empreendedores, sócios e gestores de pequenas e médias empresas que precisam de apoio jurídico próximo, sem manter um departamento interno.",
    situations: [
      "Você vai assinar um contrato importante e quer entender os riscos",
      "Um sócio vai entrar ou sair da empresa",
      "Um cliente não pagou e é preciso cobrar",
      "A empresa quer padronizar seus contratos e documentos",
    ],
    faq: [
      {
        question: "Vale a pena revisar um contrato antes de assinar?",
        answer:
          "Sim. A revisão identifica cláusulas que podem gerar custos ou obrigações inesperadas. Corrigir antes da assinatura costuma ser mais simples do que discutir depois.",
      },
      {
        question: "O que é um acordo de sócios?",
        answer:
          "É um documento em que os sócios combinam regras que vão além do contrato social: como decidir, o que acontece se alguém sair e como resolver divergências.",
      },
      {
        question: "Como funciona a consultoria contínua?",
        answer:
          "A empresa conta com atendimento recorrente para dúvidas e documentos do dia a dia. O formato e os honorários são definidos em contrato, de acordo com a demanda.",
      },
    ],
  },
  {
    slug: "direito-do-consumidor",
    title: "Direito do Consumidor",
    icon: ShoppingBag,
    summary:
      "Orientação em problemas com compras, serviços, cobranças indevidas, bancos e planos de saúde.",
    lead: `Quando um produto ou serviço não corresponde ao combinado, o consumidor tem caminhos para resolver. Explicamos quais são e por onde começar em ${city}.`,
    services: [
      "Cobranças indevidas e negativação irregular do nome",
      "Produtos com defeito e serviços não prestados",
      "Problemas com bancos, cartões e financiamentos",
      "Negativas de cobertura por planos de saúde",
      "Cancelamentos, reembolsos e compras pela internet",
    ],
    audience:
      "Consumidores que tentaram resolver um problema diretamente com a empresa e não tiveram resposta adequada.",
    situations: [
      "Seu nome foi negativado por uma dívida que você não reconhece",
      "O produto veio com defeito e a loja não resolve",
      "O plano de saúde negou um procedimento",
      "Você cancelou um serviço e continua sendo cobrado",
    ],
    faq: [
      {
        question: "Preciso tentar resolver com a empresa antes?",
        answer:
          "É recomendável. Guarde protocolos, e-mails e mensagens. Esses registros mostram que você buscou uma solução e ajudam na análise do caso.",
      },
      {
        question: "Posso desistir de uma compra feita pela internet?",
        answer:
          "Sim. Em compras feitas fora da loja física, como pela internet ou por telefone, o consumidor pode desistir em até sete dias a partir do recebimento, sem precisar justificar.",
      },
      {
        question: "Todo caso precisa ir para a Justiça?",
        answer:
          "Não. Muitas situações são resolvidas por notificação ou acordo. Avaliamos com você o caminho mais adequado antes de qualquer medida.",
      },
    ],
  },
];

const faq: Faq[] = [
  {
    question: "Como funciona a primeira consulta?",
    answer:
      "Você conta o que está acontecendo e nós ouvimos com atenção. Em seguida, explicamos os caminhos possíveis, os documentos necessários e os próximos passos. Você sai sabendo o que pode ser feito, sem compromisso de contratar.",
  },
  {
    question: "Quanto custam os honorários?",
    answer:
      "Os honorários (o valor cobrado pelo trabalho do advogado) variam conforme o tipo e a complexidade do caso. Eles são informados antes de qualquer contratação e registrados em contrato escrito.",
  },
  {
    question: "Quais documentos devo levar?",
    answer:
      "Documento de identidade e tudo o que tiver relação com o caso: contratos, comprovantes, mensagens, notificações. Se não souber o que separar, traga o que tiver e orientamos o restante.",
  },
  {
    question: "O atendimento pode ser online?",
    answer:
      "Sim. Atendemos por videochamada com o mesmo cuidado do atendimento presencial. Documentos podem ser enviados em formato digital.",
  },
  {
    question: "Quanto tempo demora um processo?",
    answer:
      "Depende do tipo de ação, do tribunal e do comportamento das partes. Não é possível prometer prazos. O que fazemos é explicar as etapas e manter você informado sobre cada andamento.",
  },
  {
    question: "Vocês garantem o resultado?",
    answer:
      "Não. Nenhum advogado pode garantir o resultado de um processo, pois a decisão cabe ao Judiciário. Nosso compromisso é com um trabalho técnico, diligente e transparente.",
  },
  {
    question: "Como acompanho o andamento do meu caso?",
    answer:
      "Você recebe atualizações sempre que houver uma movimentação relevante e pode tirar dúvidas pelos nossos canais de atendimento em horário comercial.",
  },
  {
    question: "Minhas informações ficam em sigilo?",
    answer:
      "Sim. O sigilo profissional é um dever do advogado. Além disso, tratamos seus dados pessoais conforme a Lei Geral de Proteção de Dados (LGPD), como descrito no nosso Aviso de Privacidade.",
  },
  {
    question: `O escritório atende clientes de fora de ${city}?`,
    answer: `Sim. O atendimento online permite acompanhar clientes de outras cidades. Quando a presença é necessária, combinamos previamente como será feito.`,
  },
];

const posts: Post[] = [
  {
    slug: "como-o-valor-da-pensao-alimenticia-e-definido",
    title: "Como o valor da pensão alimentícia é definido",
    description:
      "Não existe um percentual fixo em lei. Entenda quais critérios são considerados para definir a pensão.",
    date: "2026-09-14",
    readingMinutes: 4,
    area: "direito-de-familia",
    sections: [
      {
        heading: "Não existe percentual fixo",
        paragraphs: [
          "É comum ouvir que a pensão corresponde a 30% do salário. Esse número aparece em muitos acordos, mas não está na lei. O valor é definido caso a caso.",
          "A análise parte de duas perguntas: do que a criança precisa e quanto quem paga tem condições de contribuir.",
        ],
      },
      {
        heading: "O que entra na conta",
        paragraphs: [
          "Entram as despesas com alimentação, moradia, saúde, educação, vestuário e lazer. Comprovantes ajudam a mostrar o custo real da rotina.",
          "Do outro lado, são consideradas a renda e as despesas de quem vai pagar. O objetivo é chegar a um valor proporcional e possível de ser cumprido.",
        ],
      },
      {
        heading: "O valor pode ser revisto",
        paragraphs: [
          "Sim. Se as necessidades da criança ou a condição financeira de quem paga mudarem, é possível pedir a revisão do valor, para mais ou para menos.",
          "Enquanto não houver nova decisão ou acordo formalizado, vale o valor anterior. Por isso, mudanças informais merecem cuidado.",
        ],
      },
    ],
  },
  {
    slug: "rescisao-do-contrato-de-trabalho-o-que-conferir",
    title: "Rescisão do contrato de trabalho: o que conferir",
    description:
      "Saldo de salário, férias, 13º e FGTS: veja o que costuma compor o acerto e quais documentos guardar.",
    date: "2026-08-03",
    readingMinutes: 5,
    area: "direito-trabalhista",
    sections: [
      {
        heading: "O que são verbas rescisórias",
        paragraphs: [
          "São os valores devidos ao trabalhador quando o contrato termina. O que entra no cálculo depende da forma do desligamento: pedido de demissão, dispensa sem justa causa, acordo ou justa causa.",
        ],
      },
      {
        heading: "Itens que costumam aparecer",
        paragraphs: [
          "Em uma dispensa sem justa causa, é comum constarem saldo de salário, aviso-prévio, férias vencidas e proporcionais com acréscimo de um terço, 13º proporcional e a multa sobre o saldo do FGTS.",
          "Em outras formas de desligamento, alguns desses itens mudam ou deixam de existir. Vale conferir o termo de rescisão com calma, linha por linha.",
        ],
      },
      {
        heading: "Documentos para guardar",
        paragraphs: [
          "Guarde o termo de rescisão, os últimos holerites, o extrato do FGTS e os registros de ponto, se tiver acesso. Mensagens e e-mails sobre o desligamento também podem ser úteis.",
          "Em caso de dúvida sobre os valores, uma conferência por um profissional ajuda a entender se há algo a ser corrigido.",
        ],
      },
    ],
  },
  {
    slug: "direito-de-arrependimento-em-compras-pela-internet",
    title: "Direito de arrependimento em compras pela internet",
    description:
      "Comprou online e se arrependeu? Entenda o prazo de sete dias e como registrar o pedido de devolução.",
    date: "2026-06-22",
    readingMinutes: 3,
    area: "direito-do-consumidor",
    sections: [
      {
        heading: "O que diz a regra",
        paragraphs: [
          "Em compras feitas fora do estabelecimento comercial, como pela internet ou por telefone, o consumidor pode desistir em até sete dias. O prazo conta a partir do recebimento do produto ou da assinatura do contrato.",
          "Não é preciso apresentar motivo. A ideia é compensar o fato de a pessoa não ter visto o produto de perto antes de comprar.",
        ],
      },
      {
        heading: "Como pedir",
        paragraphs: [
          "Comunique a desistência pelos canais oficiais da loja e guarde o protocolo. Prefira meios que deixem registro, como e-mail ou chat com transcrição.",
          "Os valores pagos devem ser devolvidos, incluindo o frete. Mantenha o produto e a embalagem em bom estado até a devolução.",
        ],
      },
      {
        heading: "E se a loja não responder",
        paragraphs: [
          "Registre uma reclamação em um órgão de defesa do consumidor e reúna todos os comprovantes. Se ainda assim não houver solução, é possível avaliar outras medidas com orientação jurídica.",
        ],
      },
    ],
  },
];

export const site = {
  name,
  shortName,
  city,
  state,
  cityState,
  tagline: `${segment.label} em ${city}`,
  description: `${name}: escritório de ${segment.label.toLowerCase()} em ${cityState}. Atendimento a pessoas e empresas em Direito de Família, Trabalhista, Empresarial e do Consumidor.`,
  demoNotice:
    "Demonstração: escritório, profissionais, registros, contatos e depoimentos são fictícios",
  registryNumber,

  contact: {
    phoneDisplay: "(12) 99102-6455",
    phoneE164: "+5512991026455",
    whatsappDisplay: "(12) 99102-6455",
    whatsappNumber: "5512991026455",
    whatsappMessage: "Olá! Gostaria de agendar uma consulta.",
    email: "contato@escritorio.example",
    addressLines: ["[Rua Fictícia, 000, sala 00]", `[Bairro] · ${cityState}`, "[CEP 00000-000]"],
    // Só posiciona o mapa incorporado: é uma rua real e genérica do centro de São Paulo.
    // O endereço exibido no site (addressLines) é fictício. Troque os dois pelo endereço real.
    mapQuery: "Rua Líbero Badaró, Centro, São Paulo - SP",
  },

  hours: [
    { days: "Segunda a sexta", time: "9h às 18h" },
    { days: "Sábado", time: "Mediante agendamento" },
  ],

  social: [
    { network: "instagram", label: "Instagram", href: "https://instagram.example/escritorio" },
    { network: "linkedin", label: "LinkedIn", href: "https://linkedin.example/escritorio" },
    { network: "facebook", label: "Facebook", href: "https://facebook.example/escritorio" },
  ] as const,

  nav: [
    { label: "Início", href: "/" },
    { label: "Sobre", href: "/sobre" },
    { label: "Áreas de Atuação", href: "/areas-de-atuacao" },
    { label: "Blog", href: "/blog" },
    { label: "Dúvidas", href: "/duvidas-frequentes" },
    { label: "Contato", href: "/contato" },
  ],

  cta: {
    primary: "Agende uma consulta",
    secondary: "Conheça as áreas",
    whatsapp: "Falar pelo WhatsApp",
    title: "Vamos conversar sobre o seu caso?",
    text: "Conte o que está acontecendo. Explicamos os caminhos possíveis e os próximos passos, em linguagem simples.",
  },

  trustNumbers: [
    { value: "12", label: "anos de atuação" },
    { value: "800+", label: "clientes atendidos" },
    { value: String(areas.length), label: "áreas de atuação" },
    { value: `${segment.registry}/${state}`, label: "registro nº 000.000 (fictício)" },
  ],

  home: {
    metaTitle: `${segment.label} em ${city}: Família, Trabalhista, Empresarial e Consumidor`,
    hero: {
      eyebrow: `Escritório de ${segment.label.toLowerCase()} em ${city}`,
      title: "Orientação jurídica clara para as decisões que importam",
      subtitle:
        "Atendemos pessoas e empresas em Direito de Família, Trabalhista, Empresarial e do Consumidor. Você entende cada etapa antes de decidir.",
      card: { icon: CalendarCheck, title: "Atendimento presencial e online", text: "Segunda a sexta, das 9h às 18h" },
      image: {
        src: "/images/escritorio.webp",
        width: 1400,
        height: 1750,
        alt: "Escritório claro com divisórias de vidro, forro de madeira e plantas",
      },
    },
    intro: {
      eyebrow: "Quem somos",
      title: "Um escritório próximo, que explica antes de agir",
      paragraphs: [
        `O ${name} atende pessoas e empresas de ${city} com uma ideia simples: ninguém deveria tomar uma decisão jurídica sem entender o que está assinando ou pedindo.`,
        "Por isso, cada atendimento começa com escuta. Depois vêm a análise dos documentos, a explicação das alternativas e uma proposta por escrito.",
      ],
      link: "Conheça o escritório",
    },
    areas: {
      eyebrow: "Áreas de atuação",
      title: "Em que podemos ajudar",
      lead: "Quatro áreas, com profissionais dedicados a cada uma delas.",
      link: "Ver todas as áreas",
    },
    team: { link: "Conheça a equipe" },
    differentials: {
      eyebrow: "Como trabalhamos",
      title: "O que você pode esperar do nosso atendimento",
      lead: "Compromissos que valem para todos os casos, do mais simples ao mais delicado.",
    },
    band: {
      title: "Uma dúvida jurídica não precisa virar um problema maior",
      text: "Quanto antes você entende seus direitos, mais opções tem para decidir.",
      cardTitle: "Contato rápido",
      image: {
        src: "/images/biblioteca.webp",
        width: 1920,
        height: 1107,
        alt: "Estantes baixas de madeira com fileiras de livros jurídicos encadernados",
      },
    },
    testimonials: {
      eyebrow: "Depoimentos ilustrativos",
      title: "Como é ser atendido aqui",
      note: "Textos fictícios, criados apenas para demonstrar o layout.",
    },
    faq: {
      eyebrow: "Dúvidas frequentes",
      title: "Perguntas que ouvimos todos os dias",
      lead: "Respostas diretas para quem está procurando um advogado pela primeira vez.",
      link: "Ver todas as dúvidas",
    },
  },

  process: [
    { title: "Primeiro contato", text: "Você nos procura por telefone, WhatsApp ou formulário e agendamos um horário." },
    { title: "Consulta e análise", text: "Ouvimos o seu relato, avaliamos os documentos e explicamos os caminhos possíveis." },
    { title: "Proposta por escrito", text: "Você recebe o escopo do trabalho e os honorários antes de decidir contratar." },
    { title: "Acompanhamento", text: "Informamos cada andamento relevante e seguimos disponíveis para dúvidas." },
  ],

  differentials: [
    { icon: MessagesSquare, title: "Linguagem simples", text: "Termos jurídicos são sempre explicados. Você entende o que está sendo feito e por quê." },
    { icon: FileText, title: "Tudo por escrito", text: "Escopo e honorários são formalizados em contrato antes do início do trabalho." },
    { icon: Clock, title: "Retorno em horário comercial", text: "Mensagens e ligações são respondidas pela equipe que conhece o seu caso." },
    { icon: ShieldCheck, title: "Sigilo e proteção de dados", text: "Informações tratadas com sigilo profissional e conforme a LGPD." },
  ],

  testimonials: [
    {
      quote:
        "Cheguei sem entender nada do que estava acontecendo. Saí da primeira conversa sabendo quais eram as minhas opções e o que cada uma envolvia.",
      name: "Cliente fictício A",
      context: "Direito de Família",
      initials: "CA",
      rating: 5,
    },
    {
      quote: "O que mais valorizei foi receber as informações por escrito e sem termos complicados.",
      name: "Cliente fictício B",
      context: "Direito do Consumidor",
      initials: "CB",
      rating: 5,
    },
    {
      quote: "A equipe revisou nossos contratos e explicou cada ajuste. Ficou mais fácil decidir.",
      name: "Cliente fictício C",
      context: "Direito Empresarial",
      initials: "CC",
      rating: 5,
    },
  ],

  about: {
    title: "Sobre o escritório",
    lead: `Conheça a história, os valores e as pessoas do ${name}.`,
    history: {
      eyebrow: "Nossa história",
      title: "Um escritório criado para explicar o Direito",
      paragraphs: [
        `O ${name} foi fundado em ${city} em 2014 por profissionais que compartilhavam a mesma inquietação: muita gente deixa de buscar seus direitos por não entender a linguagem jurídica.`,
        "Desde então, o escritório cresceu de forma gradual, mantendo um atendimento próximo. Cada cliente sabe quem cuida do seu caso e como falar com essa pessoa.",
        "Hoje a equipe se divide entre quatro áreas de atuação e atende pessoas e empresas, presencialmente e a distância.",
      ],
      image: {
        src: "/images/estantes.webp",
        width: 1920,
        height: 1272,
        alt: "Corredor entre estantes altas repletas de livros de Direito",
      },
    },
    mission: {
      eyebrow: "Missão",
      text: "Oferecer orientação jurídica técnica e compreensível, para que cada pessoa decida com informação e tranquilidade.",
    },
    values: {
      eyebrow: "Valores",
      title: "O que orienta o nosso trabalho",
      items: [
        { title: "Clareza", text: "Explicamos riscos, etapas e custos de forma direta." },
        { title: "Sigilo", text: "O que é dito no escritório permanece no escritório." },
        { title: "Responsabilidade", text: "Não prometemos resultados. Assumimos o compromisso com o trabalho bem feito." },
        { title: "Respeito", text: "Cada caso envolve uma história. Tratamos todas com atenção e sem julgamento." },
      ],
    },
    team: {
      eyebrow: "Equipe",
      title: "Quem atende você",
      lead: "Profissionais fictícios, apresentados apenas para demonstração.",
    },
  },

  team: [
    {
      name: "Dr. Henrique Lacerda",
      role: "Sócio-fundador",
      specialty: "Direito Empresarial",
      education: "[Graduação e pós-graduação: instituição fictícia]",
      registry: registryNumber,
      photo: "/images/equipe-lacerda.webp",
      alt: "Retrato de Dr. Henrique Lacerda, de óculos e blazer escuro",
    },
    {
      name: "Dra. Marina Sampaio",
      role: "Sócia-fundadora",
      specialty: "Direito de Família",
      education: "[Graduação e pós-graduação: instituição fictícia]",
      registry: registryNumber,
      photo: "/images/equipe-sampaio.webp",
      alt: "Retrato de Dra. Marina Sampaio, sorrindo, de blazer branco",
    },
    {
      name: "Dra. Paula Menezes",
      role: "Advogada associada",
      specialty: "Direito Trabalhista",
      education: "[Graduação e pós-graduação: instituição fictícia]",
      registry: registryNumber,
      photo: "/images/equipe-associada.webp",
      alt: "Retrato de Dra. Paula Menezes, sorrindo, de óculos e blazer azul",
    },
    {
      name: "Dr. André Teixeira",
      role: "Advogado associado",
      specialty: "Direito do Consumidor",
      education: "[Graduação e pós-graduação: instituição fictícia]",
      registry: registryNumber,
      photo: "/images/equipe-associado.webp",
      alt: "Retrato de Dr. André Teixeira, de terno escuro e gravata",
    },
  ],

  areasPage: {
    title: "Áreas de atuação",
    lead: `Atendimento jurídico em ${city} para pessoas e empresas, em quatro áreas.`,
    processTitle: "Como é o atendimento",
    processLead: "O mesmo caminho em todas as áreas, do primeiro contato ao acompanhamento.",
  },
  areas,

  faqPage: {
    title: "Dúvidas frequentes",
    lead: "Respostas em linguagem simples para as perguntas mais comuns de quem procura o escritório.",
    asideTitle: "Não encontrou a sua dúvida?",
    asideText: "Fale com a nossa equipe. Respondemos em horário comercial.",
  },
  faq,

  contactPage: {
    title: "Contato",
    lead: `Fale com o ${name}. Atendemos presencialmente em ${city} e por videochamada.`,
    formTitle: "Envie uma mensagem",
    formLead: "Preencha os campos abaixo e retornaremos em horário comercial.",
    successTitle: "Mensagem enviada",
    successText: "Recebemos o seu contato e retornaremos em horário comercial.",
    errorText:
      "Não foi possível enviar a mensagem agora. Seus dados continuam preenchidos: tente novamente em instantes ou fale conosco por telefone ou WhatsApp.",
    mapTitle: "Como chegar",
  },

  blogPage: {
    title: "Blog",
    lead: "Artigos educativos sobre temas do dia a dia, sem juridiquês.",
    exampleBadge: "Conteúdo de exemplo",
    disclaimer:
      "Este artigo é um exemplo fictício, tem caráter apenas informativo e não substitui a consulta a um profissional habilitado.",
  },
  posts,

  privacy: {
    title: "Aviso de Privacidade",
    lead: "Como tratamos os dados pessoais enviados por este site, conforme a Lei nº 13.709/2018 (LGPD).",
    updatedAt: "2026-11-01",
    sections: [
      {
        heading: "Quem é o controlador dos dados",
        paragraphs: [
          `O controlador (quem decide como os dados são usados) é [Razão Social do Escritório], inscrito no CNPJ sob o nº [00.000.000/0000-00 fictício], com sede em [Endereço fictício], ${cityState}.`,
        ],
      },
      {
        heading: "Quais dados coletamos",
        paragraphs: [
          "Coletamos apenas os dados que você informa no formulário de contato: nome, e-mail, telefone e o conteúdo da mensagem.",
          "Este site não utiliza ferramentas de análise de audiência nem cookies de rastreamento.",
        ],
      },
      {
        heading: "Para que usamos os dados",
        paragraphs: [
          "Usamos os dados para responder ao seu contato e, se for o caso, agendar um atendimento. A base legal é o seu consentimento, dado ao marcar a caixa de autorização no formulário.",
          "Não vendemos nem compartilhamos seus dados com terceiros para fins de publicidade.",
        ],
      },
      {
        heading: "Por quanto tempo guardamos",
        paragraphs: [
          "As mensagens são mantidas pelo tempo necessário para o atendimento e, depois disso, pelo prazo de [prazo a definir], salvo obrigação legal de guarda por período maior.",
        ],
      },
      {
        heading: "Com quem compartilhamos",
        paragraphs: [
          "O envio do formulário pode utilizar um serviço de entrega de e-mails contratado pelo escritório, que atua como operador (empresa que trata dados em nosso nome).",
        ],
      },
      {
        heading: "Quais são os seus direitos",
        paragraphs: [
          "Você pode pedir a confirmação do tratamento, o acesso, a correção ou a exclusão dos seus dados, além de retirar o consentimento a qualquer momento.",
          "Para exercer esses direitos, fale com o encarregado pelo tratamento de dados: Dra. Marina Sampaio, pelo e-mail privacidade@escritorio.example.",
        ],
      },
    ],
  },

  photoCredits: [
    { title: "Escritório", author: "Caroline Badran", license: "Unsplash", href: "https://unsplash.com/photos/modern-office-interior-with-glass-walls-and-plants-B74lBYC3PXI" },
    { title: "Retrato 1", author: "LinkedIn Sales Solutions", license: "Unsplash", href: "https://unsplash.com/photos/pAtA8xe_iVM" },
    { title: "Retrato 2", author: "arthur henrique", license: "Unsplash", href: "https://unsplash.com/photos/SLd8M9knkGc" },
    { title: "Retrato 3", author: "Vitaly Gariev", license: "Unsplash", href: "https://unsplash.com/photos/jI4HREHtae4" },
    { title: "Retrato 4", author: "Jeppe Mønster", license: "Unsplash", href: "https://unsplash.com/photos/qIZNyuZe638" },
    { title: "Wolf Law Library books", author: "Jrcla2", license: "domínio público, Wikimedia Commons", href: "https://commons.wikimedia.org/wiki/File:Wolf_Law_Library_books.jpg" },
    { title: "Osgoode Hall Law School Library", author: "Raysonho", license: "CC0, Wikimedia Commons", href: "https://commons.wikimedia.org/wiki/File:OsgoodeHallLawSchoolLibrary2.jpg" },
  ],

  legalLine: `Site de demonstração. ${name} não existe. Substitua todos os dados antes de qualquer uso real.`,
};

export const whatsappUrl = `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(site.contact.whatsappMessage)}`;
export const telUrl = `tel:${site.contact.phoneE164}`;
export const mailUrl = `mailto:${site.contact.email}`;
export const getArea = (slug: string) => areas.find((a) => a.slug === slug);
export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });
