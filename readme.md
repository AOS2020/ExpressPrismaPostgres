<h3>Express Prisma PosgreSql</h3>

<br/>

<h4>Entre no diretorio do projeto e execute os comandos :</h4>

<br/>
<p>Instale as dependências:</p>

<h4>yarn install</h4>

<br/>


<p>Crie arquivo .env na pasta src/ e insira as seguintes variavéis:<p>

<h5>DATABASE_URL="postgresql://yourUser:yourPass@localhost:5432/yourdb?schema=yourSchema"</h5>

<h5>PORT="3333"</h5>

 </br>

<h5>ADMIN_PASSWORD="you password"</h5>
<p>A senha deverá ser encriptada porque será usada na seed de criação de usuario Admin</p>
 </br>
<h5>
Ex: 

const bcryptjs = require('bcryptjs');

const numSaltRounds = 10;

const password = 'password';

bcryptjs.hash(password, numSaltRounds);

 </h5>
 </br>


<h5>STORAGE_TYPE="local"</h5>

<h5>JWT="7ebca7a5-b591-46bd-b28f-0af3e01506ec"</h5>

<br/>
<p>Instale PostgreSql via docker</p>

docker run --name postgresql -e POSTGRES_USER=youUser -e POSTGRES_PASSWORD=YourPassword -p 5432:5432  -d postgres

<br/>
<p>Rodando Migrations<p>


<h5>npx prisma migrate dev</h5>


<br/>

<p>Rodando Seeds<p>


<h5>node prisma/seeds/seeds.js</h5>




<br/>


<p>Iniciando Server</p>

<h4>yarn dev</h4> 

