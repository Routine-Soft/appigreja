# appigreja

# BACKEND
## user / membros
Get Ok
Post (Criar) Ok
Post (login) Ok
Patch ok
Delete ok

## useradmin
Get Ok
Post (Criar) Ok
Post (login) Ok
Patch ok
Delete ok

## Cursos / Estudo Bíblico
Get Ok
Post (Criar) Ok
Post (login) Ok
Patch ok
Delete ok

## provas - desativado
## matriculas - desativado

## Cadastro Convite da Graça / é o user / membros
oK
A senha eu vou colocar 123456 no frontend

## Sistema PDV Cantina
Entendo o problema: 
- Ter nome do departameto ou igreja
- Precisa registrar produtos com nome, quantidade (opcional. Se nao botar, vende ilimitdo. se botar, relaciona a venda a quantidade), preço de venda: CRUD.
- Precisa registrar despesa: CRUD.
- Registrar Receita/Venda com quantidade e informações de pagamento: dinheiro(função de calcular troco), pix, cartão débito e crédito; e doação: CRUD. 
- Mostrar Lucro (sem registrar no banco de dados). 
- Emitir relatorio: pelo whatsapp, e em pdf. 

Entrada:
- Nome do departamento
- nome do produto
- quantidade
- preço venda unitário
- forma de pagamento
- despesa total
- valor pago pelo cliente
Processamento:
- buscar e exibir os produtos
- somar valor total da compra
- calcular troco
- registrar a venda
- atualizar o estoque dos produtos 
- subtrair a despesa total em cada venda 
Saída:
- valor total da compra
- troco para o cliente
- lista de produtos comprados
- metodo de pagamento usado

### Produtos
Get e get id ok
Post ok
Patch ok
Delete ok

### Despesa
Get e get id Ok
Post ok
Patch ok
Delete ok

### Receita
Get e get id ok
Post Ok
Patch ok
Delete ok


### Vendas
Get e get id 
Post ok
Patch Ok
Delete ok

## Célula
Get e get id ok
Post ok
Patch ok
Delete ok

## Midia - sem foto - DEPOIS
Get e get id 
Post
Patch
Delete

# MVC + Service e DTO

Model/Entity = /models

View = /components, /app/admin/dashboard/page.tsx, /app/dashboard/page.tsx, /app/login, /app/register, /app/.page.tsx

Controller = /app/api: auth, celula, cursos, matriculas, provas, sistemapdv, user, useradmin


igreja: esse campo vai receber um array de string, pra caso a igreja tenha filiais. 
E eu vou fazer manualmente até decidir como automatizar isso

Primeiro o user admin cria a conta normalmente (sem ter igreja)
Dentro do dashboard: Igrejas -> criar igreja = ai ele cria a igreja depois ou as igrejas dependendo do plano que ele escolheu
Model Church separado
Todo mundo tem churchId

churchId vai unir usuários e dados da igreja local

users incluir: 
churchId array de string: admin terá todos que ele cadastrar, usuários terão só o que estará atrelado ao dominio que ele entrou pra criar a conta
plan_id
max_churches

validar na rota login: se usuario tentar fazer login em um churchId diferente do seu = usuário nao cadastrado nessa igreja

tirar church? e deixar só churchId?# appigreja
