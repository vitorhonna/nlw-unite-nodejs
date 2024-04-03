# Rocketseat NLW Unite - Node.js: pass.in

O pass.in é uma aplicação de **gestão de participantes em eventos presenciais**.

A ferramenta permite que o organizador cadastre um evento e abra uma página pública de inscrição.

Os participantes inscritos podem emitir uma credencial para check-in no dia do evento.

O sistema fará um scan da credencial do participante para permitir a entrada no evento.
 
## Requisitos

### Requisitos funcionais

- [ ] O organizador deve poder cadastrar um novo evento;
- [ ] O organizador deve poder visualizar dados de um evento;
- [ ] O organizador deve poser visualizar a lista de participantes;
- [ ] O participante deve poder se inscrever em um evento;
- [ ] O participante deve poder visualizar seu crachá de inscrição;
- [ ] O participante deve poder realizar check-in no evento;

### Regras de negócio

- [ ] O participante só pode se inscrever em um evento uma única vez;
- [ ] O participante só pode se inscrever em eventos com vagas disponíveis;
- [ ] O participante só pode realizar check-in em um evento uma única vez;

### Requisitos não-funcionais

- [ ] O check-in no evento será realizado através de um QRCode;

## Setup

- Install Node.js v20.11.1 using nvm and set it up for usage in the project:

```bash
nvm install 20.11.1
nvm use 20.11.1
```

- Clone the repository:

```bash
git clone <URL>
cd <PROJECT_NAME>
```

- Create a `.env` file in the root of the project with the following environment variables:

```env
echo "DATABASE_URL="file:./dev.db"" > .env
```

- Install the project dependencies:

```bash
npm install
```

- Execute the Prisma migrations to create the tables in the database:

```bash
npx prisma migrate dev
```

- Run the development server:

```bash
npm run dev
```

- To access the Prisma GUI and see the table contents, run:

```bash
npx prisma studio
```
