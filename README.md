# Portfólio — Tiago Oliveira

Portfólio profissional de Tiago Henrique Penteado de Oliveira. O site reúne sua formação em Gestão da Tecnologia da Informação, projetos de desenvolvimento e experiência em operações, planejamento, atendimento e organização de processos.

## Tecnologias

- ASP.NET Core 10 LTS com Razor Pages
- HTML semântico, CSS e JavaScript sem dependências de interface externas
- GitHub Actions e GitHub Pages
- Imagem pessoal otimizada para carregamento responsivo

## Executar localmente

Requer o SDK do .NET 10.

```bash
dotnet restore Meu-Portifolio.sln
dotnet run --project MeuPortifolioWeb/MeuPortifolioWeb.csproj
```

O terminal informará o endereço local. O perfil `http` também pode ser iniciado com:

```bash
dotnet run --project MeuPortifolioWeb/MeuPortifolioWeb.csproj --launch-profile http
```

## Verificações

```bash
dotnet build Meu-Portifolio.sln --configuration Release
dotnet test Meu-Portifolio.sln --configuration Release
```

O repositório ainda não possui um projeto de testes automatizados; `dotnet test` valida a solução sem executar casos de teste.

## Publicação no GitHub Pages

O GitHub Pages hospeda somente arquivos estáticos e não executa ASP.NET no servidor. Por isso, o workflow [deploy-pages.yml](.github/workflows/deploy-pages.yml) executa a aplicação durante a compilação, captura o HTML renderizado e publica esse HTML junto dos arquivos de `wwwroot`.

O caminho-base é calculado automaticamente:

- repositório `usuario.github.io`: publica na raiz `/`;
- outro repositório: publica em `/nome-do-repositorio/`.

Para ativar a primeira publicação:

1. Abra **Settings → Pages** no repositório do GitHub.
2. Em **Build and deployment → Source**, selecione **GitHub Actions**.
3. Envie a branch `main`; o workflow também pode ser iniciado manualmente em **Actions**.

Após o deploy deste repositório, o endereço esperado é:

`https://tiagohenriquee07.github.io/Meu-Portifolio/`

## Conteúdo

As informações profissionais, acadêmicas e os cursos exibidos no site foram conferidos com o currículo fornecido. O PDF definitivo está disponível para visualização e download em `wwwroot/files/curriculo-tiago-oliveira.pdf`.

Os projetos apontam para seus repositórios públicos. As demonstrações são identificadas como ainda não publicadas para evitar links ou resultados inexistentes. Quando houver URLs de demonstração, capturas reais ou métricas verificáveis, elas poderão complementar os estudos de caso.
