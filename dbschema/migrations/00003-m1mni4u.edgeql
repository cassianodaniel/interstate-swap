CREATE MIGRATION m1mni4ubt4zava5ckljj3j2ax2qd4ghtarf24ssflxxho34ql3emha
    ONTO m1gsx5cy7324kbp37vedckhkpuvczlcg7u3evavq7gzuu4cy7njmqq
{
  CREATE EXTENSION pgcrypto VERSION '1.3';
  CREATE EXTENSION auth VERSION '1.0';
  ALTER TYPE users::Users::User {
      CREATE REQUIRED LINK identity: ext::auth::Identity {
          SET REQUIRED USING (<ext::auth::Identity>{});
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
