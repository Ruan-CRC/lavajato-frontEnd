# Projeto Frontend vue

Este é o frontend do sistema de agendamento para uma lava-jato. As funcionalidades disponíveis no frontend são exclusivamente para visualizar os agendamentos; outras funcionalidades não estão completamente implementadas.

## Project Setup

1. Copie o arquivo de exemplo de variáveis de ambiente:

```sh
cp .env.example .env
```

### Compile and Hot-Reload for Development

2. Execute o projeto em um contêiner Docker:

```sh
docker run -p 4173:80 lavajato-front
```

3. Acesse o sistema em http://localhost:4173.

4. Insira dados fictícios para testar. Abra outra página ou navegador na agenda e veja o WebSocket em ação.
