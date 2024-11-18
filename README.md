# limpa_bases_optout

A ideia deste projeto é facilitar a limpeza da base de usuários vindos de relatórios de opt-out. Por exmeplo, se através de campanhas você criar um registro de eventos salvando os dados do telefone dos usuários, será possível gerar um csv, este será de opt-out. Sempre que for realizar um novo disparo, poderá fazer um check na base de disparo atual cruzando os dados com o relatório de opt-out:

Veja:

![image](https://github.com/user-attachments/assets/8407f827-b199-4419-b305-848108c848d2)

O CSV precisa conter uma coluna chamada Ações ou Telefone. Desta forma ele estará dentro das condições para tratamento.

Ao final será gerado um csv limpo que poderá ser usado no disparo atual evitando que os usuários que já optaram em não receber não sejam impactados podendo gerar denuncias do número a Meta


Exemplo prático.

1 - Você precisará coletar os usuários que optam em não receber mais campanhas. Pra isso, você pode definir uma mensagem no disparo informando que para deixar de receber as mensagens da campanha basta escrever "X". No bloco que receberá a campanha crie uma ação de registro de eventos dessa forma:

![image](https://github.com/user-attachments/assets/4adb6581-2824-45ab-8fd2-8c77739c9f8d)

Onde "X" é apenas um exemplo. Pode usar a frase que preferir.


Após a realização do disparo você terá uma base com os dados dos usuários que optaram por não receber mais mensagens ativas. Dito isso, faça o download do CSV dos optouts

![image](https://github.com/user-attachments/assets/77b2dea2-b14a-4127-bc3c-12cdc7956ff7)

E siga os passos da primeira imagem de utilização do projeto!

Até mais 😉
