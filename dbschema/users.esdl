module users {
  scalar type Profissao extending enum<PM, BM>;
  scalar type Estado extending enum<AC, AL, AP, AM, BA, CE, DF, ES, GO, MA, MT, MS, MG, PA, PB, PR, PE, PI, RJ, RN, RS, RO, RR, SC, SP, SE, TO>;

  module Users {
    type User extending default::Timestamped {
      nome: str;
      email: str;
      whatsapp: str;
      graduacao: str;
      username: str;
      password: str;
      profissao: users::Profissao;
      single link estado_origem: EstadosDoBrasil;
      multi link estados_destino := EstadosDoBrasil;
    }

   type EstadosDoBrasil extending default::Timestamped {
      sigla: users::Estado;
    } 
  }
}