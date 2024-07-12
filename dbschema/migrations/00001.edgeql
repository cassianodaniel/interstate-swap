CREATE MIGRATION m1aic5xt3gnalc6urgdd4c45ge3y76b4k52eb77itsmmx5gkniyj4q
    ONTO initial
{
  CREATE MODULE users IF NOT EXISTS;
  CREATE MODULE users::Users IF NOT EXISTS;
  CREATE ABSTRACT TYPE default::GlobalCurrency {
      CREATE REQUIRED PROPERTY value: std::int32;
      CREATE PROPERTY value_float := ((.value / 100));
  };
  CREATE ABSTRACT TYPE default::Timestamped {
      CREATE REQUIRED PROPERTY created_at: std::datetime {
          SET default := (std::datetime_of_statement());
          SET readonly := true;
      };
      CREATE PROPERTY updated_at: std::datetime {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
          CREATE REWRITE
              UPDATE 
              USING (std::datetime_of_statement());
      };
  };
  CREATE TYPE users::Users::User EXTENDING default::Timestamped {
      CREATE PROPERTY current_origin: std::str;
      CREATE PROPERTY current_station: std::str;
      CREATE PROPERTY email: std::str;
      CREATE PROPERTY military_type: std::str;
      CREATE PROPERTY name: std::str;
      CREATE PROPERTY next_target: std::str;
      CREATE PROPERTY password: std::str;
      CREATE PROPERTY personal_notes: std::str;
      CREATE PROPERTY username: std::str;
      CREATE PROPERTY whatsapp: std::str;
  };
  CREATE SCALAR TYPE users::military_type EXTENDING enum<PM, BM>;
};
