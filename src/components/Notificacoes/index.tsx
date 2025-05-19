import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface Notificacao {
  id: string;
  tipo: 'dica' | 'alerta' | 'lembrete' | 'conquista';
  titulo: string;
  mensagem: string;
  data: string;
  lida: boolean;
  icone: string;
  acao?: {
    texto: string;
    link: string;
  };
}

const NotificacoesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
`;

const SectionCard = styled.div`
  background-color: var(--surface-color);
  border-radius: var(--border-radius);
  padding: var(--spacing-lg);
  box-shadow: var(--box-shadow);
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
`;

const SectionTitle = styled.h2`
  color: var(--text-color);
  font-weight: 600;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  
  &::before {
    content: '';
    display: block;
    width: 4px;
    height: 20px;
    background-color: var(--primary-color);
    border-radius: 2px;
  }
`;

const ClearAllButton = styled.button`
  background: none;
  border: none;
  color: var(--primary-color);
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: var(--border-radius-sm);
  
  &:hover {
    background-color: rgba(98, 0, 238, 0.05);
  }
  
  &:focus {
    outline: 2px solid var(--primary-light);
    outline-offset: 2px;
  }
`;

const NotificacaoItem = styled.div<{ lida: boolean }>`
  padding: var(--spacing-md);
  border-radius: var(--border-radius-sm);
  background-color: ${props => props.lida ? 'transparent' : 'rgba(98, 0, 238, 0.05)'};
  border-left: 3px solid ${props => props.lida ? '#e0e0e0' : 'var(--primary-color)'};
  margin-bottom: var(--spacing-md);
  transition: all 0.2s;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &:hover {
    box-shadow: var(--box-shadow);
  }
`;

const NotificacaoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-sm);
`;

const NotificacaoTitulo = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--text-color);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NotificacaoIcone = styled.span<{ tipo: string }>`
  font-size: 1.25rem;
  color: ${props => {
    switch (props.tipo) {
      case 'dica': return 'var(--primary-color)';
      case 'alerta': return 'var(--error-color)';
      case 'lembrete': return 'var(--warning-color)';
      case 'conquista': return 'var(--success-color)';
      default: return 'var(--text-secondary)';
    }
  }};
`;

const NotificacaoData = styled.span`
  font-size: 0.8rem;
  color: var(--text-secondary);
`;

const NotificacaoMensagem = styled.p`
  margin: var(--spacing-sm) 0;
  color: var(--text-color);
  font-size: 0.95rem;
  line-height: 1.5;
`;

const NotificacaoAcoes = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--spacing-sm);
`;

const AcaoLink = styled.a`
  color: var(--primary-color);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.5rem 0.75rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;
  
  &:hover {
    background-color: rgba(98, 0, 238, 0.05);
    text-decoration: none;
  }
  
  &:focus {
    outline: 2px solid var(--primary-light);
    outline-offset: 2px;
  }
`;

const MarcarLidaButton = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: var(--border-radius-sm);
  
  &:hover {
    color: var(--text-color);
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: var(--spacing-lg);
  color: var(--text-secondary);
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: var(--spacing-md);
  overflow-x: auto;
  scrollbar-width: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Tab = styled.button<{ active: boolean }>`
  padding: var(--spacing-md) var(--spacing-lg);
  background: none;
  border: none;
  border-bottom: 2px solid ${props => props.active ? 'var(--primary-color)' : 'transparent'};
  color: ${props => props.active ? 'var(--primary-color)' : 'var(--text-secondary)'};
  font-weight: ${props => props.active ? '500' : 'normal'};
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  
  &:hover {
    color: var(--primary-color);
  }
  
  &:focus {
    outline: none;
    background-color: rgba(98, 0, 238, 0.05);
  }
`;

const BadgeCount = styled.span`
  background-color: var(--primary-color);
  color: white;
  font-size: 0.75rem;
  padding: 0.1rem 0.5rem;
  border-radius: 10px;
  margin-left: 0.5rem;
`;

const Notificacoes: React.FC = () => {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [tabAtiva, setTabAtiva] = useState<'todas' | 'dicas' | 'alertas' | 'lembretes' | 'conquistas'>('todas');
  
  // Simular carregamento de notificações
  useEffect(() => {
    // Em um cenário real, isso viria de uma API
    const notificacoesSimuladas: Notificacao[] = [
      {
        id: '1',
        tipo: 'dica',
        titulo: 'Economize com a regra 50-30-20',
        mensagem: 'Tente dividir seu orçamento assim: 50% para necessidades, 30% para desejos e 20% para poupança e investimentos. Esta é uma maneira simples de equilibrar suas finanças.',
        data: '2025-05-18T10:30:00',
        lida: false,
        icone: '💡',
        acao: {
          texto: 'Saiba mais',
          link: '/dicas/regra-50-30-20'
        }
      },
      {
        id: '2',
        tipo: 'alerta',
        titulo: 'Gastos com alimentação acima do normal',
        mensagem: 'Seus gastos com alimentação estão 30% acima da média dos últimos 3 meses. Considere revisar seus hábitos de consumo nesta categoria.',
        data: '2025-05-17T14:15:00',
        lida: false,
        icone: '⚠️'
      },
      {
        id: '3',
        tipo: 'lembrete',
        titulo: 'Fatura do cartão vence em 3 dias',
        mensagem: 'A fatura do seu cartão Nubank no valor de R$ 1.200,00 vence em 17/05/2025. Não esqueça de efetuar o pagamento para evitar juros.',
        data: '2025-05-14T09:00:00',
        lida: true,
        icone: '🔔'
      },
      {
        id: '4',
        tipo: 'conquista',
        titulo: 'Meta de economia atingida!',
        mensagem: 'Parabéns! Você atingiu sua meta de economizar R$ 5.000,00 para sua reserva de emergência. Continue com o bom trabalho!',
        data: '2025-05-10T16:45:00',
        lida: true,
        icone: '🏆'
      },
      {
        id: '5',
        tipo: 'dica',
        titulo: 'Invista seu dinheiro parado',
        mensagem: 'Você tem R$ 3.500,00 parados em conta corrente. Considere investir em um CDB ou fundo de renda fixa para obter melhores rendimentos.',
        data: '2025-05-08T11:20:00',
        lida: false,
        icone: '💰',
        acao: {
          texto: 'Ver opções de investimento',
          link: '/investimentos/recomendacoes'
        }
      },
      {
        id: '6',
        tipo: 'dica',
        titulo: 'Reduza gastos com assinaturas',
        mensagem: 'Identificamos que você gasta R$ 250,00 mensais com serviços de assinatura. Revise quais você realmente utiliza e considere cancelar os demais.',
        data: '2025-05-05T13:10:00',
        lida: true,
        icone: '📊'
      },
      {
        id: '7',
        tipo: 'lembrete',
        titulo: 'Atualize seu orçamento mensal',
        mensagem: 'Já estamos na metade do mês e você ainda não atualizou seu orçamento. Manter um controle regular ajuda a evitar surpresas no fim do mês.',
        data: '2025-05-15T10:00:00',
        lida: false,
        icone: '📅',
        acao: {
          texto: 'Atualizar orçamento',
          link: '/orcamento'
        }
      }
    ];
    
    setNotificacoes(notificacoesSimuladas);
  }, []);
  
  // Filtrar notificações com base na tab ativa
  const notificacoesFiltradas = notificacoes.filter(notificacao => {
    if (tabAtiva === 'todas') return true;
    if (tabAtiva === 'dicas') return notificacao.tipo === 'dica';
    if (tabAtiva === 'alertas') return notificacao.tipo === 'alerta';
    if (tabAtiva === 'lembretes') return notificacao.tipo === 'lembrete';
    if (tabAtiva === 'conquistas') return notificacao.tipo === 'conquista';
    return true;
  });
  
  // Ordenar notificações por data (mais recentes primeiro) e não lidas primeiro
  const notificacoesOrdenadas = [...notificacoesFiltradas].sort((a, b) => {
    // Primeiro por status de leitura
    if (!a.lida && b.lida) return -1;
    if (a.lida && !b.lida) return 1;
    
    // Depois por data
    return new Date(b.data).getTime() - new Date(a.data).getTime();
  });
  
  // Contar notificações não lidas por tipo
  const contarNaoLidas = (tipo: 'todas' | 'dicas' | 'alertas' | 'lembretes' | 'conquistas') => {
    return notificacoes.filter(n => {
      if (!n.lida) {
        if (tipo === 'todas') return true;
        if (tipo === 'dicas') return n.tipo === 'dica';
        if (tipo === 'alertas') return n.tipo === 'alerta';
        if (tipo === 'lembretes') return n.tipo === 'lembrete';
        if (tipo === 'conquistas') return n.tipo === 'conquista';
      }
      return false;
    }).length;
  };
  
  // Marcar notificação como lida
  const marcarComoLida = (id: string) => {
    setNotificacoes(notificacoes.map(n => 
      n.id === id ? { ...n, lida: true } : n
    ));
  };
  
  // Marcar todas como lidas
  const marcarTodasComoLidas = () => {
    setNotificacoes(notificacoes.map(n => ({ ...n, lida: true })));
  };
  
  // Formatar data relativa
  const formatarDataRelativa = (dataString: string) => {
    const data = new Date(dataString);
    const agora = new Date();
    const diferencaMs = agora.getTime() - data.getTime();
    const diferencaMinutos = Math.floor(diferencaMs / (1000 * 60));
    const diferencaHoras = Math.floor(diferencaMs / (1000 * 60 * 60));
    const diferencaDias = Math.floor(diferencaMs / (1000 * 60 * 60 * 24));
    
    if (diferencaMinutos < 60) {
      return `${diferencaMinutos} min atrás`;
    } else if (diferencaHoras < 24) {
      return `${diferencaHoras} h atrás`;
    } else if (diferencaDias < 7) {
      return `${diferencaDias} dias atrás`;
    } else {
      return data.toLocaleDateString('pt-BR');
    }
  };
  
  return (
    <NotificacoesContainer>
      <SectionCard>
        <SectionHeader>
          <SectionTitle>Notificações</SectionTitle>
          {notificacoes.some(n => !n.lida) && (
            <ClearAllButton onClick={marcarTodasComoLidas}>
              Marcar todas como lidas
            </ClearAllButton>
          )}
        </SectionHeader>
        
        <TabsContainer>
          <Tab 
            active={tabAtiva === 'todas'} 
            onClick={() => setTabAtiva('todas')}
          >
            Todas
            {contarNaoLidas('todas') > 0 && <BadgeCount>{contarNaoLidas('todas')}</BadgeCount>}
          </Tab>
          <Tab 
            active={tabAtiva === 'dicas'} 
            onClick={() => setTabAtiva('dicas')}
          >
            Dicas Financeiras
            {contarNaoLidas('dicas') > 0 && <BadgeCount>{contarNaoLidas('dicas')}</BadgeCount>}
          </Tab>
          <Tab 
            active={tabAtiva === 'alertas'} 
            onClick={() => setTabAtiva('alertas')}
          >
            Alertas
            {contarNaoLidas('alertas') > 0 && <BadgeCount>{contarNaoLidas('alertas')}</BadgeCount>}
          </Tab>
          <Tab 
            active={tabAtiva === 'lembretes'} 
            onClick={() => setTabAtiva('lembretes')}
          >
            Lembretes
            {contarNaoLidas('lembretes') > 0 && <BadgeCount>{contarNaoLidas('lembretes')}</BadgeCount>}
          </Tab>
          <Tab 
            active={tabAtiva === 'conquistas'} 
            onClick={() => setTabAtiva('conquistas')}
          >
            Conquistas
            {contarNaoLidas('conquistas') > 0 && <BadgeCount>{contarNaoLidas('conquistas')}</BadgeCount>}
          </Tab>
        </TabsContainer>
        
        {notificacoesOrdenadas.length === 0 ? (
          <EmptyState>
            <p>Não há notificações {tabAtiva !== 'todas' ? `do tipo ${tabAtiva}` : ''} para exibir.</p>
          </EmptyState>
        ) : (
          notificacoesOrdenadas.map(notificacao => (
            <NotificacaoItem key={notificacao.id} lida={notificacao.lida}>
              <NotificacaoHeader>
                <NotificacaoTitulo>
                  <NotificacaoIcone tipo={notificacao.tipo}>{notificacao.icone}</NotificacaoIcone>
                  {notificacao.titulo}
                </NotificacaoTitulo>
                <NotificacaoData>{formatarDataRelativa(notificacao.data)}</NotificacaoData>
              </NotificacaoHeader>
              
              <NotificacaoMensagem>{notificacao.mensagem}</NotificacaoMensagem>
              
              <NotificacaoAcoes>
                {notificacao.acao && (
                  <AcaoLink href={notificacao.acao.link}>{notificacao.acao.texto}</AcaoLink>
                )}
                {!notificacao.lida && (
                  <MarcarLidaButton onClick={() => marcarComoLida(notificacao.id)}>
                    Marcar como lida
                  </MarcarLidaButton>
                )}
              </NotificacaoAcoes>
            </NotificacaoItem>
          ))
        )}
      </SectionCard>
    </NotificacoesContainer>
  );
};

export default Notificacoes;
