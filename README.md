# limpa_bases_optout

A ideia deste projeto é facilitar a limpeza da base de usuários vindos de relatórios de opt-out. Por exmeplo, se através de campanhas você criar um registro de eventos salvando os dados do telefone dos usuários, será possível gerar um csv, este será de opt-out. Sempre que for realizar um novo disparo, poderá fazer um check na base de disparo atual cruzando os dados com o relatório de opt-out:

Veja:

![image](https://github.com/user-attachments/assets/8407f827-b199-4419-b305-848108c848d2)

O CSV precisa conter uma coluna chamada Ações ou Telefone. Desta forma ele estará dentro das condições para tratamento.

Ao final será gerado um csv limpo que poderá ser usado no disparo atual evitando que os usuários que já optaram em não receber não sejam impactados podendo gerar denuncias do número a Meta
