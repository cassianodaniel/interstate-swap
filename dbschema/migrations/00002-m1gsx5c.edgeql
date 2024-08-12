CREATE MIGRATION m1gsx5cy7324kbp37vedckhkpuvczlcg7u3evavq7gzuu4cy7njmqq
    ONTO m1aic5xt3gnalc6urgdd4c45ge3y76b4k52eb77itsmmx5gkniyj4q
{
  CREATE SCALAR TYPE users::Estado EXTENDING enum<AC, AL, AP, AM, BA, CE, DF, ES, GO, MA, MT, MS, MG, PA, PB, PR, PE, PI, RJ, RN, RS, RO, RR, SC, SP, SE, TO>;
  CREATE TYPE users::Users::EstadosDoBrasil EXTENDING default::Timestamped {
      CREATE PROPERTY sigla: users::Estado;
  };
  ALTER TYPE users::Users::User {
      CREATE SINGLE LINK estado_origem: users::Users::EstadosDoBrasil;
  };
  ALTER TYPE users::Users::User {
      CREATE MULTI LINK estados_destino := (users::Users::EstadosDoBrasil);
  };
  ALTER TYPE users::Users::User {
      ALTER PROPERTY current_origin {
          RENAME TO graduacao;
      };
  };
  ALTER TYPE users::Users::User {
      ALTER PROPERTY current_station {
          RENAME TO nome;
      };
  };
  ALTER TYPE users::Users::User {
      DROP PROPERTY military_type;
  };
  ALTER TYPE users::Users::User {
      DROP PROPERTY name;
  };
  ALTER TYPE users::Users::User {
      DROP PROPERTY next_target;
  };
  ALTER TYPE users::Users::User {
      DROP PROPERTY personal_notes;
  };
  ALTER SCALAR TYPE users::military_type RENAME TO users::Profissao;
  ALTER TYPE users::Users::User {
      CREATE PROPERTY profissao: users::Profissao;
  };
};
