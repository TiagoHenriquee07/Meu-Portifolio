# Portfólio — Tiago Oliveira

Portfólio profissional de Tiago Henrique Penteado de Oliveira, estudante de Gestão da Tecnologia da Informação com foco em desenvolvimento Front-end, React, React Native, UI/UX e qualidade de software.

## Tecnologias

- ASP.NET Core 10 LTS com Razor Pages
- HTML semântico, CSS e JavaScript sem dependências de interface externas
- GitHub Actions e GitHub Pages

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

## Conteúdo a completar

Antes de usar o portfólio ou currículo em candidaturas, informe:

- instituição, semestre e previsão de conclusão do curso;
- experiências profissionais, se houver;
- cursos, certificados e conquistas;
- demonstrações publicadas dos projetos;
- um currículo PDF definitivo, caso queira substituir o atual.

Nenhuma experiência ou certificação foi inventada. Os avisos visíveis no site e no currículo deixam os dados ausentes claramente identificados.
