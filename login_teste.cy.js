// Define a suíte de testes para a página de login
describe('Validação da Página de Login', () => {

  // Define a URL base para navegação
  const LOGIN_URL = 'http://127.0.0.1:5500/A04/loginpage.html' // Altere para a URL real da sua aplicação

  // Hook que é executado antes de cada teste (navegar para a página)
  beforeEach(() => {
    cy.visit(LOGIN_URL)
  })

  // --- Caso de Teste 1: Validação de Conteúdo e Elementos Estáticos ---
  it('Deve carregar a página corretamente e verificar elementos visuais e estáticos', () => {
    
    // 1. Verificação de Título e Favicon (Conteúdo do Head)
    
    // Verifica se o título da página está correto (pode variar)
    cy.title().should('eq', 'Login | Nome da Aplicação') 
    
    // Valida o link do favicon (garantindo que o recurso está sendo carregado)
    cy.get('head link[rel="icon"]').should('have.attr', 'href').and('not.be.empty')
    
    // 2. Verificação do Logo ou Imagem Principal
    
    // Assume que a logo tem a classe 'app-logo' e verifica se está visível
    cy.get('.app-logo').should('be.visible')
    
    // Verifica se o logo é uma imagem com um atributo 'alt' (boa prática de acessibilidade)
    cy.get('.app-logo').should('have.attr', 'alt').and('not.be.empty')

    // 3. Verificação do Cabeçalho
    
    // Verifica se existe um cabeçalho principal que contém o texto "Entrar" ou similar
    cy.get('h1').should('be.visible').and('contain', 'Entrar')
  })

  // --- Caso de Teste 2: Validação de Elementos Interativos (Formulário) ---
  it('Deve verificar a presença e o estado inicial dos campos do formulário', () => {
    
    // 1. Campos de Usuário e Senha
    
    // Verifica o campo de usuário (assumindo id='username' ou id='user')
    cy.get('#username, #user').as('campoUsuario')
    cy.get('@campoUsuario')
      .should('be.visible') // Deve estar visível
      .and('have.attr', 'placeholder', 'Usuário ou E-mail') // Verifica o placeholder
      .and('have.value', '') // Deve estar vazio inicialmente
      .and('not.be.disabled') // Não deve estar desabilitado

    // Verifica o campo de senha
    cy.get('#password').as('campoSenha')
    cy.get('@campoSenha')
      .should('be.visible')
      .and('have.attr', 'type', 'password') // Verifica se o tipo é 'password'
      .and('have.value', '')
      
    // 2. Botão de Submissão
    
    cy.get('button[type="submit"]').as('btnSubmit')
    cy.get('@btnSubmit')
      .should('be.visible')
      .and('contain', 'Login') // Verifica o texto do botão
      .and('not.be.disabled') // O botão deve estar habilitado para uso

    // 3. Link "Esqueceu a Senha"
    
    cy.contains('a', 'esqueceu a senha').as('linkRecuperacao')
    cy.get('@linkRecuperacao')
      .should('be.visible')
      .and('have.attr', 'href') // Verifica se é um link com um atributo href
      .and('not.be.empty')
  })

   // --- Caso de Teste 3: Validação do nome do aluno
  it('Deve exibir o nome do estudante no footer', () => {
    // 1. Verificação do Rodapé
    
    // Verifica se existe um rodapé principal que contém o texto com o nome do aluno que fez a atividade "Caio Gomes de Oliveira"(no meu caso)
    cy.get('footer h1').should('be.visible').and('contain', 'Caio Gomes de Oliveira')
  })
})